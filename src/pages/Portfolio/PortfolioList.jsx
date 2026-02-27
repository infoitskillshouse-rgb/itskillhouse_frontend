import { useEffect, useState } from "react";
import { getPortfolios, deletePortfolio } from "../../services/portfolioService";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../../components/Loader"; // Optional: aapka Loader component

export default function PortfolioList() {
  const [portfolios, setPortfolios] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPortfolios = async () => {
    try {
      const res = await getPortfolios(); // API returns { data: [...] }
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
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h2 className="text-2xl sm:text-3xl font-bold">Portfolio List</h2>
        <Link
          to="/admin/portfolio/add"
          className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          + Add Portfolio
        </Link>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white shadow-md rounded-lg border">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Image</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Title</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Category</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {Array.isArray(portfolios) && portfolios.length > 0 ? (
              portfolios.map((p) => (
                <tr key={p._id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <img
                      src={p.image}
                      alt={p.title}
                      className="w-24 h-16 object-cover rounded-md border"
                    />
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-800">{p.title}</td>
                  <td className="px-4 py-3 text-sm text-gray-800">{p.category}</td>
                  <td className="px-4 py-3 flex gap-3">
                    <Link
                      to={`/admin/portfolio/edit/${p._id}`}
                      className="text-blue-600 hover:underline"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(p._id)}
                      className="text-red-600 hover:underline"
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
    </div>
  );
}