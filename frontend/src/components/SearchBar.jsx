import { FaSearch } from "react-icons/fa";

function SearchBar({ search, setSearch }) {
  return (
    <div className="relative mb-0">
      <FaSearch
        className="
        absolute
        left-5
        top-1/2
        -translate-y-1/2
        text-gray-400
      "
      />

      <input
        type="text"
        placeholder="Search notes..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="
        w-full
        pl-12
        pr-4
        py-4
        bg-white
        rounded-2xl
        border
        border-gray-300
        shadow-lg
        outline-none
        focus:ring-2
        focus:ring-blue-500
        placeholder:text-gray-500
        placeholder:font-medium
      "
      />
    </div>
  );
}

export default SearchBar;
