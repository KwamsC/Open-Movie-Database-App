import { NavLink } from "react-router";

const Navbar = () => {
	return (
		<nav className="top-0 z-5 items-center px-6 h-16 flex md:justify-start justify-center">
			<NavLink
				to="/"
				className={({ isActive }) =>
					isActive
						? "text-white text-l font-bold rounded-4xl bg-black/30 border-white/40 border-1 px-6 py-2"
						: "text-white text-l bg-black/20 font-medium hover:bg-black/40 hover:border-white/40 hover:border-1 rounded-4xl px-6 py-2"
				}
			>
				Movies
			</NavLink>
		</nav>
	);
};

export default Navbar;
