import type { ChangeEvent } from 'react';

interface SearchBoxProps {
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
  filters, 
  isLoading, 
  onSearch, 
  onClear, 
  onChange,
  onKeyDown 
}: SearchBoxProps) => {
  const MEDIA_TYPES = ["movie", "series", "episode"];

  return (
    <form data-testid="search-form" className="space-y-4 bg-black/20 p-4 rounded-xl">
      <div className="flex justify-between items-center">
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
        <label htmlFor="media-title" className="block text-sm font-medium text-gray-300">
          Title
        </label>
        <input
          id="media-title"
          data-testid="search-title-input"
          type="text"
          name="title"
          value={filters.title}
          onChange={onChange}
          onKeyDown={onKeyDown}
          placeholder="Search movies..."
          className="w-full px-4 py-2 min-h-[44px] rounded-xl bg-black/20 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="release-year" className="block text-sm font-medium text-gray-300">
          Release Year
        </label>
        <input
          id="release-year"
          data-testid="search-year-input"
          type="number"
          name="year"
          value={filters.year}
          onChange={onChange}
          placeholder="Year"
          min="1900"
          max={new Date().getFullYear()}
          className="w-full px-4 py-2 min-h-[44px] rounded-xl bg-black/20 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="media-type" className="block text-sm font-medium text-gray-300">
          Movie | Series | Episode
        </label>
        <select
          id="media-type"
          data-testid="search-type-select"
          name="type"
          value={filters.type}
          onChange={onChange}
          className="w-full px-4 py-2 min-h-[44px] rounded-xl bg-black/20 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
        data-testid="search-submit"
        onClick={onSearch}
        disabled={isLoading}
        className="w-full px-4 py-2 font-medium mt-3 bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white rounded-xl"
      >
        {isLoading ? 'Searching...' : 'Search'}
      </button>
    </form>
  );
};

export default SearchBox;