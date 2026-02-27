// frontend/src/pages/admin/blogs/ViewBlogs.jsx
import React, { useEffect, useState } from 'react';
import axios from '../../api/axiosInstance'
import { Link } from 'react-router-dom';

const ViewBlogs = () => {
  const [blogs, setBlogs] = useState([]);

useEffect(() => {
  const fetchBlogs = async () => {
    try {
      const res = await fetch("/blogs");
      const data = await res.json();
      if (data.success) {
        setBlogs(data.blog); // 👈 make sure you're accessing `data.blogs`, not whole data
      }
    } catch (err) {
      console.error("Error fetching blogs:", err);
    }
  };

  fetchBlogs();
}, []);


  const deleteBlog = async (id) => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;
    try {
      await axios.delete(`/blogs/${id}`, { withCredentials: true });
      fetchBlogs();
    } catch (err) {
      alert('Error deleting blog');
    }
  };


  return (
    <div className="p-6 bg-white shadow-md rounded">
      <h2 className="text-2xl font-semibold mb-4">All Blogs</h2>
      <Link to="/admin/blogs/add" className="btn btn-primary mb-4">Add Blog</Link>
      <table className="w-full table-auto text-left border">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2">Title</th>
            <th className="p-2">Slug</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {blogs.map((blog) => (
            <tr key={blog._id} className="border-t">
              <td className="p-2">{blog.title}</td>
              <td className="p-2">{blog.slug}</td>
              <td className="p-2 space-x-2">
                <Link to={`/blogs/edit/${blog._id}`} className="btn btn-sm btn-secondary">Edit</Link>
                <button onClick={() => deleteBlog(blog._id)} className="btn btn-sm btn-danger">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewBlogs;
