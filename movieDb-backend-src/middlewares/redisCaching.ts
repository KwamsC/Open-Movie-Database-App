import type { RequestHandler } from "express";
import redisClient from "../config/redis.ts";

const CACHE_DURATION = 60 * 60 * 24; // 24 hours

export const redisCaching: RequestHandler = async (req, res, next) => {
	if (!redisClient.isOpen) {
		console.warn("Redis client not connected, skipping cache");
		return next();
	}

	try {
		const key = `movie:${req.params.id || req.query.title}`;
		const cachedData = await redisClient.get(key);

		if (cachedData) {
			console.log("Cache hit:", key);
			res.json(JSON.parse(cachedData));
			return;
		}

		console.log("Cache miss:", key);
		const originalJson = res.json;
		res.json = (body) => {
			void redisClient
				.setEx(key, CACHE_DURATION, JSON.stringify(body))
				.catch((err) => console.error("Redis cache set error:", err));
			return originalJson.call(res, body);
		};

		next();
	} catch (error) {
		next(error);
	}
};
