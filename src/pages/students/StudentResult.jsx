import React, { useState, useRef, useEffect } from "react";
import { getStudentById } from "../../services/studentApi";
import CoursesSection from "./CoursesSection";
import WhyChooseUs from "./WhyChooseUs";
import CertifiedStudentsSlider from "./CertifiedStudentsSlider";
import UpcomingBatches from "../batches/UpcomingBatches";
import { FaUserGraduate } from "react-icons/fa";

const StudentResult = () => {
  const [studentId, setStudentId] = useState("");
  const [student, setStudent] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const gridRef = useRef(null);

  const formatDate = (dateStr) => {
    return new Date(dateStr).toISOString().split("T")[0];
  };

  // ✅ SCROLL LOCK (FIXED)
  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
    } else {
      document.body.style.overflow = "auto";
      document.body.style.position = "static";
    }

    return () => {
      document.body.style.overflow = "auto";
      document.body.style.position = "static";
    };
  }, [showModal]);

  const fetchStudent = async () => {
    if (!studentId.trim()) {
      setError("Please enter Student ID");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await getStudentById(studentId);
      setStudent(res.data.student);
      setShowModal(true);
    } catch (err) {
      setError("Student not found! Please check your ID.");
    }

    setLoading(false);
  };

  // smooth scroll
  useEffect(() => {
    if (gridRef.current) {
      gridRef.current.style.scrollBehavior = "smooth";
    }
  }, [student]);

  return (
    <>
      {/* 🔹 Other Sections */}
      <CoursesSection />
      <WhyChooseUs />
      <UpcomingBatches />
      <CertifiedStudentsSlider />

      {/* 🔹 Main Section */}
      <div className="mx-auto sm:p-10 bg-gradient-to-br from-[#eaf4ff] via-[#f5f9ff] to-[#eaf4ff]">

        {/* Header */}
        <h1 className="flex items-center justify-center gap-3 pt-[40px] text-3xl sm:text-4xl font-bold mb-10 text-[#155DFC] text-center">
          <FaUserGraduate className="text-[#155DFC] text-4xl" />
          <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Student Result Portal
          </span>
        </h1>

        {/* Search Card */}
        <div className="w-[95%] sm:w-[85%] md:w-[70%] mx-auto backdrop-blur-lg bg-white/70 border border-blue-100 rounded-3xl p-4 sm:p-5 shadow-lg">

          <div className="flex flex-col sm:flex-row gap-3 items-center">

            <input
              type="text"
              placeholder="Enter Student ID (e.g. 2026-DM-01)"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              className="flex-1 w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
            />

            <button
              onClick={fetchStudent}
              className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl font-semibold active:scale-95 transition"
            >
              {loading ? "Searching..." : "Search"}
            </button>

          </div>

          <p className="text-xs text-gray-500 mt-3 text-center sm:text-left">
            👉 Enter your unique Student ID to view your result instantly
          </p>

        </div>

        {/* Error */}
        {error && (
          <p className="text-red-500 mt-6 text-center font-medium animate-pulse">
            {error}
          </p>
        )}
      </div>

      {/* 🔥 MODAL */}
      {showModal && student && (
        <div
          className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4"
          onClick={() => setShowModal(false)} // ✅ click outside close
        >

          <div
            className="bg-white w-full max-w-2xl rounded-2xl shadow-xl p-6 relative"
            onClick={(e) => e.stopPropagation()} // ❗ prevent close
          >

            {/* Close */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-4 text-gray-500 hover:text-red-500 text-xl"
            >
              ✕
            </button>

            {/* Profile */}
            <div className="flex flex-col sm:flex-row gap-5 items-center sm:items-start">

              <img
                src={student.image}
                alt={student.name}
                className="w-28 h-28 object-cover rounded-full border-4 border-blue-500"
              />

              <div>
                <h2 className="text-xl font-bold text-gray-800">
                  {student.name}
                </h2>

                <p className="text-sm text-gray-500">
                  ID: {student.studentId}
                </p>

                <span className="inline-block mt-2 px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm">
                  {student.courseName}
                </span>
              </div>
            </div>

            {/* Details */}
            <div className="grid grid-cols-2 gap-4 mt-6">

              <div className="bg-blue-50 p-3 rounded-lg">
                <p className="text-xs text-gray-500">Father</p>
                <p className="font-semibold text-gray-700">{student.fatherName}</p>
              </div>

              <div className="bg-blue-50 p-3 rounded-lg">
                <p className="text-xs text-gray-500">Mother</p>
                <p className="font-semibold text-gray-700">{student.motherName}</p>
              </div>

              <div className="bg-blue-50 p-3 rounded-lg">
                <p className="text-xs text-gray-500">Marks</p>
                <p className="font-semibold text-gray-700">
                  {student.obtainedMarks}/{student.totalMarks}
                </p>
              </div>

              <div className="bg-blue-50 p-3 rounded-lg">
                <p className="text-xs text-gray-500">Percentage</p>
                <p className="font-semibold text-blue-600">
                  {student.percentage}%
                </p>
              </div>

              <div className="bg-blue-50 p-3 rounded-lg col-span-2">
                <p className="text-xs text-gray-500">Result</p>
                <p
                  className={`font-semibold ${
                    student.result === "pass"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {student.result}
                </p>
              </div>

              <div className="bg-blue-50 p-3 rounded-lg col-span-2">
                <p className="text-xs text-gray-500">Admission Date</p>
                <p className="font-semibold text-gray-700">
                  {formatDate(student.dateOfAdmission)}
                </p>
              </div>

            </div>

          </div>
        </div>
      )}
    </>
  );
};

export default StudentResult;