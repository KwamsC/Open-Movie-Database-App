import { motion } from "motion/react";
import { useState } from "react";
// import { NavLink } from "react-router";
// import { movieService } from "../../services/movieService";

const Sidebar = () => {
	const [isOpen, setIsOpen] = useState(false);

	const toggleSidebar = () => setIsOpen(!isOpen);

	return (
		<>
			<button
				type="button"
				onClick={toggleSidebar}
				className="fixed top-4 left-4 z-70 p-2 rounded-lg sm:hidden"
				aria-label="Toggle Sidebar"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					className="h-6 w-6 text-white"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<title>Toggle bar</title>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
					/>
				</svg>
			</button>

			<aside className="hidden fixed top-0 left-0 w-64 h-screen backdrop-blur-md bg-white/10 shadow-md z-50 sm:block">
				<div className="p-4">
					<div className="mb-8 text-2xl font-bold text-white sm:text-left text-right">
						MovieApp
					</div>
				</div>
			</aside>

			<motion.aside
				initial={{ opacity: 0, x: -300 }}
				animate={{ x: isOpen ? 0 : -300, opacity: isOpen ? 1 : 0 }}
				transition={{ duration: 0.3 }}
				className="fixed top-0 left-0 w-64 h-screen backdrop-blur-md bg-white/10 shadow-md z-50 sm:hidden"
			>
				<div className="p-4">
					<div className="mb-8 text-2xl font-bold text-white sm:text-left text-right">
						MovieApp
					</div>
				</div>
			</motion.aside>
		</>
	);
};

export default Sidebar;
