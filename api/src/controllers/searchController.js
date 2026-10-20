
import { searchTVmaze } from "../lib/tvmaze.js";

// search for TV shows using TVmaze
export async function searchShows(req, res, next) {
  const query = req.query.q;

  // make sure a search term was entered
  if (typeof query !== "string" || !query.trim()) {
    return res.status(400).json({
      error: {
        message: "Search query is required",
        details: ["Enter a show name using ?q="]
      }
    });
  }

  try {
    const results = await searchTVmaze(query);

    res.status(200).json({
      query: query.trim(),
      results: results
    });
  } catch (error) {
    next(error);
  }
}
