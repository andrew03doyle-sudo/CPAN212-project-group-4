import Link from "next/link";

function makePageUrl({ watched, sort, limit, page }) {
  const params = new URLSearchParams();

  if (watched) {
    params.set("watched", watched);
  }

  if (sort) {
    params.set("sort", sort);
  }

  params.set("limit", String(limit));
  params.set("page", String(page));

  return `/watchlist?${params.toString()}`;
}

export default async function WatchlistPage({ searchParams }) {
  const query = await searchParams;

  const watched = query.watched || "";
  const sort = query.sort || "";
  const page = Math.max(Number(query.page) || 1, 1);
  const limit = Math.min(Math.max(Number(query.limit) || 6, 1), 20);

  let items = [];
  let total = 0;
  let totalPages = 1;
  let error = "";

  try {
    const apiUrl = process.env.API_URL;

    if (!apiUrl) {
      throw new Error("API address is missing");
    }

    const apiParams = new URLSearchParams();

    if (watched) {
      apiParams.set("watched", watched);
    }

    if (sort) {
      apiParams.set("sort", sort);
    }

    apiParams.set("page", String(page));
    apiParams.set("limit", String(limit));

    const response = await fetch(
      `${apiUrl}/api/watchlist?${apiParams.toString()}`,
      { cache: "no-store" }
    );

    if (!response.ok) {
      throw new Error("Unable to get watchlist");
    }

    const data = await response.json();

    // Supports the current array response and the new paginated M4 response.
    if (Array.isArray(data)) {
      items = data;
      total = data.length;
      totalPages = 1;
    } else {
      items = data.items || [];
      total = data.total || 0;
      totalPages = data.totalPages || data.pages || 1;
    }
  } catch {
    error = "Unable to load your watchlist.";
  }

  return (
    <main>
      <h1>My Watchlist</h1>
      <p>Filter, sort and browse the shows on your watchlist.</p>

      <p>
        <Link href="/watchlist/new">Add New Show</Link>
      </p>

      <form method="get">
        <div>
          <label htmlFor="watched">Watched status</label>
          <select id="watched" name="watched" defaultValue={watched}>
            <option value="">All shows</option>
            <option value="true">Watched</option>
            <option value="false">Not watched</option>
          </select>
        </div>

        <div>
          <label htmlFor="sort">Sort</label>
          <select id="sort" name="sort" defaultValue={sort}>
            <option value="">Default</option>
            <option value="rating">Rating: low to high</option>
            <option value="-rating">Rating: high to low</option>
            <option value="currentSeason">Season: low to high</option>
            <option value="-currentSeason">Season: high to low</option>
          </select>
        </div>

        <div>
          <label htmlFor="limit">Items per page</label>
          <select id="limit" name="limit" defaultValue={String(limit)}>
            <option value="3">3</option>
            <option value="6">6</option>
            <option value="10">10</option>
          </select>
        </div>

        <input type="hidden" name="page" value="1" />

        <button type="submit">Apply</button>

        <Link href="/watchlist">Clear</Link>
      </form>

      {error ? (
        <p>{error}</p>
      ) : items.length === 0 ? (
        <p>No matching shows were found.</p>
      ) : (
        <>
          <p>
            Page {page} of {totalPages} · {total} total items
          </p>

          <div>
            {items.map((item) => {
            const itemId = item._id;

const showName =
  item.show?.title ||
  item.show?.name ||
  item.show?._id ||
  "Unknown show";

              return (
                <article key={itemId}>
                  <h2>{showName}</h2>
                  <p>Rating: {item.rating ?? "No rating"} / 5</p>
                  <p>Watched: {item.watched ? "Yes" : "No"}</p>
                  <p>Season: {item.currentSeason}</p>
                  <p>Episode: {item.currentEpisode}</p>

                  <Link href={`/watchlist/${itemId}`}>
                    Show Details
                  </Link>
                </article>
              );
            })}
          </div>

          <nav aria-label="Watchlist pages">
            {page > 1 && (
              <Link
                href={makePageUrl({
                  watched,
                  sort,
                  limit,
                  page: page - 1
                })}
              >
                Previous
              </Link>
            )}

            <span>
              {" "}Page {page} of {totalPages}{" "}
            </span>

            {page < totalPages && (
              <Link
                href={makePageUrl({
                  watched,
                  sort,
                  limit,
                  page: page + 1
                })}
              >
                Next
              </Link>
            )}
          </nav>
        </>
      )}
    </main>
  );
}