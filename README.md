# Open-Movie-Database-App
A web application that allows users to search and explore movies using The Open Movie Database (OMDb) API. Users can search for movies by title, filter by year and genre, and view detailed information about specific movies.

## Features
- Search movies by title
- Filter movies by year and genre
- View detailed movie information
- OpenAPI documentation

## Tech Stack
### Frontend
- ReactJS (Vite)
- TypeScript
- CSS3

### Backend
- NodeJS
- ExpressJS
- Swagger (OpenAPI documentation)

## API Documentation
The API documentation is available at `/docs` endpoint when running the application. The backend provides two main endpoints:
- `GET /api/v1/search` - Search movies with filters
- `GET /api/v1/movies/{id}` - Get detailed information about a specific movie

## Project Setup
This application is containerized with Docker, combining both frontend and backend in a single container. The NodeJS/Express backend serves the static files built with ReactJS.


## How to run the application
To run the application, you will first need to create an `.env` file in the root directory.
You could copy from the `.env.example` and make sure to add your own `API_KEY`, which you can generate and obtain from the [The Open Movie Database](https://www.omdbapi.com/)

If you have `nvm` installed, run the following command to get the right node version, otherwise install the node version 23.6.1

```bash
nvm install
```

Install dependencies
```bash
npm install
```

To run it locally, run the following command

```bash
npm run dev
```

To run tests locally, run the following command (backend)


```bash
npm run test
```