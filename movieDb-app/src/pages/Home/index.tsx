import { useEffect, useState } from "react";
import Loader from "../../common/Loader";
import { movieService } from "../../services/movieService";
import type { Movie } from "../../types/Movie";
import ErrorPage from "../ErrorPage";
import FeaturedMovie from "./components/FeaturedMovie";
import TopFeaturedMovie from "./components/TopFeaturedMovie";

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
		<main className="my-3 md:m-6">
			{/* Featured Movie */}
			{featuredMovie && <TopFeaturedMovie movie={featuredMovie} />}

			{/* Featured Movies */}
			<section>
				<h3 className="text-xl font-bold mb-4">Featured Movies</h3>
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
					{recommendations.map((movie, index) => (
						<FeaturedMovie key={movie.imdbID} movie={movie} index={index} />
					))}
				</div>
			</section>
		</main>
	);
};

export default Home;
