
import { randomUUID } from "node:crypto";
import { shows } from "../records/shows.js";
import { validateShow } from "../validators/showsValidator.js";

// get all shows
export function getAllShows(req, res) {
  res.status(200).json(shows);
}

// get one show
export function getShowById(req, res) {
  const show = shows.find(s => s.id === req.params.id);

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

// add a new show
export function addShow(req, res) {
  const errors = validateShow(req.body);

  if (errors.length > 0) {
    return res.status(400).json({
      error: {
        message: "Invalid show information",
        details: errors
      }
    });
  }

  const newShow = {
    id: randomUUID(),
    title: req.body.title.trim(),
    genre: req.body.genre.trim(),
    seasons: req.body.seasons
  };

  shows.push(newShow);
  res.status(201).json(newShow);
}

// update a show
export function updateShow(req, res) {
  const show = shows.find(s => s.id === req.params.id);

  if (!show) {
    return res.status(404).json({
      error: {
        message: "Show not found",
        details: []
      }
    });
  }

  const errors = validateShow(req.body);

  if (errors.length > 0) {
    return res.status(400).json({
      error: {
        message: "Invalid show information",
        details: errors
      }
    });
  }

  show.title = req.body.title.trim();
  show.genre = req.body.genre.trim();
  show.seasons = req.body.seasons;

  res.status(200).json(show);
}

// delete a show
export function deleteShow(req, res) {
  const index = shows.findIndex(s => s.id === req.params.id);

  if (index === -1) {
    return res.status(404).json({
      error: {
        message: "Show not found",
        details: []
      }
    });
  }

  shows.splice(index, 1);
  res.status(204).send();
}
