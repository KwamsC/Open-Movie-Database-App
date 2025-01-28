import { motion } from "motion/react";
import { useState } from "react";
// import { NavLink } from "react-router";
// import { movieService } from "../../services/movieService";

interface SidebarProps {
	isOpen: boolean;
	setIsOpen: (isOpen: boolean) => void;
}

interface SearchFilters {
	title: string;
	year: string;
	genre: string;
}

const Sidebar = ({ isOpen, setIsOpen }: SidebarProps) => {
	const [filters, setFilters] = useState<SearchFilters>({
		title: "",
		year: "",
		genre: "",
	});

	const handleFilterChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
	) => {
		setFilters((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}));
	};

	const genres = [
		"All",
		"Action",
		"Comedy",
		"Drama",
		"Horror",
		"Sci-Fi",
		"Thriller",
	];
	return (
		<>
			<aside className="w-1/4 min-w-[250px] hidden md:block p-4">
				<h2 className="text-xl h-16 font-bold content-center mb-6">MovieDB</h2>
				{/* SearchBox */}
				<div className="space-y-4 bg-stone-500/20 backdrop-blur-2xl p-4  rounded-xl">
					<h3 className="text-l font-medium">Search</h3>
					<input
						type="text"
						name="title"
						value={filters.title}
						onChange={handleFilterChange}
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
						name="genre"
						value={filters.genre}
						onChange={handleFilterChange}
						className="w-full px-4 py-2 min-h-[44px] rounded-xl bg-black/20 focus:outline-none focus:ring-2 focus:ring-blue-500"
					>
						<option value="">Select Genre</option>
						{genres.map((genre) => (
							<option key={genre} value={genre}>
								{genre}
							</option>
						))}
					</select>
				</div>

				{/* Search Results */}
				<div className="space-y-4 bg-stone-500/20 backdrop-blur-2xl p-4 mt-8 rounded-xl">
					<h3 className="text-lg font-bold mb-2">Search Results</h3>
					<ul className="space-y-2">
						{["Movie1", "Movie2", "Movie3", "Movie4", "Movie5"].map((movie) => (
							<li key={movie} className="p-2 rounded-lg bg-white/20">
								{movie}
							</li>
						))}
					</ul>
				</div>
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
				className="fixed top-0 left-0 bottom-0 w-1/4 min-w-[250px] md:hidden p-4 bg-white/10 backdrop-blur-2xl border-r border-white/10 z-20"
			>
				<h2 className="text-xl font-bold m-3 text-right">MovieDB</h2>
				<div className="py-6">
					<div className="space-y-4 bg-stone-500/20 backdrop-blur-2xl p-4  rounded-xl">
						<h3 className="text-l font-medium">Search</h3>
						<input
							type="text"
							name="title"
							value={filters.title}
							onChange={handleFilterChange}
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
							name="genre"
							value={filters.genre}
							onChange={handleFilterChange}
							className="w-full px-4 py-2 min-h-[44px] rounded-xl bg-black/20 focus:outline-none focus:ring-2 focus:ring-blue-500"
						>
							<option value="">Select Genre</option>
							{genres.map((genre) => (
								<option key={genre} value={genre}>
									{genre}
								</option>
							))}
						</select>
					</div>
				</div>

				{/* Mobile Search Results */}
				<div className="space-y-4 bg-stone-600/10 backdrop-blur-2xl p-4  rounded-xl">
					<h3 className="font-bold mb-2">Search Results</h3>
					<ul className="space-y-2">
						{["Movie1", "Movie2", "Movie3", "Movie4", "Movie5"].map((movie) => (
							<li key={movie} className="p-2 rounded-lg bg-white/20">
								{movie}
							</li>
						))}
					</ul>
				</div>
			</motion.aside>
		</>
	);
};

export default Sidebar;
