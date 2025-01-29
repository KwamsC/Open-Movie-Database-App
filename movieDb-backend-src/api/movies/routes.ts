import express, { type Router } from "express";
import { redisCaching } from "../../middlewares/redisCaching.ts";
import { fetchMovie, searchMovies } from "./controller.ts";

const router: Router = express.Router();

/**
 * @route GET /api/v1/movies/{id}
 * Fetch movie by ID
 */
router.get("/movies/:id", redisCaching, fetchMovie);

/**
 * @route GET /api/v1/search
 * Search movies by title, type, or year
 */
router.get("/search", redisCaching, searchMovies);

export default router;
