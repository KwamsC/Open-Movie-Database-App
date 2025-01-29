import path from "node:path";
import { fileURLToPath } from "node:url";
import cors, { type CorsOptions } from "cors";
import express, { type Application } from "express";
import { rateLimit } from "express-rate-limit";
import helmet from "helmet";
import swaggerUi from "swagger-ui-express";
import movieRoutes from "./api/movies/routes.ts";
import { apiDocumentation } from "./config/swagger.ts";
import { errorHandler } from "./middlewares/errorHandler.ts";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app: Application = express();

// Trust proxy for Cloud Run
app.set("trust proxy", 1);

// CORS
const allowedOrigins = [
	"http://localhost:5173",
	"http://localhost:8080",
	process.env.PROD_URL,
];
const corsOptions: CorsOptions = {
	origin: allowedOrigins.filter((origin) => origin !== undefined),
	methods: ["GET", "POST"],
	credentials: true,
	optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

// Static Files React
app.use(express.static("movieDb-app/dist"));

// API Docs
app.use("/docs", swaggerUi.serve, swaggerUi.setup(apiDocumentation));

// Middleware
app.use(
	helmet({
		contentSecurityPolicy: {
			directives: {
				defaultSrc: ["'self'"],
				scriptSrc: ["'self'", "'unsafe-inline'"],
				styleSrc: ["'self'", "'unsafe-inline'"],
				imgSrc: ["'self'", "data:", "https:", "http:"],
				connectSrc: ["'self'", "https:", "http:"],
			},
		},
	}),
);
app.use(express.json({ limit: "300kb" }));
app.use(express.urlencoded({ extended: false }));
app.use(
	rateLimit({
		windowMs: 15 * 60 * 1000, // 15 minutes
		limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
		standardHeaders: "draft-7", // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
		legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
	}),
);

// Health Check
app.get("/health", (req, res) => {
	res.status(200).json({ status: "ok" });
});

// Routes
app.use("/api/v1", movieRoutes);

app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "../movieDb-app/dist/index.html"));
});

// Error Handler
app.use(errorHandler);

export default app;
