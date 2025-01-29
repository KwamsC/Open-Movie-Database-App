const API_BASE_URL = "/api/v1";

export const movieService = {
	async fetchMovie(id: string) {
		const response = await fetch(`${API_BASE_URL}/movies/${id}`);
		if (!response.ok) throw new Error("Movie not found");
		return response.json();
	},

	async searchMovies(title: string, year?: string, type?: string) {
    const params = new URLSearchParams();
    if (title) params.append('title', title);
    if (year) params.append('year', year);
    if (type) params.append('type', type);
    

		const response = await fetch(`${API_BASE_URL}/search?${params}`);
		if (!response.ok) throw new Error("Failed to search movies");
		return response.json();
	},
};
