import { useEffect, useState } from "react";
import { getAllBlogs, deleteBlog } from "../../services/blogService";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from "../../components/Spinner";
import { FaEdit, FaTrash } from "react-icons/fa";
import ConfirmationDialog from "../../components/ConfirmationDialog";

const AllBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [sortOrder, setSortOrder] = useState('desc');
  const [selectedBlogs, setSelectedBlogs] = useState([]);

  // For confirmation dialog
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null);
  const [confirmMessage, setConfirmMessage] = useState('');
  const [confirmTitle, setConfirmTitle] = useState('');
  

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const res = await getAllBlogs();
      setBlogs(res.data.blogs || []);
    } catch (err) {
      console.error("Error fetching blogs:", err);
      toast.error("Failed to fetch blogs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
    
  }, []);

  const handleDelete = (id) => {
    setConfirmTitle("Delete Blog");
    setConfirmMessage("Are you sure you want to delete this blog?");
    setConfirmAction(() => async () => {
      try {
        await deleteBlog(id);
        toast.success("Blog deleted successfully");
        fetchBlogs();
      } catch (err) {
        console.error("Delete error:", err);
        toast.error("Failed to delete blog");
      }
    });
    setConfirmOpen(true);
  };

  const handleBulkDelete = () => {
    if (!selectedBlogs.length) {
      toast.warn("Please select at least one blog to delete");
      return;
    }

    setConfirmTitle("Bulk Delete");
    setConfirmMessage("Are you sure you want to delete selected blogs?");
    setConfirmAction(() => async () => {
      try {
        await Promise.all(selectedBlogs.map(id => deleteBlog(id)));
        toast.success("Bulk delete successful");
        setSelectedBlogs([]);
        fetchBlogs();
      } catch (err) {
        console.error("Bulk delete error:", err);
        toast.error("Bulk delete failed");
      }
    });
    setConfirmOpen(true);
  };

  const exportCSV = () => {
    const headers = ["Title", "Slug", "Status", "Created At"];
    const rows = blogs.map(b => [b.title, b.slug, b.status, new Date(b.createdAt).toLocaleDateString()]);
    const csv = [headers, ...rows].map(row => row.join(",")).join("\n");

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "blogs.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const filtered = blogs
    .filter(blog => blog.title.toLowerCase().includes(search.toLowerCase()))
    .filter(blog => filterStatus ? blog.status === filterStatus : true)
    .sort((a, b) =>
      sortOrder === 'asc'
        ? new Date(a.createdAt) - new Date(b.createdAt)
        : new Date(b.createdAt) - new Date(a.createdAt)
    );

  return (
    <div className="p-6">
      <div className="flex justify-between mb-6 items-center">
        <h1 className="text-2xl font-bold text-gray-800">All Blogs</h1>
        <Link
          to="/admin/blogs/add"
          className="bg-blue-600 hover:bg-blue-700 transition-colors text-white px-4 py-2 rounded-md"
        >
          + Add Blog
        </Link>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap gap-4 mb-4 items-center">
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border px-3 py-2 rounded w-full md:w-1/4"
        />
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="border px-3 py-2 rounded"
        >
          <option value="">All Status</option>
          <option value="published">Published</option>
          <option value="draft">Draft</option>
        </select>
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="border px-3 py-2 rounded"
        >
          <option value="desc">Newest First</option>
          <option value="asc">Oldest First</option>
        </select>
        <div className="flex gap-2">
          <button
            onClick={handleBulkDelete}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Bulk Delete
          </button>
          <button
            onClick={exportCSV}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Export CSV
          </button>
        </div>
      </div>

      {loading ? (
        <Spinner />
      ) : (
        <div className="overflow-x-auto shadow rounded-lg border border-gray-200">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="p-4">
                  <input
                    type="checkbox"
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedBlogs(filtered.map(b => b._id));
                      } else {
                        setSelectedBlogs([]);
                      }
                    }}
                    checked={selectedBlogs.length === filtered.length && filtered.length > 0}
                  />
                </th>
                <th className="p-4 text-left">Image</th>
                <th className="p-4 text-left">Title</th>
                <th className="p-4 text-left">Slug</th>
                <th className="p-4 text-left">Actions</th>
                <th className="p-4 text-left">Status</th>
                <th className="p-4 text-left">Created</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length > 0 ? (
                filtered.map((blog) => (
                  <tr key={blog._id} className="border-t hover:bg-gray-50">
                    <td className="p-4">
                      <input
                        type="checkbox"
                        checked={selectedBlogs.includes(blog._id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedBlogs(prev => [...prev, blog._id]);
                          } else {
                            setSelectedBlogs(prev => prev.filter(id => id !== blog._id));
                          }
                        }}
                      />
                    </td>
                    <td className="p-4">
                      {blog.image ? (
                        <img
                          src={blog.image}
                          alt={blog.title}
                          className="w-16 h-16 object-contain rounded"
                        />
                      ) : (
                        <span className="text-gray-400 italic">No image</span>
                      )}
                    </td>
                    <td className="p-4">{blog.title}</td>
                    <td className="p-4">{blog.slug}</td>
                    <td className="p-4">
                      <div className="flex items-center space-x-4">
                        <Link
                          to={`/admin/blogs/edit/${blog._id}`}
                          className="text-blue-600 hover:text-blue-800 transition"
                        >
                          <FaEdit size={18} />
                        </Link>
                        <button
                          onClick={() => handleDelete(blog._id)}
                          className="text-red-600 hover:text-red-800 transition"
                        >
                          <FaTrash size={18} />
                        </button>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        blog.status === 'published'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {blog.status}
                      </span>
                    </td>
                    <td className="p-4">
                      {new Date(blog.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="p-4 text-center text-gray-500">
                    No blogs found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* ConfirmationDialog */}
      <ConfirmationDialog
        open={confirmOpen}
        title={confirmTitle}
        message={confirmMessage}
        onClose={() => setConfirmOpen(false)}
        onConfirm={() => {
          confirmAction?.();
        }}
      />
    </div>
  );
};

export default AllBlogs;
