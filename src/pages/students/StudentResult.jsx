import React, { useState, useRef, useEffect } from "react";
import { getStudentById } from "../../services/studentApi";
import CoursesSection from "./CoursesSection";
import WhyChooseUs from "./WhyChooseUs";
import CertifiedStudentsSlider from "./CertifiedStudentsSlider";

const StudentResult = () => {
  const [studentId, setStudentId] = useState("");
  const [student, setStudent] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const gridRef = useRef(null);

  const formatDate = (dateStr) => {
    return new Date(dateStr).toISOString().split("T")[0];
  };

  const fetchStudent = async () => {
    if (!studentId.trim()) {
      setError("Please enter Student ID");
      return;
    }

    setLoading(true);
    setError("");
    setStudent(null);

    try {
      const res = await getStudentById(studentId);
      setStudent(res.data.student);
    } catch (err) {
      setError("Student not found! Please check your ID.");
    }

    setLoading(false);
  };

  // Enable smooth scrolling
  useEffect(() => {
    if (gridRef.current) {
      gridRef.current.style.scrollBehavior = "smooth";
    }
  }, [student]);

  return (
    <div>
    <div className="max-w-[1100px] mx-auto mt-6 sm:mt-10 mb-10 sm:mb-16 p-4 sm:p-8 bg-white rounded-2xl sm:rounded-3xl shadow-2xl">
      {/* Header */}
      <h1 className="text-center text-2xl sm:text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-blue-500 to-blue-800 bg-clip-text text-transparent">
        Student Result Portal
      </h1>

      {/* Search */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6">
        <input
          type="text"
          placeholder="Enter Student ID (e.g. 2026-DM-01)"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
          className="flex-1 p-3 rounded-xl border border-gray-300 text-base sm:text-lg outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          onClick={fetchStudent}
          className="w-full sm:w-auto px-6 sm:px-8 py-3 bg-gradient-to-r from-blue-500 to-blue-800 text-white rounded-xl text-base sm:text-lg font-semibold shadow-lg hover:opacity-90 duration-200"
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </div>

      {/* Error */}
      {error && (
        <p className="text-red-600 mt-5 text-center font-medium">{error}</p>
      )}

      {/* Student Details */}
      {student && (
        <div className="mt-8 sm:mt-10 flex flex-col gap-8">
          {/* Profile */}
          <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-center md:items-start p-5 sm:p-6 rounded-2xl md:rounded-3xl bg-gray-100 border border-gray-300 text-center md:text-left">
            <img
              src={student.image}
              alt={student.name}
              className="w-28 h-28 sm:w-36 sm:h-36 md:w-40 md:h-40 object-cover rounded-full border-4 border-indigo-600 shadow-xl"
            />
            <div className="flex-1">
              <h2 className="text-xl sm:text-2xl font-bold mb-1">{student.name}</h2>
              <div className="mb-2">
                <span className="px-3 py-1 text-sm sm:text-base font-semibold rounded-full bg-indigo-100 text-indigo-700">
                  {student.courseName}
                </span>
              </div>
              <div className="mb-2">
                <span className="px-3 py-1 text-sm font-medium rounded-lg bg-gray-200 text-gray-800">
                  ID: {student.studentId}
                </span>
              </div>
              <div>
                <span className="px-3 py-1 text-sm font-medium rounded-lg bg-blue-100 text-blue-700">
                  Admission: {formatDate(student.dateOfAdmission)}
                </span>
              </div>
            </div>
          </div>

          {/* Student Details Grid */}
          <div className="flex flex-col gap-4">
            <h3 className="text-xl sm:text-2xl font-semibold text-center md:text-left mb-4">
              Student Details
            </h3>

            <div
              ref={gridRef}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-2 max-h-[calc(100vh-350px)] overflow-y-auto pr-2 scroll-smooth"
            >
              {[
                ["Father Name", student.fatherName],
                ["Mother Name", student.motherName],
                ["Course Duration", `${student.courseDuration} ${student.durationType}`],
                ["Total Marks", student.totalMarks],
                ["Obtained Marks", student.obtainedMarks],
                ["Percentage", student.percentage + "%"],
                ["Grade", student.grade],
                ["Result", student.result],
                ["Date of Admission", formatDate(student.dateOfAdmission)],
              ].map(([label, value], i) => (
                <div
                  key={i}
                  className="bg-white rounded-xl p-4 sm:p-5 border border-gray-200 shadow-sm text-center md:text-left min-h-[80px] break-words"
                >
                  <p className="text-sm sm:text-base font-semibold text-primary tracking-wide uppercase">
                    {label}
                  </p>
                  <h4 className="text-base sm:text-lg text-yellow-500 font-semibold break-words">
                    {value}
                  </h4>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      
    </div>
    <CoursesSection />
    <WhyChooseUs />
    <CertifiedStudentsSlider />
    </div>
    
  );
};

export default StudentResult;