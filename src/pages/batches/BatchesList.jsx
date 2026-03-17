import { useEffect, useState } from "react";
import { getAllBatches, deleteBatch } from "../../services/batchService";
import { Link } from "react-router-dom";
import { FaEdit, FaTrash, FaEye } from "react-icons/fa";

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

  if (loading)
    return (
      <p className="text-center py-10 text-gray-500">
        Loading batches...
      </p>
    );

  return (
    <div className="p-6 bg-gray-100 min-h-screen">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">All Batches</h2>

        <Link
          to="/admin/batches/create"
          className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800"
        >
          + Add Batch
        </Link>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full text-sm text-left">

          <thead className="bg-gray-200 text-gray-700">
            <tr>
              <th className="p-3">Course</th>
              <th className="p-3">Start</th>
              <th className="p-3">Duration</th>
              <th className="p-3">Seats</th>
              <th className="p-3">Fee</th>
              <th className="p-3">Discount</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {batches.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center p-6 text-gray-500">
                  No batches found
                </td>
              </tr>
            ) : (
              batches.map((batch) => (
                <tr
                  key={batch._id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="p-3 font-medium">
                    {batch.courseName}
                  </td>

                  <td className="p-3">
                    {new Date(batch.startDate).toLocaleDateString()}
                  </td>

                  <td className="p-3">{batch.duration}</td>

                  <td className="p-3">
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${
                      batch.seatsLeft < 5
                        ? "bg-red-100 text-red-600"
                        : "bg-green-100 text-green-600"
                    }`}>
                      {batch.seatsLeft} left
                    </span>
                  </td>

                  <td className="p-3 font-semibold">
                    ₹{batch.fee}
                  </td>

                  <td className="p-3">
                    {batch.discount > 0 ? (
                      <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">
                        {batch.discount}% OFF
                      </span>
                    ) : (
                      "—"
                    )}
                  </td>

                  <td className="p-3 flex justify-center gap-3">

                    {/* View */}
                    <Link
                      to={`/admin/batches/${batch._id}`}
                      className="text-blue-500 hover:text-blue-700"
                      title="View"
                    >
                      <FaEye />
                    </Link>

                    {/* Edit */}
                    <Link
                      to={`/admin/batches/edit/${batch._id}`}
                      className="text-yellow-500 hover:text-yellow-600"
                      title="Edit"
                    >
                      <FaEdit />
                    </Link>

                    {/* Delete */}
                    <button
                      onClick={() => handleDelete(batch._id)}
                      className="text-red-500 hover:text-red-700"
                      title="Delete"
                    >
                      <FaTrash />
                    </button>

                  </td>
                </tr>
              ))
            )}
          </tbody>

        </table>
      </div>
    </div>
  );
};

export default BatchesList;