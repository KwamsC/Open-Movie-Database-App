import { useParams } from "react-router";
import { NavLink } from "react-router";
import Loader from "../../common/Loader";
import { useMovie } from "../../hooks/useMovie";
import ErrorPage from "../ErrorPage";
import NotFound from "../NotFound";

const MovieDetail = () => {
	const { movieId } = useParams<{ movieId: string }>();
	const { movie, loading, error } = useMovie(movieId || "");

	if (loading) return <Loader />;
	if (error) return ErrorPage({ message: error });
	if (!movie) return <NotFound />;

	return (
		<div className="min-h-screen rounded-2xl bg-black/20 p-6 pt-16 md:m-6">
			<NavLink
				className="text-xl bg-black/20 hover:bg-black/40 py-3 px-4 rounded-4xl"
				to=".."
			>
				← back
			</NavLink>
			<div className="max-w-4xl mx-auto p-4 mt-4 text-white">
				<h1 className="text-3xl font-bold mb-4">{movie.Title}</h1>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
					<img
						src={movie.Poster}
						alt={movie.Title}
						className="rounded-lg shadow-xl"
					/>
					<div>
						<p className="mb-2">
							<span className="font-bold">Year:</span> {movie.Year}
						</p>
						<p className="mb-2">
							<span className="font-bold">Genre:</span> {movie.Genre}
						</p>
						<p className="mb-2">
							<span className="font-bold">Director:</span> {movie.Director}
						</p>
						<p className="mb-4">
							<span className="font-bold">Plot:</span> {movie.Plot}
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default MovieDetail;
