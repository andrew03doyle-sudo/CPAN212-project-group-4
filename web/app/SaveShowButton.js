"use client";

import { useWatchlist } from "../context/WatchlistContext";

export default function SaveShowButton({ show }) {
  const { savedShows, addShow } = useWatchlist();
  const isSaved = savedShows.some((item) => item.id === show.id);

  return (
    <button
      disabled={isSaved}
      onClick={() => addShow(show)}
      style={{
        marginLeft: "10px",
        padding: "8px 12px",
        fontSize: "14px",
        fontWeight: "600",
        cursor: isSaved ? "not-allowed" : "pointer",
        borderRadius: "6px",
        border: "1px solid #555",
      }}
    >
      {isSaved ? "Saved" : "Save show"}
    </button>
  );
}