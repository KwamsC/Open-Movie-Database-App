import type { Request, RequestHandler } from "express";
import redisClient from "../config/redis.ts";

const CACHE_DURATION = {
	SEARCH: 60 * 60, // 1 hour for search results
	DETAIL: 60 * 60 * 24, // 24 hours for movie details
};

const createCacheKey = (req: Request): string => {
	if (req.params.id) {
		return `movie:detail:${req.params.id}`;
	}

	const { title, type, year } = req.query;
	const searchParams = [
		title && `s:${title}`,
		type && `type:${type}`,
		year && `y:${year}`,
	].filter(Boolean);

	return `movie:search:${searchParams.join(":")}`;
};

export const redisCaching: RequestHandler = async (req, res, next) => {
	if (!redisClient?.isOpen) {
		console.warn("Redis client not connected, skipping cache");
		return next();
	}

	try {
		const key = createCacheKey(req);
		const cachedData = await redisClient.get(key);

		if (cachedData) {
			console.log("Cache hit:", key);
			res.json(JSON.parse(cachedData));
			return;
		}

		console.log("Cache miss:", key);
		const originalJson = res.json;
		res.json = (body) => {
			const duration = req.params.id
				? CACHE_DURATION.DETAIL
				: CACHE_DURATION.SEARCH;
			void redisClient
				?.setEx(key, duration, JSON.stringify(body))
				.catch((err) => console.error("Redis cache set error:", err));
			return originalJson.call(res, body);
		};

		next();
	} catch (error) {
		console.error("Cache error:", error);
		next();
	}
};
