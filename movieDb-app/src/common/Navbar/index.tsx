import { NavLink } from "react-router";

const Navbar = () => {
	return (
		<nav className="sm:ml-64 p-4 gap-10 flex fixed">
			<NavLink
				to="/"
				className={({ isActive }) =>
					isActive
						? "text-white text-sm underline font-medium"
						: "text-white text-sm font-medium hover:text-blue-400"
				}
			>
				Home
			</NavLink>
			<NavLink
				className={({ isActive }) =>
					isActive
						? "text-white text-sm underline font-medium"
						: "text-white text-sm font-medium hover:text-blue-400"
				}
				to="/movies/tt3896198"
			>
				Movies
			</NavLink>
		</nav>
	);
};

export default Navbar;
