import { motion } from "motion/react";
import { NavLink } from "react-router";
import type { Movie } from "../../../types/Movie";

interface FeaturedMoviesProps {
	movie: Movie;
	index: number;
}

const FeaturedMovie = ({ movie, index }: FeaturedMoviesProps) => {
	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.6, delay: index * 0.1 }}
		>
			<NavLink
				to={`/movies/${movie.imdbID}`}
				className="block bg-black/40 rounded-lg min-h-60 shadow-md transition-all duration-300 hover:shadow-2xl hover:scale-105 hover:bg-black/60 p-4"
			>
				<img
					src={movie.Poster !== "N/A" ? movie.Poster : "/movie-placeholder.png"}
					alt={movie.Title}
					className="rounded-lg mb-4 w-full h-[300px] object-cover"
					loading="lazy"
				/>
				<h4 className="text-sm font-bold line-clamp-1">{movie.Title}</h4>
				<p className="text-xs text-gray-300">{movie.Year}</p>
			</NavLink>
		</motion.div>
	);
};

export default FeaturedMovie;
