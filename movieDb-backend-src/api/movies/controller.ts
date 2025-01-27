import type { RequestHandler } from "express";

export const fetchMovie: RequestHandler = async (req, res) => {
	try {
		const { id } = req.params;
		const url = `${process.env.BASE_URL}?i=${id}&apikey=${process.env.API_KEY}`;
		const response = await fetch(url);
		const movie = await response.json();

		if (movie.Response === "False") {
			res.status(404).json({ error: "Movie not found" });
			return;
		}

		res.status(200).json(movie);
	} catch (error) {
		res.status(500).json({ error: "Failed to fetch movie details" });
	}
};

export const searchMovies: RequestHandler = async (req, res) => {
	try {
		const { title, genre, year } = req.query;

		const queryParams = new URLSearchParams({
			...(title && { s: title as string }),
			...(genre && { type: genre as string }),
			...(year && { y: year as string }),
			apikey: process.env.API_KEY as string,
		});

		const url = `${process.env.BASE_URL}?${queryParams}`;
		const response = await fetch(url);
		const movies = await response.json();

		if (movies.Response === "False") {
			res.status(404).json({ error: "No movies found" });
			return;
		}

		res.json(movies);
	} catch (error) {
		res.status(500).json({ error: "Failed to search movies" });
	}
};
