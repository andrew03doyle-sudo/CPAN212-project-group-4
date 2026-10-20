
import express from "express";

import {
  getAllWatchlist,
  getWatchlistById,
  addWatchlist,
  updateWatchlist,
  deleteWatchlist
} from "../controllers/watchlistController.js";

const router = express.Router();

// Get all watchlist items
router.get("/", getAllWatchlist);

// Get one watchlist item
router.get("/:id", getWatchlistById);

// Add a watchlist item
router.post("/", addWatchlist);

// Update a watchlist item
router.put("/:id", updateWatchlist);

// Delete a watchlist item
router.delete("/:id", deleteWatchlist);

export default router;
