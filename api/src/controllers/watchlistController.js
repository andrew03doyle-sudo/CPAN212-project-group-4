
import mongoose from "mongoose";
import Watchlist from "../models/WatchList.js";
import Show from "../models/Show.js";

// check Watchlist information
function validateData(data) {
  const errors = [];

  if (!data || typeof data !== "object" || Array.isArray(data)) {
    return ["Request body must be an object"];
  }

  if (!Number.isInteger(data.userId) || data.userId < 1) {
    errors.push("User ID must be a positive integer");
  }

  if (!mongoose.isValidObjectId(data.show)) {
    errors.push("A valid Show ID is required");
  }

  if (typeof data.watched !== "boolean") {
    errors.push("Watched must be true or false");
  }

  if (!Number.isInteger(data.currentSeason) ||
      data.currentSeason < 1) {
    errors.push("Season must be at least 1");
  }

  if (!Number.isInteger(data.currentEpisode) ||
      data.currentEpisode < 1) {
    errors.push("Episode must be at least 1");
  }

  if (data.rating != null &&
      (!Number.isInteger(data.rating) ||
       data.rating < 1 || data.rating > 5)) {
    errors.push("Rating must be between 1 and 5");
  }

  return errors;
}

// get all watchlist items
export async function getAllWatchlist(req, res) {
  const items = await Watchlist.find().populate("show");
  res.status(200).json(items);
}

// get one watchlist item
export async function getWatchlistById(req, res) {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(404).json({
      error: {
        message: "Watchlist item not found",
        details: []
      }
    });
  }

  const item = await Watchlist.findById(req.params.id)
    .populate("show");

  if (!item) {
    return res.status(404).json({
      error: {
        message: "Watchlist item not found",
        details: []
      }
    });
  }

  res.status(200).json(item);
}

// add a watchlist item
export async function addWatchlist(req, res) {
  const errors = validateData(req.body);

  if (errors.length > 0) {
    return res.status(400).json({
      error: {
        message: "Invalid watchlist information",
        details: errors
      }
    });
  }

  const show = await Show.findById(req.body.show);

  if (!show) {
    return res.status(400).json({
      error: {
        message: "Invalid watchlist information",
        details: ["Referenced Show does not exist"]
      }
    });
  }

  const item = await Watchlist.create({
    userId: req.body.userId,
    show: req.body.show,
    watched: req.body.watched,
    currentSeason: req.body.currentSeason,
    currentEpisode: req.body.currentEpisode,
    rating: req.body.rating ?? null
  });

  await item.populate("show");

  res.status(201).json(item);
}

// update a watchlist item
export async function updateWatchlist(req, res) {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(404).json({
      error: {
        message: "Watchlist item not found",
        details: []
      }
    });
  }

  const errors = validateData(req.body);

  if (errors.length > 0) {
    return res.status(400).json({
      error: {
        message: "Invalid watchlist information",
        details: errors
      }
    });
  }

  const show = await Show.findById(req.body.show);

  if (!show) {
    return res.status(400).json({
      error: {
        message: "Invalid watchlist information",
        details: ["Referenced Show does not exist"]
      }
    });
  }

  const item = await Watchlist.findByIdAndUpdate(
    req.params.id,
    {
      userId: req.body.userId,
      show: req.body.show,
      watched: req.body.watched,
      currentSeason: req.body.currentSeason,
      currentEpisode: req.body.currentEpisode,
      rating: req.body.rating ?? null
    },
    {
      returnDocument: "after",
      runValidators: true
    }
  );

  if (!item) {
    return res.status(404).json({
      error: {
        message: "Watchlist item not found",
        details: []
      }
    });
  }

  await item.populate("show");

  res.status(200).json(item);
}

// delete a watchlist item
export async function deleteWatchlist(req, res) {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(404).json({
      error: {
        message: "Watchlist item not found",
        details: []
      }
    });
  }

  const item = await Watchlist.findByIdAndDelete(req.params.id);

  if (!item) {
    return res.status(404).json({
      error: {
        message: "Watchlist item not found",
        details: []
      }
    });
  }

  res.status(204).send();
}
