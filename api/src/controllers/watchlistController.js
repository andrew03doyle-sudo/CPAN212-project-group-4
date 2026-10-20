
import { randomUUID } from "node:crypto";
import { watchlist } from "../records/watchlist.js";
import { validateWatchlist } from "../validators/watchlistValidator.js";

// Get all watchlist items
export function getAllWatchlist(req, res) {
  res.status(200).json(watchlist);
}

// Get one watchlist item
export function getWatchlistById(req, res) {
  for (let i = 0; i < watchlist.length; i++) {
    if (watchlist[i].id === req.params.id) {
      return res.status(200).json(watchlist[i]);
    }
  }

  return res.status(404).json({
    error: {
      message: "Watchlist item not found",
      details: []
    }
  });
}

// Add a watchlist item
export function addWatchlist(req, res) {
  let errors = validateWatchlist(req.body);

  if (errors.length > 0) {
    return res.status(400).json({
      error: {
        message: "Invalid watchlist information",
        details: errors
      }
    });
  }

  let rating = null;
  if (req.body.rating !== undefined) {
    rating = req.body.rating;
  }

  let newItem = {
    id: randomUUID(),
    userId: req.body.userId,
    showId: req.body.showId,
    watched: req.body.watched,
    currentSeason: req.body.currentSeason,
    currentEpisode: req.body.currentEpisode,
    rating: rating
  };

  watchlist.push(newItem);
  return res.status(201).json(newItem);
}

// Update a watchlist item
export function updateWatchlist(req, res) {
  for (let i = 0; i < watchlist.length; i++) {
    if (watchlist[i].id === req.params.id) {
      let errors = validateWatchlist(req.body);

      if (errors.length > 0) {
        return res.status(400).json({
          error: {
            message: "Invalid watchlist information",
            details: errors
          }
        });
      }

      watchlist[i].userId = req.body.userId;
      watchlist[i].showId = req.body.showId;
      watchlist[i].watched = req.body.watched;
      watchlist[i].currentSeason = req.body.currentSeason;
      watchlist[i].currentEpisode = req.body.currentEpisode;

      if (req.body.rating !== undefined) {
        watchlist[i].rating = req.body.rating;
      } else {
        watchlist[i].rating = null;
      }

      return res.status(200).json(watchlist[i]);
    }
  }

  return res.status(404).json({
    error: {
      message: "Watchlist item not found",
      details: []
    }
  });
}

// Delete a watchlist item
export function deleteWatchlist(req, res) {
  for (let i = 0; i < watchlist.length; i++) {
    if (watchlist[i].id === req.params.id) {
      watchlist.splice(i, 1);
      return res.status(204).send();
    }
  }

  return res.status(404).json({
    error: {
      message: "Watchlist item not found",
      details: []
    }
  });
}
