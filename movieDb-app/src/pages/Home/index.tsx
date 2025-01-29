import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { NavLink } from "react-router";
import Loader from "../../common/Loader";
import { movieService } from "../../services/movieService";
import type { Movie } from "../../types/Movie";
import ErrorPage from "../ErrorPage";

const Home = () => {
	const FEATURED_MOVIES = [
		"tt9362722",
		"tt4154796",
		"tt15398776",
		"tt13622970",
		"tt9603212",
	];

	const [featuredMovie, setFeaturedMovie] = useState<Movie | null>(null);
	const [recommendations, setRecommendations] = useState<Movie[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchMovies = async () => {
			try {
				setLoading(true);
				const movies = await Promise.all(
					FEATURED_MOVIES.map((id) => movieService.fetchMovie(id)),
				);
				setFeaturedMovie(movies[0]);
				setRecommendations(movies.slice(1));
			} catch (err) {
				setError(err instanceof Error ? err.message : "Failed to fetch movies");
			} finally {
				setLoading(false);
			}
		};

		fetchMovies();
	}, []);

	if (loading) return <Loader />;
	if (error) return <ErrorPage message={error} />;

	return (
		<main className="md:m-6">
			{/* Featured Movie */}
			{featuredMovie && (
				<motion.div
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
					className="relative bg-black/20 rounded-2xl overflow-hidden shadow-lg mb-8"
				>
					<NavLink to={`/movies/${featuredMovie.imdbID}`}>
						<img
							src={featuredMovie.Poster}
							alt={featuredMovie.Title}
							className="w-full h-96 object-cover"
						/>
						<div className="absolute top-0 left-0 w-full h-full bg-black/40 p-6 flex flex-col justify-end">
							<h2 className="text-3xl font-bold text-white">
								{featuredMovie.Title}
							</h2>
							<p className="mt-2 text-sm text-gray-300">{featuredMovie.Plot}</p>
						</div>
					</NavLink>
				</motion.div>
			)}

			{/* You Might Like Section */}
			<section>
				<h3 className="text-xl font-bold mb-4">Featured Movies</h3>
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.6 }}
					className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
				>
					{recommendations.map((movie) => (
						<NavLink
							to={`/movies/${movie.imdbID}`}
							key={movie.imdbID}
							className="bg-black/20 rounded-lg min-h-60 shadow-md p-4"
						>
							<img
								src={movie.Poster}
								alt={movie.Title}
								className="rounded-lg mb-4 w-full h-[300px] object-cover"
							/>
							<h4 className="text-sm font-bold">{movie.Title}</h4>
							<p className="text-xs text-gray-300">{movie.Year}</p>
						</NavLink>
					))}
				</motion.div>
			</section>
		</main>
	);
};

export default Home;
