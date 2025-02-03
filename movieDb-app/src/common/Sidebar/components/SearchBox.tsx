import type { ChangeEvent } from "react";

interface SearchBoxProps {
	testId: string;
	filters: {
		title: string;
		year: string;
		type: string;
	};
	isLoading: boolean;
	onSearch: () => void;
	onClear: () => void;
	onChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
	onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

const SearchBox = ({
	testId,
	filters,
	isLoading,
	onSearch,
	onClear,
	onChange,
	onKeyDown,
}: SearchBoxProps) => {
	const MEDIA_TYPES = ["movie", "series"];
	const isDisabled = !filters.title || isLoading;

	return (
		<form
			data-testid={`search-form-${testId}`}
			className="space-y-4 rounded-xl bg-white p-4 dark:bg-stone-800/50"
		>
			<div className="flex items-center justify-between">
				<h3 className="text-l font-medium">Search</h3>
				<button
					type="button"
					onClick={onClear}
					className="text-sm hover:underline"
				>
					Clear
				</button>
			</div>

			<div className="space-y-2">
				<label
					htmlFor="media-title"
					className="block text-sm font-medium text-stone-600 dark:text-gray-300"
				>
					Title
				</label>
				<input
					id="media-title"
					data-testid={`search-title-input-${testId}`}
					type="text"
					name="title"
					value={filters.title}
					onChange={onChange}
					onKeyDown={onKeyDown}
					placeholder="Search..."
					className="min-h-[44px] w-full rounded-xl bg-black/10 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none dark:bg-black/20"
				/>
			</div>

			<div className="space-y-2">
				<label
					htmlFor="release-year"
					className="block text-sm font-medium text-stone-600 dark:text-gray-300"
				>
					Release Year
				</label>
				<input
					id="release-year"
					data-testid={`search-year-input-${testId}`}
					type="number"
					name="year"
					value={filters.year}
					onChange={onChange}
					placeholder="Year"
					min="1900"
					max={new Date().getFullYear()}
					className="min-h-[44px] w-full rounded-xl bg-black/10 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none dark:bg-black/20"
				/>
			</div>

			<div className="space-y-2">
				<label
					htmlFor="media-type"
					className="block text-sm font-medium text-stone-600 dark:text-gray-300"
				>
					Movie | Series
				</label>
				<select
					id="media-type"
					data-testid={`ssearch-type-select-${testId}`}
					name="type"
					value={filters.type}
					onChange={onChange}
					className="min-h-[44px] w-full rounded-xl bg-black/10 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none dark:bg-black/20"
					aria-label="Select media type"
				>
					<option value="">Select Media</option>
					{MEDIA_TYPES.map((type) => (
						<option key={type} value={type}>
							{type}
						</option>
					))}
				</select>
			</div>

			<button
				type="submit"
				data-testid={`search-submit-${testId}`}
				onClick={onSearch}
				disabled={isDisabled}
				className={`mt-3 w-full bg-emerald-700 px-4 py-2 shadow-md font-medium ${!isDisabled && "hover:bg-emerald-800"} rounded-xl text-white disabled:opacity-50`}
			>
				{isLoading ? "Searching..." : "Search"}
			</button>
		</form>
	);
};

export default SearchBox;
