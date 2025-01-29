import { motion } from "motion/react";
import { useState } from "react";
import { NavLink } from "react-router";
import SearchResults from "./components/SearchResults";
import { movieService } from "../../services/movieService";
import type { Movie } from "../../types/Movie";

interface SidebarProps {
	isOpen: boolean;
	setIsOpen: (isOpen: boolean) => void;
}

interface SearchFilters {
	title: string;
	year: string;
  type: string;
}

const MEDIA_TYPES = ["movie", "series", "episode"];

const Sidebar = ({ isOpen, setIsOpen }: SidebarProps) => {
	const [filters, setFilters] = useState<SearchFilters>({
		title: "",
		year: "",
		type: "",
	});

  const [searchResults, setSearchResults] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSearched, setIsSearched] = useState(false);

	const handleSearch = async () => {
    try {
      setSearchResults([]);
      setIsLoading(true);
      setIsSearched(true);
      const results = await movieService.searchMovies(
        filters.title,
        filters.year,
        filters.type
      );
      setSearchResults(results.Search);
      console.log(searchResults)
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && filters.title) {
      e.preventDefault();
      await handleSearch();
    }
  };

  const handleClearSearch = () => {
    setFilters({
      title: "",
      year: "",
      type: ""
    });
    setSearchResults([]);
    setIsLoading(false);
    setIsSearched(false)
  };

  const handleFilterChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
	) => {
    setIsLoading(false);
		setFilters((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}));
	};

	return (
		<>
			<aside className="w-1/4 min-w-[250px] hidden md:block p-4">
				<NavLink to="/">
					<h2 className="text-xl h-16 font-bold content-center mb-6">
						MovieDB
					</h2>
				</NavLink>
				{/* SearchBox */}
				<div className="space-y-4 bg-black/20 p-4 rounded-xl">
          <div className="flex justify-between items-center">
          <h3 className="text-l font-medium">Search</h3>
            <button
            type="submit"
              onClick={handleClearSearch}
              className="text-sm hover:underline"
            >
              Clear
            </button>
          </div>
					<input
						type="text"
						name="title"
						value={filters.title}
            onChange={handleFilterChange}
            onKeyDown={handleKeyDown}
						placeholder="Search movies..."
						className="w-full px-4 py-2 min-h-[44px] rounded-xl bg-black/20 focus:outline-none focus:ring-2 focus:ring-blue-500"
					/>
					<input
						type="number"
						name="year"
						value={filters.year}
            onChange={handleFilterChange}
						placeholder="Year"
						min="1900"
						max={new Date().getFullYear()}
						className="w-full px-4 py-2 min-h-[44px] rounded-xl bg-black/20 focus:outline-none focus:ring-2 focus:ring-blue-500"
					/>
					<select
						name="type"
						value={filters.type}
            onChange={handleFilterChange}
						className="w-full px-4 py-2 min-h-[44px] rounded-xl bg-black/20 focus:outline-none focus:ring-2 focus:ring-blue-500"
					>
						<option value="">Select Media</option>
						{MEDIA_TYPES.map((type) => (
							<option key={type} value={type}>
								{type}
							</option>
						))}
					</select>
          <button
            type="submit"
            onClick={handleSearch}
            disabled={isLoading}
            className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-xl"
          >
            {isLoading ? 'Searching...' : 'Search'}
          </button>
				</div>

				{/* Search Results */}
        <SearchResults results={searchResults} isSearched={isSearched}  />
			</aside>

			{/* Mobile Overlay */}
			{isOpen && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ duration: 0.2 }}
					className="fixed inset-0 bg-black/60 backdrop-blur-sm z-10 md:hidden"
					onClick={() => setIsOpen(false)}
				/>
			)}

			{/* Mobile Menu */}
			<motion.aside
				initial={{ opacity: 0, x: -250 }}
				animate={{ x: isOpen ? 0 : -250, opacity: isOpen ? 1 : 0 }}
				className="fixed top-0 left-0 bottom-0 w-1/4 min-w-[250px] md:hidden p-4 bg-stone-500/40 backdrop-blur-2xl border-r border-white/10 z-20"
			>
				<h2 className="text-xl font-bold m-3 text-right">MovieDB</h2>
				<div className="py-6">
					<div className="space-y-4 bg-black/20 p-4  rounded-xl">
						<h3 className="text-l font-medium">Search</h3>
						<input
							type="text"
							name="title"
							value={filters.title}
              onChange={handleFilterChange}
              onKeyDown={handleKeyDown}
							placeholder="Search movies..."
							className="w-full px-4 py-2 min-h-[44px] rounded-xl bg-black/20 focus:outline-none focus:ring-2 focus:ring-blue-500"
						/>
						<input
							type="number"
							name="year"
							value={filters.year}
              onChange={handleFilterChange}
							placeholder="Year"
							min="1900"
							max={new Date().getFullYear()}
							className="w-full px-4 py-2 min-h-[44px] rounded-xl bg-black/20 focus:outline-none focus:ring-2 focus:ring-blue-500"
						/>
						<select
							name="type"
							value={filters.type}
              onChange={handleFilterChange}
							className="w-full px-4 py-2 min-h-[44px] rounded-xl bg-black/20 focus:outline-none focus:ring-2 focus:ring-blue-500"
						>
							<option value="">Select Media</option>
							{MEDIA_TYPES.map((type) => (
								<option key={type} value={type}>
									{type}
								</option>
							))}
						</select>
            <button
            type="submit"
            onClick={handleSearch}
            disabled={isLoading}
            className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-xl"
          >
            {isLoading ? 'Searching...' : 'Search'}
          </button>
					</div>
				</div>

				{/* Mobile Search Results */}
        <SearchResults results={searchResults} isSearched={isSearched} />
			</motion.aside>
		</>
	);
};

export default Sidebar;
