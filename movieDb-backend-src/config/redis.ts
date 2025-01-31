import { createClient } from "redis";

const isTestEnvironment = process.env.NODE_ENV === "test";

const createRedisClient = () => {
	if (isTestEnvironment) {
		console.log("Test environment detected, skipping Redis connection");
		return;
	}

	const client = createClient({
		url: process.env.REDIS_URL || 'redis://localhost:6379'
	});

	client.on("error", (err) => {
		console.error("Redis Client Error:", err);
		if (!isTestEnvironment) {
			process.exit(1);
		}
	});

	client.on("connect", () => {
		console.log("Connected to Redis");
	});

	client.connect();

	return client;
};

const redisClient = createRedisClient();

export default redisClient;
