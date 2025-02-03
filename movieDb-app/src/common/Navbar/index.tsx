import { NavLink } from "react-router";
import ThemeToggle from "./components/ThemeToggle";

const Navbar = () => {
	return (
		<nav className="top-0 z-5 ml-12 flex h-16 items-center justify-between px-6 md:ml-0">
			<NavLink
				to="/"
				className={({ isActive }) =>
					isActive
						? "text-l rounded-4xl border-1 border-white/40 bg-white px-6 py-2 font-bold dark:bg-black/30"
						: "text-l rounded-4xl bg-white px-6 py-2 font-medium hover:bg-white/40 dark:bg-black/20 dark:hover:bg-stone-600"
				}
			>
				Movies
			</NavLink>
			<ThemeToggle />
		</nav>
	);
};

export default Navbar;
