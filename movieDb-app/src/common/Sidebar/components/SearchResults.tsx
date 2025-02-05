import type { Search } from "../../../types/MovieSearch";
import { useSortedResults } from "../hooks/useSortedResults";
import SearchedListItem from "./SearchedListItem";
import SortButton from "./SortButton";

interface SearchResultsProps {
	testId: string;
	results: Search[];
	isSearched?: boolean;
	onItemClick?: () => void;
}

const SearchResults = ({
	testId,
	results,
	isSearched,
	onItemClick,
}: SearchResultsProps) => {
	const { sortedResults, sortConfig, handleSort } = useSortedResults(results);

	if (!isSearched) return null;

	return (
		<div
			data-testid={`search-results-${testId}`}
			className="mt-8 h-[40vh] space-y-4 overflow-scroll rounded-xl bg-white p-4 dark:bg-stone-800/50"
		>
			<h3 className="text-md mb-2 font-bold">Search Results</h3>
			<div className="flex gap-2">
				<SortButton
					label="A-Z"
					field="title"
					currentField={sortConfig.field}
					direction={sortConfig.direction}
					onClick={() => handleSort("title")}
				/>
				<SortButton
					label="Year"
					field="year"
					currentField={sortConfig.field}
					direction={sortConfig.direction}
					onClick={() => handleSort("year")}
				/>
			</div>
			{sortedResults?.length > 0 ? (
				<ul className="space-y-2">
					{results.map((movie) => (
						<SearchedListItem
							key={movie.imdbID}
							movie={movie}
							onItemClick={onItemClick}
						/>
					))}
				</ul>
			) : (
				<div
					data-testid={`no-results-${testId}`}
					className="flex h-32 flex-col items-center justify-center text-gray-400"
				>
					<p>No movies found</p>
					<p className="text-sm">Try adjusting your search criteria</p>
				</div>
			)}
		</div>
	);
};

export default SearchResults;
