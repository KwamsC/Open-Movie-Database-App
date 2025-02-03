import { NavLink } from "react-router";
import type { Search } from "../../../types/MovieSearch";

interface SearchedListItemProps {
	movie: Search;
	onItemClick?: () => void; // Optional prop to handle click event on list item.
}

const SearchedListItem = ({ movie, onItemClick }: SearchedListItemProps) => {
	return (
		<li
			key={movie.imdbID}
			className="rounded-lg bg-black/10 p-2 transition duration-400 hover:scale-105 hover:shadow-2xl dark:bg-white/20"
		>
			<NavLink
				onClick={onItemClick}
				to={`/movies/${movie.imdbID}`}
				className="flex items-center gap-4"
			>
				<img
					src={movie.Poster !== "N/A" ? movie.Poster : "/movie-placeholder.png"}
					alt={movie.Title}
					className="h-24 w-16 rounded-lg object-cover"
				/>
				<div>
					<h4 className="font-medium">{movie.Title}</h4>
					<p className="text-sm text-stone-600 dark:text-gray-300">
						{movie.Year}
					</p>
					<p className="text-xs text-stone-700 capitalize dark:text-gray-400">
						{movie.Type}
					</p>
				</div>
			</NavLink>
		</li>
	);
};

export default SearchedListItem;
