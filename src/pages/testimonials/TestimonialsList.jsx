import { useEffect, useState } from "react";
import { getTestimonials, deleteTestimonial } from "../../services/testimonialService";
import { Trash2, Edit } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Backend base URL
const BASE_URL = import.meta.env.VITE_BASE_URL;

export default function TestimonialsList() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch testimonials
  const fetchTestimonials = async () => {
    try {
      const res = await getTestimonials();
      // ✅ Extract array from backend response
      setTestimonials(res.data || []); 
    } catch (error) {
      console.error("Failed to fetch testimonials", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this testimonial?")) return;

    try {
      await deleteTestimonial(id);
      setTestimonials((prev) => prev.filter((item) => item._id !== id));
    } catch (error) {
      console.error("Failed to delete testimonial", error);
    }
  };

  if (loading) return <p className="text-gray-500">Loading testimonials...</p>;

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Testimonials</h2>
        <button
          onClick={() => navigate("/admin/testimonials/add")}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
        >
          + Add Testimonial
        </button>
      </div>

      {testimonials.length === 0 ? (
        <p className="text-gray-500 text-center">No testimonials found.</p>
      ) : (
        <div className="space-y-4">
          {testimonials.map((item) => (
            <div
              key={item._id}
              className="flex items-center justify-between border rounded-lg p-4 hover:bg-gray-50"
            >
              <div className="flex items-center gap-4">
                <img
                  src={
                    item.image?.startsWith("http")
                      ? item.image
                      : BASE_URL + item.image.replace(/\\/g, "/")
                  }
                  alt={item.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-medium text-gray-800">{item.name}</h4>
                  <p className="text-sm text-gray-500 line-clamp-1">{item.message}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => navigate(`/admin/testimonials/edit/${item._id}`)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  <Edit size={18} />
                </button>
                <button
                  onClick={() => handleDelete(item._id)}
                  className="text-red-600 hover:text-red-800"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
