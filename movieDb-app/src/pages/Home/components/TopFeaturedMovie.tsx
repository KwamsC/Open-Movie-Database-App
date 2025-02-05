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
			className="relative mb-8 overflow-hidden rounded-2xl bg-white/20 shadow-lg hover:bg-black/70 hover:shadow-2xl"
		>
			<NavLink to={`/movies/${movie.imdbID}`}>
				<motion.div
					initial={{ opacity: 0, x: -20 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ delay: 0.3, duration: 0.4 }}
					className="absolute top-4 left-4 z-10 rounded-4xl bg-stone-400/50 px-3 py-1 backdrop-blur-sm"
				>
					<span className="text-sm font-medium text-white">
						🔥 Top Featured
					</span>
				</motion.div>
				<img
					src={movie.Poster}
					alt={movie.Title}
					className="h-96 w-full object-cover"
				/>
				<div className="absolute top-0 left-0 flex h-full w-full flex-col justify-end bg-gradient-to-b from-black/30 to-black/80 p-6">
					<h2 className="text-3xl font-bold text-white">{movie.Title}</h2>
					<p className="mt-2 text-sm text-gray-300">{movie.Plot}</p>
				</div>
			</NavLink>
		</motion.div>
	);
};

export default FeaturedMovie;
