import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPortfolio } from "../../services/portfolioService";

export default function AddPortfolio() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    image:"",
  });

  const [image, setImage] = useState(null); // 👈 file store
  const [preview, setPreview] = useState(""); // 👈 preview

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle file change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImage(file);

    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.title || !formData.category || !image) {
      return setError("All fields are required");
    }

    try {
      setLoading(true);

      const data = new FormData();
      data.append("title", formData.title);
      data.append("category", formData.category);
      data.append("image", image); // 👈 file send

      await createPortfolio(data);

      navigate("/admin/portfolio"); // redirect to list
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">
        Add New Portfolio
      </h2>

      {error && (
        <div className="mb-4 text-red-600 bg-red-100 px-4 py-2 rounded">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Title */}
        <div>
          <label className="block mb-1 font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Project Title"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block mb-1 font-medium text-gray-700">
            Category
          </label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="Web / App / Design"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Image File */}
        <div>
          <label className="block mb-1 font-medium text-gray-700">
            Upload Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
          />
        </div>

        {/* Preview */}
        {preview && (
          <img
            src={preview}
            alt="Preview"
            className="w-full h-48 object-cover rounded-lg border"
          />
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
        >
          {loading ? "Adding..." : "Add Portfolio"}
        </button>
      </form>
    </div>
  );
}