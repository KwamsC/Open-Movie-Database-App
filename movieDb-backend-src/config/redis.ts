import { createClient } from "redis";

const isTestEnvironment = process.env.NODE_ENV === 'test' ;

const createRedisClient = () => {
  if (isTestEnvironment) {
    console.log('Test environment detected, skipping Redis connection');
    return;
  }

  const client = createClient({
    socket: {
      host: process.env.REDIS_HOST || 'localhost',
      port: Number(process.env.REDIS_PORT) || 6379,
    },
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

  client.connect()

  return client;
};

const redisClient = createRedisClient();

export default redisClient;

