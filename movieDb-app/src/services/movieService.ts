const API_BASE_URL = '/api/v1';

export const movieService = {
	async fetchMovie(id: string) {
		const response = await fetch(`${API_BASE_URL}/movies/${id}`);
		if (!response.ok) throw new Error("Movie not found");
		return response.json();
	},

	async searchMovies(query: string) {
		const response = await fetch(`${API_BASE_URL}/search?title=${query}`);
		if (!response.ok) throw new Error("Failed to search movies");
		return response.json();
	},
};
