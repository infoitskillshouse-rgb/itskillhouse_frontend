import { useEffect, useState } from "react";
import { getAllBatches, deleteBatch } from "../../services/batchService";
import { Link } from "react-router-dom";

const BatchesList = () => {
  const [batches, setBatches] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBatches = async () => {
    try {
      const data = await getAllBatches();
      setBatches(data);
    } catch (error) {
      console.error("Error fetching batches:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBatches();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this batch?");
    if (!confirmDelete) return;

    try {
      await deleteBatch(id);
      setBatches(batches.filter((batch) => batch._id !== id));
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  if (loading) return <p>Loading batches...</p>;

  return (
    <div className="batches-list-container">
      <h2>All Batches</h2>

      <table border="1" cellPadding="10" style={{ width: "100%" }}>
        <thead>
          <tr>
            <th>Course</th>
            <th>Start Date</th>
            <th>Duration</th>
            <th>Seats Left</th>
            <th>Fee</th>
            <th>Discount</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {batches.length === 0 ? (
            <tr>
              <td colSpan="7">No batches found</td>
            </tr>
          ) : (
            batches.map((batch) => (
              <tr key={batch._id}>
                <td>{batch.courseName}</td>
                <td>{new Date(batch.startDate).toLocaleDateString()}</td>
                <td>{batch.duration}</td>
                <td>{batch.seatsLeft}</td>
                <td>₹{batch.fee}</td>
                <td>
                  {batch.discount > 0 ? `${batch.discount}% OFF` : "—"}
                </td>

                <td>
                  <Link to={`/admin/batches/${batch._id}`}>
                    View
                  </Link>

                  {" | "}

                  <Link to={`/admin/batches/edit/${batch._id}`}>
                    Edit
                  </Link>

                  {" | "}

                  <button onClick={() => handleDelete(batch._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default BatchesList;