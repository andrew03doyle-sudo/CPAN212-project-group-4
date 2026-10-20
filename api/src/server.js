
import express from "express";
import watchlistRoutes from "./routes/watchlistRoutes.js";
import showsRoutes from "./routes/showsRoutes.js";
import searchRoutes from "./routes/searchRoutes.js";

const app = express();

// allow the server to read JSON
app.use(express.json());

// connect existing Watchlist routes
app.use("/api/watchlist", watchlistRoutes);
app.use("/api/shows", showsRoutes);
app.use("/api/search", searchRoutes);

// handle unknown routes
app.use((req, res) => {
  res.status(404).json({
    error: {
      message: "Route not found",
      details: []
    }
  });
});

// handle unexpected errors
app.use((err, req, res, next) => {
  console.error(err.message);

  const status = err.status || 500;

  res.status(status).json({
    error: {
      message: status === 500
        ? "Internal server error"
        : err.message,
      details: err.details || []
    }
  });
});

// start the server
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`API running at http://localhost:${PORT}`);
});
