import { useMemo, useState } from "react";
import type { Search } from "../../../types/MovieSearch";

export const useSortedResults = (results: Search[]) => {
	const [sortConfig, setSortConfig] = useState<{
		field: "title" | "year";
		direction: "asc" | "desc";
	}>({
		field: "title",
		direction: "asc",
	});

	const handleSort = (field: "title" | "year") => {
		setSortConfig((prev) => ({
			field,
			direction:
				prev.field === field && prev.direction === "asc" ? "desc" : "asc",
		}));
	};

	const sortedResults = useMemo(
		() =>
			results.sort((a, b) => {
				if (sortConfig.field === "title") {
					return sortConfig.direction === "asc"
						? a.Title.localeCompare(b.Title)
						: b.Title.localeCompare(a.Title);
				}
				return sortConfig.direction === "asc"
					? Number(a.Year) - Number(b.Year)
					: Number(b.Year) - Number(a.Year);
			}),
		[results, sortConfig],
	);

	return { sortedResults, sortConfig, handleSort };
};
