
import Link from "next/link";
import { Suspense } from "react";

async function WatchlistItems() {
  let watchlist = [];
  let error = "";

  try {
    const apiUrl = process.env.API_URL;

    if (!apiUrl) {
      throw new Error("API address is missing");
    }

    const response = await fetch(`${apiUrl}/api/watchlist`, {
      cache: "no-store"
    });

    if (!response.ok) {
      throw new Error("Unable to get watchlist");
    }

    watchlist = await response.json();
  } catch {
    error = "Unable to load your watchlist.";
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (watchlist.length === 0) {
    return <p>No shows have been added yet.</p>;
  }

  return (
    <div>
      {watchlist.map((item) => (
        <div key={item.id}>
          <h2>Show ID: {item.showId}</h2>
          <p>Rating: {item.rating ?? "No rating"} / 5</p>
          <p>Watched: {item.watched ? "Yes" : "No"}</p>
          <p>Season: {item.currentSeason}</p>
          <p>Episode: {item.currentEpisode}</p>

          <Link href={`/watchlist/${item.id}`}>
            Show Details
          </Link>
        </div>
      ))}
    </div>
  );
}

export default function WatchlistPage() {
  return (
    <main>
      <h1>My Watchlist</h1>
      <p>Here are the shows on your watchlist.</p>

      <Link href="/watchlist/new">Add New Show</Link>

      <Suspense fallback={<p>Getting watchlist...</p>}>
        <WatchlistItems />
      </Suspense>
    </main>
  );
}
