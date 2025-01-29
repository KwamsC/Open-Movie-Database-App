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
    <div className="space-y-4 bg-black/20 p-4 rounded-xl">
      <div className="flex justify-between items-center">
        <h3 className="text-l font-medium">Search</h3>
        <button
          type="submit"
          onClick={onClear}
          className="text-sm hover:underline"
        >
          Clear
        </button>
      </div>
      <input
        type="text"
        name="title"
        value={filters.title}
        onChange={onChange}
        onKeyDown={onKeyDown}
        placeholder="Search movies..."
        className="w-full px-4 py-2 min-h-[44px] rounded-xl bg-black/20 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="number"
        name="year"
        value={filters.year}
        onChange={onChange}
        placeholder="Year"
        min="1900"
        max={new Date().getFullYear()}
        className="w-full px-4 py-2 min-h-[44px] rounded-xl bg-black/20 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <select
        name="type"
        value={filters.type}
        onChange={onChange}
        className="w-full px-4 py-2 min-h-[44px] rounded-xl bg-black/20 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Select Media</option>
        {MEDIA_TYPES.map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>
      <button
        type="submit"
        onClick={onSearch}
        disabled={isLoading}
        className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-xl"
      >
        {isLoading ? 'Searching...' : 'Search'}
      </button>
    </div>
  );
};

export default SearchBox;