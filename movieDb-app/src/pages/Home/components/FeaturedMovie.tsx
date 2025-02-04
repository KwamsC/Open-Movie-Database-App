import { motion } from "motion/react";
import { NavLink } from "react-router";
import type { Search } from "../../../types/MovieSearch";

interface FeaturedMoviesProps {
	movie: Search;
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
				className="block min-h-60 rounded-lg bg-white p-4 shadow-md transition-all duration-300 hover:scale-105 hover:bg-stone-200 hover:shadow-2xl dark:bg-stone-800/50 backdrop-blur-xl backdrop-filter dark:hover:bg-stone-800/60"
			>
				<img
					src={movie.Poster !== "N/A" ? movie.Poster : "/movie-placeholder.png"}
					alt={movie.Title}
					className="mb-4 h-[300px] w-full rounded-lg object-cover"
					loading="lazy"
				/>
				<h4 className="line-clamp-1 text-sm font-bold">{movie.Title}</h4>
				<p className="text-xs text-stone-700 dark:text-gray-300">
					{movie.Year}
				</p>
			</NavLink>
		</motion.div>
	);
};

export default FeaturedMovie;
