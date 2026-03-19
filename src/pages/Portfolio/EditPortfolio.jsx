import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPortfolioById, updatePortfolio } from "../../services/portfolioService";
import { toast } from "react-toastify";

export default function EditPortfolio() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    category: "",
  });

  const [image, setImage] = useState(null); // 👈 new file
  const [preview, setPreview] = useState(""); // 👈 preview (new/old)

  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const res = await getPortfolioById(id);
        const portfolio = res.data || {};

        setFormData({
          title: portfolio.title || "",
          category: portfolio.category || "",
        });

        // 👇 old image preview
        setPreview(portfolio.image || "");

      } catch (err) {
        console.error(err);
        toast.error("Failed to load portfolio");
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolio();
  }, [id]);

  // text change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // file change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImage(file);

    if (file) {
      setPreview(URL.createObjectURL(file)); // 👈 new preview
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true);

    try {
      const data = new FormData();
      data.append("title", formData.title);
      data.append("category", formData.category);

      // 👇 only if new image selected
      if (image) {
        data.append("image", image);
      }

      await updatePortfolio(id, data);

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
        {/* Title */}
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

        {/* File Upload */}
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="w-full border p-3 rounded"
          disabled={updating}
        />

        {/* Preview */}
        {preview && (
          <img
            src={preview}
            alt="Preview"
            className="w-full h-48 object-cover rounded border"
          />
        )}

        {/* Category */}
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

        {/* Submit */}
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