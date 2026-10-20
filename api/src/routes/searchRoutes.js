
import express from "express";
import { searchShows } from "../controllers/searchController.js";

const router = express.Router();

router.get("/shows", searchShows);

export default router;
