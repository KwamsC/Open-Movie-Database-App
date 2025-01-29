import { NavLink } from "react-router";
import type { Movie } from "../../../types/Movie";

interface SearchResultsProps {
	results: Movie[];
	isSearched?: boolean;
	onItemClick?: () => void;
}

const SearchResults = ({
	results,
	isSearched,
	onItemClick,
}: SearchResultsProps) => {
	if (!isSearched) return null;

	return (
		<div className="space-y-4 bg-black/20 p-4 mt-8 h-[40vh] overflow-scroll rounded-xl">
			<h3 className="text-lg font-bold mb-2">Search Results</h3>
			{results?.length > 0 ? (
				<ul className="space-y-2">
					{results.map((movie) => (
						<li
							key={movie.imdbID}
							data-testid="search-result-item"
							className="p-2 rounded-lg bg-white/20"
						>
							<NavLink onClick={onItemClick} to={`/movies/${movie.imdbID}`}>
								<h4 className="font-medium">{movie.Title}</h4>
								<p className="text-sm text-gray-300">{movie.Year}</p>
							</NavLink>
						</li>
					))}
				</ul>
			) : (
				<div
					data-testid="no-results"
					className="flex flex-col items-center justify-center h-32 text-gray-400"
				>
					<p>No movies found</p>
					<p className="text-sm">Try adjusting your search criteria</p>
				</div>
			)}
		</div>
	);
};

export default SearchResults;
