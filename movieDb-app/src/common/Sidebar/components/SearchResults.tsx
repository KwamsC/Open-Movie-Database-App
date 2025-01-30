import { useState } from "react";
import { NavLink } from "react-router";
import type { Movie } from "../../../types/Movie";

interface SearchResultsProps {
	testId: string;
	results: Movie[];
	isSearched?: boolean;
	onItemClick?: () => void;
}

interface SortConfig {
	field: "title" | "year";
	direction: "asc" | "desc";
}

const SearchResults = ({
	testId,
	results,
	isSearched,
	onItemClick,
}: SearchResultsProps) => {
	const [sortConfig, setSortConfig] = useState<SortConfig>({
		field: "title",
		direction: "asc",
	});

	const handleSort = (field: "title" | "year") => {
		setSortConfig((prev) => ({
			field,
			direction:
				prev.field === field && prev.direction === "asc" ? "desc" : "asc",
		}));
	};

	const sortedResults = results.sort((a, b) => {
		if (sortConfig.field === "title") {
			return sortConfig.direction === "asc"
				? a.Title.localeCompare(b.Title)
				: b.Title.localeCompare(a.Title);
		}
		return sortConfig.direction === "asc"
			? Number(a.Year) - Number(b.Year)
			: Number(b.Year) - Number(a.Year);
	});

	if (!isSearched) return null;

	return (
		<div
			data-testid={`search-results-${testId}`}
			className="space-y-4 bg-stone-800/50 p-4 mt-8 h-[40vh] overflow-scroll rounded-xl"
		>
			<h3 className="text-md font-bold mb-2">Search Results</h3>
			<div className="flex gap-2">
				<button
					type="button"
					onClick={() => handleSort("title")}
					className={`px-3 py-1 text-xs rounded-lg transition-all ${
						sortConfig.field === "title"
							? "bg-stone-700"
							: "bg-white/20 hover:bg-white/30"
					}`}
				>
					A-Z{" "}
					{sortConfig.field === "title" &&
						(sortConfig.direction === "asc" ? "↑" : "↓")}
				</button>
				<button
					type="button"
					onClick={() => handleSort("year")}
					className={`px-3 py-1 text-xs rounded-lg transition-all ${
						sortConfig.field === "year"
							? "bg-stone-700"
							: "bg-white/20 hover:bg-white/30"
					}`}
				>
					Year{" "}
					{sortConfig.field === "year" &&
						(sortConfig.direction === "asc" ? "↑" : "↓")}
				</button>
			</div>
			{sortedResults?.length > 0 ? (
				<ul className="space-y-2">
					{results.map((movie) => (
						<li
							key={movie.imdbID}
							className="p-2 rounded-lg bg-white/20 transition duration-400 hover:shadow-2xl hover:scale-105"
						>
							<NavLink
								onClick={onItemClick}
								to={`/movies/${movie.imdbID}`}
								className="flex items-center gap-4"
							>
								<img
									src={
										movie.Poster !== "N/A"
											? movie.Poster
											: "/movie-placeholder.png"
									}
									alt={movie.Title}
									className="w-16 h-24 object-cover rounded-lg"
								/>
								<div>
									<h4 className="font-medium">{movie.Title}</h4>
									<p className="text-sm text-gray-300">{movie.Year}</p>
									<p className="text-xs text-gray-400 capitalize">
										{movie.Type}
									</p>
								</div>
							</NavLink>
						</li>
					))}
				</ul>
			) : (
				<div
					data-testid={`no-results-${testId}`}
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
