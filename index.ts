import app from "./movieDb-backend-src/app.ts";

const port = process.env.PORT || 8080;
const host = process.env.HOST || '0.0.0.0';

app.listen(+port, host, () => {
  console.log(`Server running at http://${host}:${port}`);
});