// src/components/blog/SearchBar.jsx
import { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [term, setTerm] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(term);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <input
        type="text"
        placeholder="Search blogs..."
        className="border px-3 py-2 rounded w-full"
        value={term}
        onChange={(e) => setTerm(e.target.value)}
      />
    </form>
  );
};

export default SearchBar;
