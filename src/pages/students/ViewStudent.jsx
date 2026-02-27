import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getStudentById, updateStudent, deleteStudent } from "../../services/studentApi";

export default function AdminViewStudent() {
  const { studentId } = useParams();
  const navigate = useNavigate();

  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({});
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        setLoading(true);
        const { data } = await getStudentById(studentId);
        setStudent(data.student);
        setFormData(data.student);
      } catch (err) {
        setError(err?.response?.data?.message || "Failed to fetch student");
      } finally {
        setLoading(false);
      }
    };

    fetchStudent();
  }, [studentId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      setActionLoading(true);
      const { data } = await updateStudent(studentId, formData);
      setStudent(data.student);
      setEditMode(false);
      alert("✅ Student updated successfully");
    } catch (err) {
      alert(err?.response?.data?.message || "Update failed");
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this student?")) return;
    try {
      setActionLoading(true);
      await deleteStudent(studentId);
      alert("✅ Student deleted");
      navigate("/admin/studentlist");
    } catch (err) {
      alert(err?.response?.data?.message || "Delete failed");
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (error) return <div className="text-center mt-10 text-red-600">{error}</div>;
  if (!student) return null;

  return (
    <div className="p-6 min-h-screen bg-gray-100">
      <h2 className="text-3xl font-bold mb-6 text-center">Student Details</h2>

      <div className="bg-white p-6 rounded-xl shadow max-w-3xl mx-auto">
        {/* DP */}
        <div className="flex items-center mb-6 space-x-6">
          <img src={student.image} alt="dp" className="w-24 h-24 rounded-full object-cover"/>
          <div>
            <h3 className="text-xl font-semibold">{student.name}</h3>
            <p className="text-gray-600">ID: {student.studentId}</p>
          </div>
        </div>

        {/* Form / Display */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { label: "Father Name", key: "fatherName" },
            { label: "Mother Name", key: "motherName" },
            { label: "Total Marks", key: "totalMarks" },
            { label: "Obtained Marks", key: "obtainedMarks" },
            { label: "Percentage", key: "percentage" },
            { label: "Grade", key: "grade" },
            { label: "Result", key: "result" },
            { label: "Course Duration (Months)", key: "courseDuration" },
            { label: "Date of Admission", key: "dateOfAdmission", type: "date" },
          ].map(({ label, key, type }) => (
            <div key={key}>
              <label className="block mb-1 font-medium">{label}</label>
              {editMode ? (
                <input
                  type={type || "text"}
                  name={key}
                  value={formData[key] || ""}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                />
              ) : (
                <p className="p-2 border rounded bg-gray-50">{student[key]}</p>
              )}
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex space-x-3">
          {editMode ? (
            <button
              onClick={handleUpdate}
              disabled={actionLoading}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
            >
              {actionLoading ? "Saving..." : "Save Changes"}
            </button>
          ) : (
            <button
              onClick={() => setEditMode(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              Edit
            </button>
          )}

          <button
            onClick={handleDelete}
            disabled={actionLoading}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
          >
            {actionLoading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}
