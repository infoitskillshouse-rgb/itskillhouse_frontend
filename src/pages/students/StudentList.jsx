import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllStudents } from "../../services/studentApi";
import { Copy } from "lucide-react";

export default function AdminStudentList() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        setLoading(true);
        const { data } = await getAllStudents();
        setStudents(data.students || []);
      } catch (err) {
        setError(err?.response?.data?.message || "Failed to fetch students");
      } finally {
        setLoading(false);
      }
    };
    fetchStudents();
  }, []);

  const handleDoubleClick = (studentId) => {
    navigate(`/admin/students/${studentId}`);
  };

  const handleCopy = (student) => {
    const text = `
Student ID: ${student.studentId}
Name: ${student.name}
Father Name: ${student.fatherName}
Mother Name: ${student.motherName || ""}
Course: ${student.courseName || ""}
Duration: ${student.courseDuration || ""}
Marks: ${student.obtainedMarks || ""}/${student.totalMarks || ""}
Percentage: ${student.percentage || ""}
Grade: ${student.grade || ""}
Result: ${student.result || ""}
Admission Date: ${student.dateOfAdmission || ""}
`;

    navigator.clipboard.writeText(text.trim());
    alert("Student details copied to clipboard ✅");
  };

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (error) return <div className="text-center mt-10 text-red-600">{error}</div>;

  return (
    <div className="p-6 min-h-screen bg-gray-100">
      <h2 className="text-3xl font-bold mb-6 text-center">Students List</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-xl shadow overflow-hidden">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-3 text-left">Image</th>
              <th className="p-3 text-left">ID</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Father</th>
              <th className="p-3 text-left">Course</th>
              <th className="p-3 text-center">Copy</th>
            </tr>
          </thead>

          <tbody>
            {students.map((s) => (
              <tr
                key={s.studentId}
                className="border-b hover:bg-gray-50 cursor-pointer"
                onDoubleClick={() => handleDoubleClick(s.studentId)}
              >
                {/* ✅ Image show */}
                <td className="p-3">
                  {s.image ? (
                    <img
                      src={s.image}
                      alt={s.name}
                      className="w-12 h-12 object-cover rounded-full border"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-xs">
                      No Img
                    </div>
                  )}
                </td>

                <td className="p-3">{s.studentId}</td>
                <td className="p-3">{s.name}</td>
                <td className="p-3">{s.fatherName}</td>
                <td className="p-3">{s.courseName}</td>

                <td
                  className="p-3 text-center"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCopy(s);
                  }}
                >
                  <Copy
                    size={18}
                    className="inline cursor-pointer text-gray-600 hover:text-black"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
