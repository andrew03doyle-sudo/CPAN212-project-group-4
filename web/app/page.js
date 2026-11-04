import Link from "next/link";
import SaveShowButton from "./SaveShowButton";
import { getShows } from "../lib/api";

export const dynamic = "force-dynamic";

export default async function Home() {
  let shows = [];
  let error = "";

  try {
    shows = await getShows();
  } catch {
    error = "Could not connect to the Express API.";
  }

  return (
    <main style={{ padding: "30px" }}>
      <h1>WatchList Project</h1>
      <p>Our Next.js frontend connected to Express.</p>

      <p>
        <Link href="/saved">View saved shows</Link>
      </p>

      <p>
        <Link href="/search">Search TVmaze shows</Link>
      </p>
      <h2>TV Shows</h2>

      {error ? (
        <p>{error}</p>
      ) : shows.length === 0 ? (
        <p>No shows found.</p>
      ) : (
        <ul>
          {shows.map((show) => (
            <li key={show.id}>
              <Link href={`/shows/${show.id}`}>
                {show.title}
              </Link>
              {" - "}
              {show.genre}
              {" "}
              <SaveShowButton show={show} />
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}