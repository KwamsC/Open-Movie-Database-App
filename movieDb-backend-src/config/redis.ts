import { createClient } from "redis";

const REDIS_HOST = 'localhost';
const REDIS_PORT = 6379;

const redisClient = createClient({
  socket: {
    host: process.env.REDIS_HOST || REDIS_HOST,
    port: Number(process.env.REDIS_PORT) || REDIS_PORT,
    reconnectStrategy: (retries) => Math.min(retries * 50, 1000),
  },
  database: 0,
});

redisClient.on("error", (err) => console.error("Redis Client Error", err));
redisClient.connect();

export default redisClient;
