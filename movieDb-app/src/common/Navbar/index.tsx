import { NavLink } from "react-router";

const Navbar = () => {
	return (
		<nav className="top-0 z-5 items-center px-6 h-16 flex md:justify-start justify-center">
			<NavLink
				to="/"
				className={({ isActive }) =>
					isActive
						? "text-white text-l font-bold rounded-4xl bg-black/30 border-b border-white/20 px-6 py-2"
						: "text-white text-l font-medium hover:bg-black/20 rounded-4xl px-6 py-2"
				}
			>
				Movies
			</NavLink>
		</nav>
	);
};

export default Navbar;
