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

  // Fetch existing batch
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
      setMessage(
        error?.response?.data?.message || "Update failed"
      );
    } finally {
      setUpdating(false);
    }
  };

  if (loading) return <p>Loading batch...</p>;

  return (
    <div className="edit-batch-container">
      <h2>Edit Batch</h2>

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
          placeholder="Course Slug"
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
          placeholder="Duration"
          value={formData.duration}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="timing"
          placeholder="Timing"
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
          placeholder="Fee"
          value={formData.fee}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="discount"
          placeholder="Discount %"
          value={formData.discount}
          onChange={handleChange}
        />

        <button type="submit" disabled={updating}>
          {updating ? "Updating..." : "Update Batch"}
        </button>

      </form>
    </div>
  );
};

export default EditBatch;