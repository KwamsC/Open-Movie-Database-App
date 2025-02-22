import { motion } from "motion/react";
import { useState } from "react";
import { NavLink } from "react-router";
import { movieService } from "../../services/movieService";
import type { Movie } from "../../types/Movie";
import SearchBox from "./components/SearchBox";
import SearchResults from "./components/SearchResults";

interface SidebarProps {
	isOpen: boolean;
	setIsOpen: (isOpen: boolean) => void;
}

interface SearchFilters {
	title: string;
	year: string;
	type: string;
}

const Sidebar = ({ isOpen, setIsOpen }: SidebarProps) => {
	const [filters, setFilters] = useState<SearchFilters>({
		title: "",
		year: "",
		type: "",
	});

	const handleItemClick = () => {
		setIsOpen(false);
	};

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
				filters.type,
			);
			setSearchResults(results.Search);
			console.log(searchResults);
		} catch (error) {
			console.error("Search failed:", error);
		} finally {
			setIsLoading(false);
		}
	};

	const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter" && filters.title) {
			e.preventDefault();
			await handleSearch();
		}
	};

	const handleClearSearch = () => {
		setFilters({
			title: "",
			year: "",
			type: "",
		});
		setSearchResults([]);
		setIsLoading(false);
		setIsSearched(false);
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
			<aside className="hidden w-1/4 min-w-[250px] p-4 md:block">
				<NavLink to="/">
					<h2
						data-testid="desktop-header"
						className="mb-6 h-16 content-center text-xl font-bold"
					>
						MovieDB
					</h2>
				</NavLink>
				{/* SearchBox */}
				<SearchBox
					testId="desktop"
					filters={filters}
					isLoading={isLoading}
					onSearch={handleSearch}
					onClear={handleClearSearch}
					onChange={handleFilterChange}
					onKeyDown={handleKeyDown}
				/>

				{/* Search Results */}
				<SearchResults
					testId="desktop"
					results={searchResults}
					isSearched={isSearched}
				/>
			</aside>

			{/* Mobile Overlay */}
			{isOpen && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ duration: 0.2 }}
					className="fixed inset-0 z-10 bg-black/60 backdrop-blur-sm md:hidden"
					onClick={() => setIsOpen(false)}
				/>
			)}

			{/* Mobile Menu */}
			<motion.aside
				initial={{ opacity: 0, x: -250 }}
				animate={{ x: isOpen ? 0 : -250, opacity: isOpen ? 1 : 0 }}
				className="fixed top-0 bottom-0 left-0 z-20 w-1/4 min-w-[250px] border-r border-white/10 bg-white/60 p-4 backdrop-blur-2xl md:hidden dark:bg-white/20"
			>
				<h2
					data-testid="mobile-header"
					className="m-3 mb-9 text-right text-xl font-bold"
				>
					MovieDB
				</h2>
				<SearchBox
					testId="mobile"
					filters={filters}
					isLoading={isLoading}
					onSearch={handleSearch}
					onClear={handleClearSearch}
					onChange={handleFilterChange}
					onKeyDown={handleKeyDown}
				/>

				{/* Mobile Search Results */}
				<SearchResults
					testId="mobile"
					results={searchResults}
					isSearched={isSearched}
					onItemClick={handleItemClick}
				/>
			</motion.aside>
		</>
	);
};

export default Sidebar;
