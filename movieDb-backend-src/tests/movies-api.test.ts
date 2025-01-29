import assert from "node:assert";
import { beforeEach, describe, it, mock } from "node:test";
import request from "supertest";
import app from "../app.ts";

describe("Movie Routes", () => {
	const mockMovie = {
		Title: "Test Movie",
		Year: "2024",
    Type: "movie",
		imdbID: "tt1234567",
		Response: "True",
	};

	const mockSearchResults = {
		Search: [mockMovie],
		totalResults: "1",
		Response: "True",
	};

	beforeEach(() => {
		// Reset environment variables
		process.env.API_KEY = "test-api-key";
		process.env.BASE_URL = "http://test-api.com";
	});

	describe("GET /api/v1/movies/:id", () => {
		it("should fetch a movie by ID", async () => {
			mock.method(global, "fetch", () => ({
				json: async () => mockMovie,
			}));

			const response = await request(app)
				.get("/api/v1/movies/tt1234567")
				.expect(200);

			assert.deepStrictEqual(response.body, mockMovie);
		});

		it("should return 404 when movie not found", async () => {
			mock.method(global, "fetch", () => ({
				json: async () => ({ Response: "False" }),
			}));

			await request(app).get("/api/v1/movies/invalid").expect(404);
		});
	});

	describe("GET /api/v1/search", () => {
		it("should search movies with title", async () => {
			mock.method(global, "fetch", () => ({
				json: async () => mockSearchResults,
			}));

			const response = await request(app)
				.get("/api/v1/search?title=test")
				.expect(200);

			assert.deepStrictEqual(response.body, mockSearchResults);
		});

		it("should search movies with year and type", async () => {
			mock.method(global, "fetch", () => ({
				json: async () => mockSearchResults,
			}));

			const response = await request(app)
				.get("/api/v1/search?title=test&year=2024&type=movie")
				.expect(200);

			assert.deepStrictEqual(response.body, mockSearchResults);
		});

		it("should return 404 when no movies found", async () => {
			mock.method(global, "fetch", () => ({
				json: async () => ({ Response: "False" }),
			}));

			await request(app).get("/api/v1/search?title=nonexistent").expect(404);
		});
	});
});
