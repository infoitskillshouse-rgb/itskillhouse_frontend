import { useEffect, useState } from "react";
import { getPortfolios, deletePortfolio } from "../../services/portfolioService";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";

export default function PortfolioList() {
  const [portfolios, setPortfolios] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPortfolios = async () => {
    try {
      const res = await getPortfolios();
      setPortfolios(res.data || []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load portfolios");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPortfolios();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this portfolio?")) return;

    try {
      await deletePortfolio(id);
      toast.success("Portfolio deleted successfully");
      setPortfolios((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      console.error(err);
      toast.error("Delete failed");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
          Portfolio List
        </h2>

        <Link
          to="/admin/portfolio/add"
          className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-5 py-2 rounded-lg shadow hover:scale-105 transition"
        >
          + Add Portfolio
        </Link>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto bg-white shadow-lg rounded-xl border">
        <table className="min-w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-5 py-3 text-left text-sm font-semibold text-gray-700">Image</th>
              <th className="px-5 py-3 text-left text-sm font-semibold text-gray-700">Title</th>
              <th className="px-5 py-3 text-left text-sm font-semibold text-gray-700">Category</th>
              <th className="px-5 py-3 text-left text-sm font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>

          <tbody>
            {portfolios.length > 0 ? (
              portfolios.map((p) => (
                <tr key={p._id} className="border-t hover:bg-gray-50 transition">
                  
                  <td className="px-5 py-3">
                    <img
                      src={p.image}
                      alt={p.title}
                      className="w-28 h-16 object-cover rounded-lg border shadow-sm"
                    />
                  </td>

                  <td className="px-5 py-3 font-medium text-gray-800">
                    {p.title}
                  </td>

                  <td className="px-5 py-3">
                    <span className="px-3 py-1 bg-blue-100 text-blue-600 text-xs rounded-full">
                      {p.category}
                    </span>
                  </td>

                  <td className="px-5 py-3 flex gap-4">
                    <Link
                      to={`/admin/portfolio/edit/${p._id}`}
                      className="text-blue-600 hover:underline font-medium"
                    >
                      Edit
                    </Link>

                    <button
                      onClick={() => handleDelete(p._id)}
                      className="text-red-600 hover:underline font-medium"
                    >
                      Delete
                    </button>
                  </td>

                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="text-center py-6 text-gray-500">
                  No portfolios found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-4">
        {portfolios.length > 0 ? (
          portfolios.map((p) => (
            <div
              key={p._id}
              className="bg-white rounded-xl shadow-md border p-4 flex flex-col gap-3"
            >
              <img
                src={p.image}
                alt={p.title}
                className="w-full h-40 object-cover rounded-lg"
              />

              <div>
                <h3 className="font-semibold text-lg text-gray-800">
                  {p.title}
                </h3>

                <span className="inline-block mt-1 px-3 py-1 bg-blue-100 text-blue-600 text-xs rounded-full">
                  {p.category}
                </span>
              </div>

              <div className="flex justify-between">
                <Link
                  to={`/admin/portfolio/edit/${p._id}`}
                  className="text-blue-600 font-medium"
                >
                  Edit
                </Link>

                <button
                  onClick={() => handleDelete(p._id)}
                  className="text-red-600 font-medium"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No portfolios found</p>
        )}
      </div>
    </div>
  );
}