import { useState } from "react";
import "./Search.css";

const Search = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    onSearch(query);
  };

  return (
    <div className="search-wrapper">
      <input
        className="search-input"
        type="text"
        placeholder="Search by name or author"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={handleSearch} className="search-button">
        Search
      </button>
    </div>
  );
};

export default Search;
