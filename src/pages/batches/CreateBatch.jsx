import { useState } from "react";
import { createBatch } from "../../services/batchService";

const CreateBatch = () => {
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

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setMessage("");

      await createBatch(formData);

      setMessage("Batch created successfully ✅");

      setFormData({
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

    } catch (error) {
      setMessage(error?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">

      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Create New Batch
      </h2>

      {message && (
        <div className="mb-4 p-3 rounded bg-green-100 text-green-700">
          {message}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-xl p-6 grid grid-cols-1 md:grid-cols-2 gap-4"
      >

        <input
          type="text"
          name="courseName"
          placeholder="Course Name"
          value={formData.courseName}
          onChange={handleChange}
          required
          className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <input
          type="text"
          name="courseSlug"
          placeholder="Course Slug (example: full-stack-web-dev)"
          value={formData.courseSlug}
          onChange={handleChange}
          required
          className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <input
          type="date"
          name="startDate"
          value={formData.startDate}
          onChange={handleChange}
          required
          className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <input
          type="text"
          name="duration"
          placeholder="Duration (example: 3 Months)"
          value={formData.duration}
          onChange={handleChange}
          required
          className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <input
          type="text"
          name="timing"
          placeholder="Timing (example: 6PM - 7PM)"
          value={formData.timing}
          onChange={handleChange}
          className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <select
          name="mode"
          value={formData.mode}
          onChange={handleChange}
          className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
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
          className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <input
          type="number"
          name="seatsLeft"
          placeholder="Seats Left"
          value={formData.seatsLeft}
          onChange={handleChange}
          className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <input
          type="number"
          name="fee"
          placeholder="Course Fee"
          value={formData.fee}
          onChange={handleChange}
          required
          className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <input
          type="number"
          name="discount"
          placeholder="Discount (%)"
          value={formData.discount}
          onChange={handleChange}
          className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <button
          type="submit"
          disabled={loading}
          className="md:col-span-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition"
        >
          {loading ? "Creating..." : "Create Batch"}
        </button>

      </form>
    </div>
  );
};

export default CreateBatch;