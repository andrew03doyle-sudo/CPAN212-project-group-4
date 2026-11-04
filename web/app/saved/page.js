"use client";

import Link from "next/link";
import { useWatchlist } from "../../context/WatchlistContext";

export default function SavedPage() {
  const { savedShows } = useWatchlist();

  return (
    <main style={{ padding: "30px" }}>
      <h1>Saved Shows</h1>

      <Link href="/">Back to all shows</Link>

      {savedShows.length === 0 ? (
        <p>No saved shows yet.</p>
      ) : (
        <ul>
          {savedShows.map((show) => (
            <li key={show.id}>{show.title}</li>
          ))}
        </ul>
      )}
    </main>
  );
}