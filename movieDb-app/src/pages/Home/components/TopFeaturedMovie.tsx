import { motion } from "framer-motion";
import { NavLink } from "react-router";
import type { Movie } from "../../../types/Movie";

interface FeaturedMovieProps {
	movie: Movie;
}

const FeaturedMovie = ({ movie }: FeaturedMovieProps) => {
	return (
		<motion.div
			initial={{ opacity: 0, y: -20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.6 }}
			className="relative bg-black/20 rounded-2xl overflow-hidden shadow-lg hover:bg-black/70 hover:shadow-2xl mb-8"
		>
			<NavLink to={`/movies/${movie.imdbID}`}>
				<motion.div
					initial={{ opacity: 0, x: -20 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ delay: 0.3, duration: 0.4 }}
					className="absolute top-4 left-4 z-10 px-3 py-1 bg-stone-400/50 backdrop-blur-sm rounded-4xl"
				>
					<span className="text-sm font-medium text-white">
						🔥 Top Featured
					</span>
				</motion.div>
				<img
					src={movie.Poster}
					alt={movie.Title}
					className="w-full h-96 object-cover"
				/>
				<div className="absolute top-0 left-0 w-full h-full bg-black/70 p-6 flex flex-col justify-end">
					<h2 className="text-3xl font-bold text-white">{movie.Title}</h2>
					<p className="mt-2 text-sm text-gray-300">{movie.Plot}</p>
				</div>
			</NavLink>
		</motion.div>
	);
};

export default FeaturedMovie;
