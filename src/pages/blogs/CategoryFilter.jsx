// src/components/blog/CategoryFilter.jsx
import React from 'react';

const CategoryFilter = ({ categories, selectedCategory, onSelect }) => {
  return (
    <div className="flex flex-wrap gap-2 my-4">
      <button
        onClick={() => onSelect('All')}
        className={`px-4 py-2 rounded-full border ${
          selectedCategory === 'All'
            ? 'bg-blue-600 text-white'
            : 'bg-white text-gray-700'
        }`}
      >
        All
      </button>
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onSelect(category)}
          className={`px-4 py-2 rounded-full border ${
            selectedCategory === category
              ? 'bg-blue-600 text-white'
              : 'bg-white text-gray-700'
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
