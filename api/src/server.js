import mongoose from "mongoose";
import express from "express";
import watchlistRoutes from "./routes/watchlistRoutes.js";
import showsRoutes from "./routes/showsRoutes.js";
import searchRoutes from "./routes/searchRoutes.js";
import { notFound } from "./middleware/notFound.js";

const app = express();
mongoose.set("sanitizeFilter", true);

// allow the server to read JSON
app.use(express.json());

// connect existing Watchlist routes
app.use("/api/watchlist", watchlistRoutes);
app.use("/api/shows", showsRoutes);
app.use("/api/search", searchRoutes);

// handle unknown routes
app.use(notFound);



// handle unexpected errors

app.use((err, req, res, next) => {
  console.error(err.message);

  // handle Mongoose validation errors
  if (err.name === "ValidationError") {
    const details = Object.values(err.errors).map(
      (error) => `${error.path}: ${error.message}`
    );

    return res.status(400).json({
      error: {
        message: "Invalid information",
        details: details
      }
    });
  }

  // handle invalid MongoDB field values
  if (err.name === "CastError") {
    return res.status(400).json({
      error: {
        message: "Invalid field value",
        details: [err.message]
      }
    });
  }

  // handle other errors
  const status =
    err.status >= 400 && err.status <= 599
      ? err.status
      : 500;

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

// Check that a MongoDB connection string exists
if (!process.env.MONGODB_URI) {
  console.error("MONGODB_URI is missing from .env");
  process.exit(1);
}

try {
  // connect to MongoDB before starting Express
  await mongoose.connect(process.env.MONGODB_URI);

  console.log("Connected to MongoDB");

  // start the API only after connecting
  app.listen(PORT, () => {
    console.log(`API running at http://localhost:${PORT}`);
  });

} catch (error) {
  console.error("MongoDB connection failed:", error.message);
  process.exit(1);
}

