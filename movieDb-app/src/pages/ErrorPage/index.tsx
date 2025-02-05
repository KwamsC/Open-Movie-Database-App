import { NavLink } from "react-router";
import PageLayout from "../../layouts/PageLayout";

interface ErrorProps {
	message: string;
}

const ErrorPage = ({ message }: ErrorProps) => {
	return (
		<PageLayout isError>
			<div className="mx-auto max-w-screen-sm text-center">
				<h1 className="mb-4 text-7xl font-bold lg:text-9xl">Oops</h1>
				<p className="mb-4 text-3xl font-bold tracking-tight text-gray-300 md:text-4xl">
					There has been an error.
				</p>
				<p className="mb-4 text-lg font-light">{message}</p>
				<NavLink
					to="/"
					className="my-4 inline-flex rounded-4xl bg-stone-800/40 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-stone-800/60"
				>
					Back to Homepage
				</NavLink>
			</div>
		</PageLayout>
	);
};

export default ErrorPage;
