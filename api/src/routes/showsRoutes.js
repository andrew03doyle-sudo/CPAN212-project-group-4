
import express from "express";

import {
  getAllShows,
  getShowById,
  addShow,
  updateShow,
  deleteShow
} from "../controllers/showsController.js";

const router = express.Router();

router.get("/", getAllShows);
router.get("/:id", getShowById);
router.post("/", addShow);
router.put("/:id", updateShow);
router.delete("/:id", deleteShow);

export default router;
