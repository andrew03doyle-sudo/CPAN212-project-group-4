
"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

export default function EditShowPage() {
  const { id } = useParams();
  const router = useRouter();

  const [userId, setUserId] = useState("");
  const [showId, setShowId] = useState("");
  const [watched, setWatched] = useState(false);
  const [season, setSeason] = useState("");
  const [episode, setEpisode] = useState("");
  const [rating, setRating] = useState("");

  const [errors, setErrors] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function loadShow() {
      try {
        const response = await fetch(`/api/watchlist/${id}`);

        if (!response.ok) {
          throw new Error("Unable to load show");
        }

        const item = await response.json();

        setUserId(String(item.userId));
        setShowId(String(item.showId));
        setWatched(item.watched);
        setSeason(String(item.currentSeason));
        setEpisode(String(item.currentEpisode));
        setRating(item.rating == null ? "" : String(item.rating));
      } catch {
        setError("Unable to load show details.");
      } finally {
        setLoading(false);
      }
    }

    loadShow();
  }, [id]);

  async function handleSubmit(event) {
    event.preventDefault();

    setErrors([]);
    setError("");
    setSaving(true);

    const updatedShow = {
      userId: Number(userId),
      showId: Number(showId),
      watched: watched,
      currentSeason: Number(season),
      currentEpisode: Number(episode)
    };

    if (rating !== "") {
      updatedShow.rating = Number(rating);
    }

    try {
      const response = await fetch(`/api/watchlist/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(updatedShow)
      });

      if (response.status === 400) {
        const data = await response.json();
        setErrors(data.error.details);
        return;
      }

      if (!response.ok) {
        setError("Unable to save changes.");
        return;
      }

      router.push(`/watchlist/${id}`);
      router.refresh();
    } catch {
      setError("Could not connect to the server.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return <p>Loading show...</p>;
  }

  return (
    <main>
      <h1>Edit Show</h1>

      {error && <p>{error}</p>}

      <form onSubmit={handleSubmit}>
        <p>
          <label>User ID</label>
          <input
            type="number"
            value={userId}
            onChange={(event) => setUserId(event.target.value)}
          />
          {errors.filter((e) => e.startsWith("User ID")).map((e) => (
            <span key={e}>{e}</span>
          ))}
        </p>

        <p>
          <label>Show ID</label>
          <input
            type="number"
            value={showId}
            onChange={(event) => setShowId(event.target.value)}
          />
          {errors.filter((e) => e.startsWith("Show ID")).map((e) => (
            <span key={e}>{e}</span>
          ))}
        </p>

        <p>
          <label>
            <input
              type="checkbox"
              checked={watched}
              onChange={(event) => setWatched(event.target.checked)}
            />
            Watched
          </label>
          {errors.filter((e) => e.startsWith("Watched")).map((e) => (
            <span key={e}>{e}</span>
          ))}
        </p>

        <p>
          <label>Current Season</label>
          <input
            type="number"
            value={season}
            onChange={(event) => setSeason(event.target.value)}
          />
          {errors.filter((e) => e.startsWith("Season")).map((e) => (
            <span key={e}>{e}</span>
          ))}
        </p>

        <p>
          <label>Current Episode</label>
          <input
            type="number"
            value={episode}
            onChange={(event) => setEpisode(event.target.value)}
          />
          {errors.filter((e) => e.startsWith("Episode")).map((e) => (
            <span key={e}>{e}</span>
          ))}
        </p>

        <p>
          <label>Rating (1 to 5)</label>
          <input
            type="number"
            value={rating}
            onChange={(event) => setRating(event.target.value)}
          />
          {errors.filter((e) => e.startsWith("Rating")).map((e) => (
            <span key={e}>{e}</span>
          ))}
        </p>

        <button type="submit" disabled={saving}>
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </form>

      <p>
        <Link href={`/watchlist/${id}`}>Back to Details</Link>
      </p>
    </main>
  );
}
