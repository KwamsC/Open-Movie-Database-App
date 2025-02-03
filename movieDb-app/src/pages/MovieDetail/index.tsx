import { useParams } from "react-router";
import Loader from "../../common/Loader";
import { useMovie } from "../../hooks/useMovie";
import PageLayout from "../../layouts/PageLayout";
import ErrorPage from "../ErrorPage";
import NotFound from "../NotFound";

const MovieDetail = () => {
	const { movieId } = useParams<{ movieId: string }>();
	const { movie, loading, error } = useMovie(movieId || "");

	if (loading) return <Loader />;
	if (error) return ErrorPage({ message: error });
	if (!movie || !movie.Title) return <NotFound />;

	return (
		<PageLayout showBackButton>
			<h1 className="mb-4 text-3xl font-bold">{movie.Title}</h1>
			<div className="grid grid-cols-1 gap-8 md:grid-cols-2">
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
		</PageLayout>
	);
};

export default MovieDetail;
