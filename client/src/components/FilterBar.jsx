function FilterBar({ onFilterChange }) {
  const filters = ['All', 'Music', 'Gaming', 'Tech', 'Tutorials'];

  return (
    <div className="flex gap-2 p-4 overflow-x-auto">
      {filters.map((filter) => (
        <button
          key={filter}
          onClick={() => onFilterChange(filter)}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300"
        >
          {filter}
        </button>
      ))}
    </div>
  );
}

export default FilterBar;