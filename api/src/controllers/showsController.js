
import mongoose from "mongoose";
import Show from "../models/Show.js";

// Get all shows
export async function getAllShows(req, res) {
  const shows = await Show.find();
  res.status(200).json(shows);
}

// Get one show
export async function getShowById(req, res) {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(404).json({
      error: {
        message: "Show not found",
        details: []
      }
    });
  }

  const show = await Show.findById(id);

  if (!show) {
    return res.status(404).json({
      error: {
        message: "Show not found",
        details: []
      }
    });
  }

  res.status(200).json(show);
}

// Create a show
export async function addShow(req, res) {
  const show = await Show.create(req.body);
  res.status(201).json(show);
}

// Update a show
export async function updateShow(req, res) {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(404).json({
      error: {
        message: "Show not found",
        details: []
      }
    });
  }

  const show = await Show.findByIdAndUpdate(
    id,
    req.body,
    {
      returnDocument: "after",
      runValidators: true
    }
  );

  if (!show) {
    return res.status(404).json({
      error: {
        message: "Show not found",
        details: []
      }
    });
  }

  res.status(200).json(show);
}

// Delete a show
export async function deleteShow(req, res) {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(404).json({
      error: {
        message: "Show not found",
        details: []
      }
    });
  }

  const show = await Show.findByIdAndDelete(id);

  if (!show) {
    return res.status(404).json({
      error: {
        message: "Show not found",
        details: []
      }
    });
  }

  res.status(204).send();
}

