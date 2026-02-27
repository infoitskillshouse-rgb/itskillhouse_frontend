import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPortfolioById, updatePortfolio } from "../../services/portfolioService";
import { toast } from "react-toastify";

export default function EditPortfolio() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    image: "",
    category: "",
  });
  const [loading, setLoading] = useState(true); // Loading while fetching data
  const [updating, setUpdating] = useState(false); // Loading while updating

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const res = await getPortfolioById(id); 
        // Assuming API response structure: { data: { portfolio } }
        const portfolio = res.data || {}; 
        setFormData({
          title: portfolio.title || "",
          image: portfolio.image || "",
          category: portfolio.category || "",
          description: portfolio.description || "",
        });
      } catch (err) {
        console.error(err);
        toast.error("Failed to load portfolio");
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolio();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true);
    try {
      await updatePortfolio(id, formData);
      toast.success("Portfolio updated successfully");
      navigate("/admin/portfolio");
    } catch (err) {
      console.error(err);
      toast.error("Update failed. Please try again.");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-10 text-gray-500">
        Loading portfolio details...
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Edit Portfolio</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          className="w-full border p-3 rounded"
          required
          disabled={updating}
        />

        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={formData.image}
          onChange={handleChange}
          className="w-full border p-3 rounded"
          required
          disabled={updating}
        />

        <input
          type="text"
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
          className="w-full border p-3 rounded"
          required
          disabled={updating}
        />

        <button
          type="submit"
          className={`bg-blue-600 text-white px-6 py-2 rounded ${
            updating ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={updating}
        >
          {updating ? "Updating..." : "Update Portfolio"}
        </button>
      </form>
    </div>
  );
}