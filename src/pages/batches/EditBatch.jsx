import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getBatchById, updateBatch } from "../../services/batchService";

const EditBatch = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    courseName: "",
    courseSlug: "",
    startDate: "",
    duration: "",
    timing: "",
    mode: "Offline",
    seatsTotal: 30,
    seatsLeft: "",
    fee: "",
    discount: 0
  });

  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [message, setMessage] = useState("");

  const fetchBatch = async () => {
    try {
      const data = await getBatchById(id);

      setFormData({
        courseName: data.courseName || "",
        courseSlug: data.courseSlug || "",
        startDate: data.startDate?.split("T")[0] || "",
        duration: data.duration || "",
        timing: data.timing || "",
        mode: data.mode || "Offline",
        seatsTotal: data.seatsTotal || 30,
        seatsLeft: data.seatsLeft || "",
        fee: data.fee || "",
        discount: data.discount || 0
      });
    } catch (error) {
      console.error("Error fetching batch:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBatch();
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setUpdating(true);
      setMessage("");

      await updateBatch(id, formData);

      setMessage("Batch updated successfully ✅");

      setTimeout(() => {
        navigate("/admin/batches");
      }, 1500);
    } catch (error) {
      setMessage(error?.response?.data?.message || "Update failed");
    } finally {
      setUpdating(false);
    }
  };

  if (loading)
    return (
      <p className="text-center py-10 text-gray-500">
        Loading batch...
      </p>
    );

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-8">

        {/* Heading */}
        <h2 className="text-2xl font-bold mb-6 text-center">
          Edit Batch ✏️
        </h2>

        {/* Message */}
        {message && (
          <p className="mb-4 text-center text-green-600 font-medium">
            {message}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Grid */}
          <div className="grid md:grid-cols-2 gap-5">

            <input
              type="text"
              name="courseName"
              placeholder="Course Name"
              value={formData.courseName}
              onChange={handleChange}
              className="input"
              required
            />

            <input
              type="text"
              name="courseSlug"
              placeholder="Course Slug"
              value={formData.courseSlug}
              onChange={handleChange}
              className="input"
              required
            />

            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              className="input"
              required
            />

            <input
              type="text"
              name="duration"
              placeholder="Duration"
              value={formData.duration}
              onChange={handleChange}
              className="input"
              required
            />

            <input
              type="text"
              name="timing"
              placeholder="Timing"
              value={formData.timing}
              onChange={handleChange}
              className="input"
            />

            <select
              name="mode"
              value={formData.mode}
              onChange={handleChange}
              className="input"
            >
              <option value="Offline">Offline</option>
              <option value="Online">Online</option>
              <option value="Hybrid">Hybrid</option>
            </select>

            <input
              type="number"
              name="seatsTotal"
              placeholder="Total Seats"
              value={formData.seatsTotal}
              onChange={handleChange}
              className="input"
            />

            <input
              type="number"
              name="seatsLeft"
              placeholder="Seats Left"
              value={formData.seatsLeft}
              onChange={handleChange}
              className="input"
            />

            <input
              type="number"
              name="fee"
              placeholder="Fee"
              value={formData.fee}
              onChange={handleChange}
              className="input"
              required
            />

            <input
              type="number"
              name="discount"
              placeholder="Discount %"
              value={formData.discount}
              onChange={handleChange}
              className="input"
            />

          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={updating}
            className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 rounded-lg font-semibold hover:opacity-90 transition"
          >
            {updating ? "Updating..." : "Update Batch"}
          </button>

        </form>
      </div>

      {/* Reusable Input Style */}
      <style>
        {`
          .input {
            width: 100%;
            padding: 10px;
            border-radius: 8px;
            border: 1px solid #ddd;
            outline: none;
            transition: 0.2s;
          }

          .input:focus {
            border-color: #6366f1;
            box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.2);
          }
        `}
      </style>

    </div>
  );
};

export default EditBatch;