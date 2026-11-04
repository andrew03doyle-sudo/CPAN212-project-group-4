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
        marginLeft: "14px",
        padding: "14px 24px",
        fontSize: "16px",
        fontWeight: "700",
        cursor: isSaved ? "not-allowed" : "pointer",
        borderRadius: "10px",
        border: "1px solid rgba(196, 181, 253, 0.5)",
        background: isSaved ? "#4c3b75" : "#7c3aed",
        color: "#ffffff",
        boxShadow: "0 4px 14px rgba(124, 58, 237, 0.3)",
      }}
    >
      {isSaved ? "Saved" : "Save show"}
    </button>
  );
}