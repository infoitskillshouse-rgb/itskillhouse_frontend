import React, { useState, useRef, useEffect } from "react";
import { getStudentById } from "../../services/studentApi";
import CoursesSection from "./CoursesSection";
import WhyChooseUs from "./WhyChooseUs";
import CertifiedStudentsSlider from "./CertifiedStudentsSlider";
import UpcomingBatches from "../batches/UpcomingBatches";

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
    <div className="">
<div className="mx-auto   sm:p-10  bg-black text-white">

  {/* Header */}
  <h1 className="text-center text-3xl sm:text-4xl font-semibold mb-8 bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">
    Student Result Portal
  </h1>

  {/* Search */}
  <div className="flex flex-col sm:flex-row gap-4 mb-8 backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-3">
    <input
      type="text"
      placeholder="Enter Student ID (e.g. 2026-DM-01)"
      value={studentId}
      onChange={(e) => setStudentId(e.target.value)}
      className="flex-1 p-3 rounded-xl bg-transparent text-white placeholder-gray-400 outline-none"
    />

    <button
      onClick={fetchStudent}
      className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl font-semibold shadow-lg hover:scale-105 transition"
    >
      {loading ? "Searching..." : "Search"}
    </button>
  </div>

  {/* Error */}
  {error && (
    <p className="text-red-400 mt-5 text-center font-medium">{error}</p>
  )}

  {/* Student Details */}
  {student && (
    <div className="mt-10 flex flex-col gap-8">

      {/* Profile */}
      <div className="flex flex-col md:flex-row gap-8 items-center md:items-start p-6 rounded-3xl backdrop-blur-md bg-white/5 border border-white/10 text-center md:text-left">

        <img
          src={student.image}
          alt={student.name}
          className="w-32 h-32 md:w-40 md:h-40 object-cover rounded-full border-4 border-blue-500 shadow-xl"
        />

        <div className="flex-1">
          <h2 className="text-2xl font-bold mb-2">{student.name}</h2>

          <div className="mb-3">
            <span className="px-4 py-1 text-sm font-semibold rounded-full bg-blue-500/20 text-blue-300">
              {student.courseName}
            </span>
          </div>

          <div className="mb-2">
            <span className="px-3 py-1 text-sm rounded-lg bg-white/10 text-gray-300">
              ID: {student.studentId}
            </span>
          </div>

          <div>
            <span className="px-3 py-1 text-sm rounded-lg bg-indigo-500/20 text-indigo-300">
              Admission: {formatDate(student.dateOfAdmission)}
            </span>
          </div>
        </div>
      </div>

      {/* Student Details Grid */}
      <div className="flex flex-col gap-4">

        <h3 className="text-2xl font-semibold text-white text-center md:text-left mb-4">
          Student Details
        </h3>

        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-2 max-h-[calc(100vh-350px)] overflow-y-auto pr-2"
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
              className="bg-white/5 border border-white/10 rounded-2xl p-5 shadow-lg hover:bg-white/10 transition text-center md:text-left"
            >
              <p className="text-sm uppercase tracking-wide text-gray-400 font-semibold">
                {label}
              </p>

              <h4 className="text-lg font-semibold text-yellow-400 mt-1">
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
    <UpcomingBatches/>
    </div>
    
  );
};

export default StudentResult;