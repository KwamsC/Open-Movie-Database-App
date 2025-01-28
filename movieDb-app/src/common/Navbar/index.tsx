import { NavLink } from "react-router";

const Navbar = () => {
	return (
		<nav className="top-0 z-5 items-center px-6 h-16 flex md:justify-start justify-center">
			<NavLink
				to="/"
				className={({ isActive }) =>
					isActive
						? "text-white text-l font-bold rounded-4xl bg-black/60 backdrop-blur-md border-b border-white/20 px-6 py-2"
						: "text-white text-l font-medium hover:text-blue-400"
				}
			>
				Movies
			</NavLink>
		</nav>
	);
};

export default Navbar;
