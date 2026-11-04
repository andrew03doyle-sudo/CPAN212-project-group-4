"use client";

import Link from "next/link";
import { useState } from "react";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [shows, setShows] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();

    if (!query.trim()) {
      setError("Enter a show name.");
      return;
    }

    setLoading(true);
    setError("");
    setShows([]);

    try {
      const response = await fetch(
        `/api/search/shows?q=${encodeURIComponent(query.trim())}`
      );

      const body = await response.json();

      if (!response.ok) {
        throw new Error(body.error?.message || "Search failed.");
      }

      setShows(body.results);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main>
      <h1>Search TV Shows</h1>

      <p>
        <Link href="/">Back to watchlist</Link>
      </p>

      <form onSubmit={handleSubmit}>
        <label htmlFor="search">Show name</label>
        <br />

        <input
          id="search"
          type="text"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Example: The Office"
          style={{
            padding: "10px",
            fontSize: "16px",
            marginTop: "8px",
          }}
        />

        <button type="submit" disabled={loading}>
          {loading ? "Searching..." : "Search"}
        </button>
      </form>

      {error && <p>{error}</p>}

      {!loading && shows.length > 0 && (
        <section>
          <h2>Results</h2>

         <ul
  style={{
    listStyle: "none",
    padding: "22px",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "16px",
  }}
>
  {shows.map((show) => (
 <li
  key={show.id}
  style={{
    padding: "16px",
    border: "1px solid #444",
    borderRadius: "10px",
    background: "#1b1b1b",
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.35)",
    transition: "transform 0.2s ease, border-color 0.2s ease",
  }}
>
    {show.imageUrl && (
  <img
    src={show.imageUrl}
    alt={show.title}
    width="200"
    style={{
      display: "block",
      marginBottom: "12px",
      borderRadius: "6px",
    }}
  />
)}
      
      <strong>{show.title}</strong>
      <div>Genres: {show.genres.join(", ") || "Not available"}</div>
      <div>Status: {show.status}</div>
      <div>Rating: {show.rating ?? "Not rated"}</div>
    </li>
  ))}
</ul>
        </section>
      )}
    </main>
  );
}