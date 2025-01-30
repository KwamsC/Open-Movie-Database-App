import { NavLink } from "react-router";

const NotFound = () => {
	return (
		<>
			<div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
				<div className="mx-auto max-w-screen-sm text-center">
					<h1 className="mb-4 text-7xl font-bold lg:text-9xl">404</h1>
					<p className="mb-4 text-3xl tracking-tight font-bold text-gray-300 md:text-4xl">
						Something's missing.
					</p>
					<p className="mb-4 text-lg font-light text-gray-200">
						Sorry, we can't find that page. You'll find lots to explore on the
						home page.{" "}
					</p>
					<NavLink
						to="/"
						className="inline-flex text-white bg-stone-800/40 hover:bg-stone-800/60 font-medium rounded-4xl text-sm px-5 py-2.5 text-center my-4"
					>
						Back to Homepage
					</NavLink>
				</div>
			</div>
		</>
	);
};

export default NotFound;
