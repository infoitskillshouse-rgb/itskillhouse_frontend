import React, { useEffect, useState } from 'react';
import axios from '../../../utils/axiosInstance';
import { Link } from 'react-router-dom';
import Spinner from '../../components/Spinner';
import SearchBar from '../../components/SearchBar';
import Pagination from '../../components/Pagination';
import EmptyState from '../../components/EmptyState';
import BlogCard from './BlogCard';

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const blogsPerPage = 6;

  const fetchBlogs = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/blogs`);
      setBlogs(res.data.blogs);
      setFiltered(res.data.blogs);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleSearch = (term) => {
    setSearchTerm(term);
    const filtered = blogs.filter(blog =>
      blog.title.toLowerCase().includes(term.toLowerCase()) ||
      blog.category?.toLowerCase().includes(term.toLowerCase())
    );
    setFiltered(filtered);
    setCurrentPage(1);
  };

  const indexOfLast = currentPage * blogsPerPage;
  const indexOfFirst = indexOfLast - blogsPerPage;
  const currentBlogs = filtered.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filtered.length / blogsPerPage);

  if (loading) return <Spinner />;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-semibold mb-6 text-text text-center">Latest Blogs</h1>

      <SearchBar onSearch={handleSearch} />

      {currentBlogs.length === 0 ? (
        <EmptyState message={`No blogs found for "${searchTerm}"`} />
      ) : (
        <>
          <div className="grid md:grid-cols-3 gap-6">
            {currentBlogs.map(blog => (
              <Link
                to={`/blogs/${blog.slug}`}
                key={blog._id}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition"
              >
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-48 object-cover rounded-t-xl"
                />
                <div className="p-4">
                  <h2 className="text-xl font-semibold mb-2">{blog.title}</h2>
                  <p className="text-sm text-gray-500">{blog.category}</p>
                </div>
              </Link>
            ))}
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </>
      )}
    </div>
  );
};

export default BlogList;
