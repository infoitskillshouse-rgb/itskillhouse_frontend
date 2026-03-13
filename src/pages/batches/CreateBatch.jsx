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
      setMessage(
        error?.response?.data?.message || "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-batch-container">
      <h2>Create New Batch</h2>

      {message && <p>{message}</p>}

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          name="courseName"
          placeholder="Course Name"
          value={formData.courseName}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="courseSlug"
          placeholder="Course Slug (example: full-stack-web-dev)"
          value={formData.courseSlug}
          onChange={handleChange}
          required
        />

        <input
          type="date"
          name="startDate"
          value={formData.startDate}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="duration"
          placeholder="Duration (example: 3 Months)"
          value={formData.duration}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="timing"
          placeholder="Timing (example: 6PM - 7PM)"
          value={formData.timing}
          onChange={handleChange}
        />

        <select
          name="mode"
          value={formData.mode}
          onChange={handleChange}
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
        />

        <input
          type="number"
          name="seatsLeft"
          placeholder="Seats Left"
          value={formData.seatsLeft}
          onChange={handleChange}
        />

        <input
          type="number"
          name="fee"
          placeholder="Course Fee"
          value={formData.fee}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="discount"
          placeholder="Discount (%)"
          value={formData.discount}
          onChange={handleChange}
        />

        <button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create Batch"}
        </button>

      </form>
    </div>
  );
};

export default CreateBatch;