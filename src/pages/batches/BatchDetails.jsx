import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getBatchById } from "../../services/batchService";

const BatchDetails = () => {
  const { id } = useParams();
  const [batch, setBatch] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchBatch = async () => {
    try {
      const data = await getBatchById(id);
      setBatch(data);
    } catch (error) {
      console.error("Error fetching batch:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBatch();
  }, [id]);

  if (loading) return <p>Loading batch details...</p>;
  if (!batch) return <p>Batch not found</p>;

  return (
    <div className="batch-details-container">
      <h2>Batch Details</h2>

      <div className="batch-details-card">

        <p><strong>Course Name:</strong> {batch.courseName}</p>

        <p><strong>Course Slug:</strong> {batch.courseSlug}</p>

        <p>
          <strong>Start Date:</strong>{" "}
          {new Date(batch.startDate).toLocaleDateString()}
        </p>

        <p><strong>Duration:</strong> {batch.duration}</p>

        <p><strong>Timing:</strong> {batch.timing || "Not specified"}</p>

        <p><strong>Mode:</strong> {batch.mode}</p>

        <p><strong>Total Seats:</strong> {batch.seatsTotal}</p>

        <p><strong>Seats Left:</strong> {batch.seatsLeft}</p>

        <p><strong>Fee:</strong> ₹{batch.fee}</p>

        <p>
          <strong>Discount:</strong>{" "}
          {batch.discount > 0 ? `${batch.discount}% OFF` : "No discount"}
        </p>

        <p>
          <strong>Certificate:</strong>{" "}
          {batch.certificate ? "Available" : "Not Available"}
        </p>

        <p>
          <strong>Status:</strong>{" "}
          {batch.isActive ? "Active" : "Inactive"}
        </p>

      </div>
    </div>
  );
};

export default BatchDetails;