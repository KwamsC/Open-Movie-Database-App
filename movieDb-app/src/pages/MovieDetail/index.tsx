import { useParams } from "react-router";
import { useMovie } from "../../hooks/useMovie";

const MovieDetail = () => {
	const { movieId } = useParams<{ movieId: string }>();
	const { movie, loading, error } = useMovie(movieId || "");

	if (loading) return <div>Loading...</div>;
	if (error) return <div>Error: {error}</div>;
	if (!movie) return <div>Movie not found</div>;

	return (
		<div className="min-h-screen bg-gradient-to-br from-blue-900 to-gray-800 pt-20">
			<div className="max-w-4xl mx-auto p-4 text-white">
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
