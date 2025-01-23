import express, { type Router } from "express";
import { fetchMovie, searchMovies } from "./controller.ts";

const router: Router = express.Router();

/**
 * @route GET /api/v1/movies/{id}
 * Fetch movie by ID
 */
router.get("/movies/:id", fetchMovie);

/**
 * @route GET /api/v1/search
 * Search movies by title, genre, or year
 */
router.get("/search", searchMovies);

export default router;
