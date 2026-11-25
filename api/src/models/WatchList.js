
import mongoose from "mongoose";

const watchlistSchema = new mongoose.Schema({
  userId: {
    type: Number,
    required: true,
    min: 1
  },
  show: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Show",
    required: true
  },
  watched: {
    type: Boolean,
    required: true,
    default: false
  },
  currentSeason: {
    type: Number,
    required: true,
    min: 1
  },
  currentEpisode: {
    type: Number,
    required: true,
    min: 1
  },
  rating: {
    type: Number,
    min: 1,
    max: 5
  }
});

const Watchlist = mongoose.model("Watchlist", watchlistSchema);

export default Watchlist;
