// src/components/blog/BlogCard.jsx
import { Link } from "react-router-dom";

const BlogCard = ({ blog }) => {
  const { title, description, image, category, createdAt, slug } = blog;

  return (
    <div className="bg-white shadow-md rounded-xl overflow-hidden transition hover:shadow-lg">
      <Link to={`/blogs/${slug}`}>
        <img
          src={`${import.meta.env.VITE_API_BASE_URL}/uploads/blogs/${image}`}
          alt={title}
          className="w-full h-48 object-cover"
        />
      </Link>
      <div className="p-4">
        <p className="text-sm text-gray-500 mb-1">{new Date(createdAt).toDateString()}</p>
        <Link to={`/blogs/${slug}`}>
          <h2 className="text-lg font-semibold text-gray-800 line-clamp-2">{title}</h2>
        </Link>
        <p className="text-sm text-gray-600 mt-2 line-clamp-3">{description}</p>

        <Link
          to={`/blogs?category=${category}`}
          className="inline-block mt-3 text-xs px-2 py-1 bg-blue-100 text-blue-600 rounded"
        >
          #{category}
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;
