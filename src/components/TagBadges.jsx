// src/components/blog/TagBadges.jsx
const TagBadges = ({ tags = [] }) => {
  if (!tags.length) return null;

  return (
    <div className="flex flex-wrap gap-2 mt-2">
      {tags.map((tag, idx) => (
        <span
          key={idx}
          className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full"
        >
          #{tag}
        </span>
      ))}
    </div>
  );
};

export default TagBadges;
