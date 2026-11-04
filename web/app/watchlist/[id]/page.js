
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";

async function ShowInformation({ item, id }) {
  return (
    <div>
      <p>Show ID: {item.showId}</p>
      <p>Rating: {item.rating ?? "No rating"} / 5</p>
      <p>Watched: {item.watched ? "Yes" : "No"}</p>
      <p>Season: {item.currentSeason}</p>
      <p>Episode: {item.currentEpisode}</p>

      <Link href={`/watchlist/${id}/edit`}>
        Edit Show
      </Link>
    </div>
  );
}

export default async function WatchlistDetails({ params }) {
  const { id } = await params;

  let item;
  let error = "";

  try {
    const apiUrl = process.env.API_URL;

    if (!apiUrl) {
      throw new Error("API address is missing");
    }

    const response = await fetch(`${apiUrl}/api/watchlist/${id}`, {
      cache: "no-store"
    });

    if (response.status === 404) {
      notFound();
    }

    if (!response.ok) {
      throw new Error("Unable to get show details");
    }

    item = await response.json();
  } catch (err) {
    if (err?.digest === "NEXT_HTTP_ERROR_FALLBACK;404") {
      throw err;
    }

    error = "Unable to load show details.";
  }

  if (error) {
    return (
      <main>
        <h1>Watchlist Details</h1>
        <p>{error}</p>
        <Link href="/watchlist">Back to Watchlist</Link>
      </main>
    );
  }

  return (
    <main>
      <h1>Watchlist Details</h1>

      <Suspense fallback={<p>Getting show details...</p>}>
        <ShowInformation item={item} id={id} />
      </Suspense>

      <p>
        <Link href="/watchlist">Back to Watchlist</Link>
      </p>
    </main>
  );
}
