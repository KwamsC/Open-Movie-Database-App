import app from "./movieDb-backend-src/app.ts";

const { PORT } = process.env || 8080;

app.listen(PORT, () =>
	console.log(`App is listening on port ${PORT}`),
);