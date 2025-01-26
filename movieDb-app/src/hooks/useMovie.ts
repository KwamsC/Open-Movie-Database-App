import { useEffect, useState } from "react";
import { movieService } from "../services/movieService.ts";
import type { Movie } from "../types/Movie.ts";

export const useMovie = (id: string) => {
	const [movie, setMovie] = useState<Movie | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchMovie = async () => {
			try {
				const data = await movieService.fetchMovie(id);
				setMovie(data);
			} catch (err) {
				if (err instanceof Error) {
					setError(err.message);
				} else {
					setError("An unknown error occurred");
				}
			} finally {
				setLoading(false);
			}
		};

		fetchMovie();
	}, [id]);

	return { movie, loading, error };
};
