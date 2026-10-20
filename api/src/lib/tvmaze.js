
const cache = new Map();

export async function searchTVmaze(query) {
  const key = query.trim().toLowerCase();

  const ttl = Number(process.env.CACHE_TTL_MS || 60000);
  const timeout = Number(process.env.TVMAZE_TIMEOUT_MS || 5000);

  // check for saved results
  const saved = cache.get(key);

  if (saved && Date.now() < saved.expires) {
    console.log("TVmaze cache hit:", key);
    return saved.data;
  }

  try {
    const url = "https://api.tvmaze.com/search/shows?q=" +
  encodeURIComponent(key);

    const response = await fetch(url, {
      signal: AbortSignal.timeout(timeout)
    });

    if (!response.ok) {
      const err = new Error("TVmaze API unavailable");
      err.status = 502;
      throw err;
    }

    const results = await response.json();

    // convert TVmaze results into our JSON format
    const shows = results.map(item => ({
      id: item.show.id,
      title: item.show.name,
      genres: item.show.genres,
      status: item.show.status,
      rating: item.show.rating?.average ?? null,
      imageUrl: item.show.image?.medium ?? null
    }));

    // cache the result
    cache.set(key, {
      data: shows,
      expires: Date.now() + ttl
    });

    return shows;
  } catch (error) {
    const err = new Error();

    if (error.name === "TimeoutError" ||
        error.name === "AbortError") {
      err.message = "TVmaze request timed out";
      err.status = 504;
    } else {
      err.message = "TVmaze API unavailable";
      err.status = 502;
    }

    throw err;
  }
}
