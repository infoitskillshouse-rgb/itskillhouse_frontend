// src/components/blog/CategoryDropdown.jsx
import React from 'react';

const CategoryDropdown = ({ categories, selectedCategory, onSelect }) => {
  return (
    <div className="my-4 w-full max-w-xs">
      <select
        value={selectedCategory}
        onChange={(e) => onSelect(e.target.value)}
        className="w-full px-4 py-2 border rounded-md"
      >
        <option value="All">All</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CategoryDropdown;
