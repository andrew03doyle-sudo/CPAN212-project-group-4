
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AddShowPage() {
  const router = useRouter();

  const [userId, setUserId] = useState("1");
  const [showId, setShowId] = useState("");
  const [watched, setWatched] = useState(false);
  const [season, setSeason] = useState("1");
  const [episode, setEpisode] = useState("1");
  const [rating, setRating] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setSaving(true);

    const newShow = {
      userId: Number(userId),
      showId: Number(showId),
      watched: watched,
      currentSeason: Number(season),
      currentEpisode: Number(episode)
    };

    if (rating !== "") {
      newShow.rating = Number(rating);
    }

    try {
      const response = await fetch("/api/watchlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newShow)
      });

      if (!response.ok) {
        setError("Unable to add show. Check your information.");
        return;
      }

      router.push("/watchlist");
      router.refresh();
    } catch {
      setError("Could not connect to the server.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <main>
      <h1>Add New Show</h1>

      <form onSubmit={handleSubmit}>
        <p>
          <label>User ID</label>
          <input
            type="number"
            value={userId}
            onChange={(event) => setUserId(event.target.value)}
          />
        </p>

        <p>
          <label>Show ID</label>
          <input
            type="number"
            value={showId}
            onChange={(event) => setShowId(event.target.value)}
          />
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
        </p>

        <p>
          <label>Current Season</label>
          <input
            type="number"
            value={season}
            onChange={(event) => setSeason(event.target.value)}
          />
        </p>

        <p>
          <label>Current Episode</label>
          <input
            type="number"
            value={episode}
            onChange={(event) => setEpisode(event.target.value)}
          />
        </p>

        <p>
          <label>Rating (1 to 5)</label>
          <input
            type="number"
            value={rating}
            onChange={(event) => setRating(event.target.value)}
          />
        </p>

        {error && <p>{error}</p>}

        <button type="submit" disabled={saving}>
          {saving ? "Saving..." : "Add Show"}
        </button>
      </form>

      <p>
        <Link href="/watchlist">Back to Watchlist</Link>
      </p>
    </main>
  );
}
