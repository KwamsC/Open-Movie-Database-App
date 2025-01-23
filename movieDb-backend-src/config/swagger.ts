export const apiDocumentation = {
  openapi: "3.1.0",
  info: {
    title: "Open Movie DB API Docs",
    version: "1.0.0",
    description: "Backend API application for the Open Movie DB web app",
    contact: { name: "Kwame Carr" },
  },
  servers: [{ url: "http://localhost:8080/api/v1", description: "Local Server" }],
  tags: [{ name: "Movies" }],
  paths: {
    "/search": {
      get: {
        tags: ["Movies"],
        summary: "Search movies by title, genre, or year",
        parameters: [
          {
            name: "title",
            in: "query",
            required: false,
            description: "Title of the movie to search for",
            schema: { type: "string" },
          },
          {
            name: "genre",
            in: "query",
            required: false,
            description: "Genre of the movie to filter",
            schema: { type: "string" },
          },
          {
            name: "year",
            in: "query",
            required: false,
            description: "Year of release to filter",
            schema: { type: "string" },
          },
        ],
        responses: {
          200: { description: "A list of movies matching the search criteria" },
          404: { description: "No movies found" },
          500: { description: "Server error" },
        },
      },
    },
    "/movies/{id}": {
      get: {
        tags: ["Movies"],
        summary: "Fetch a movie by its ID",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            description: "IMDB ID of the movie to fetch",
            schema: { type: "string" },
          },
        ],
        responses: {
          200: { description: "Details of the movie with the given ID" },
          404: { description: "Movie not found" },
          500: { description: "Server error" },
        },
      },
    },
  },
};
