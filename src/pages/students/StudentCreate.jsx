import { useState } from "react";
import { createStudent } from "../../services/studentApi";

const initialState = {
  name: "",
  fatherName: "",
  motherName: "",
  totalMarks: "",
  obtainedMarks: "",
  percentage: "",
  grade: "",
  result: "",
  courseName: "",
  courseDuration: "",
  durationType: "Month",
  image: null,   // FIX
  dateOfAdmission: "",
};

export default function AdminCreate() {
  const [formData, setFormData] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // ------------------ HANDLE CHANGE ------------------
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image") {
      if (!files || !files[0]) return;

      if (!files[0].type.startsWith("image/")) {
        alert("Only image allowed");
        return;
      }
      setFormData((prev) => ({
        ...prev,
        image: files[0],
      }));
      return;
    }

    let updatedData = { ...formData, [name]: value };

    // AUTO CALC PERCENTAGE, GRADE, RESULT
    if (name === "totalMarks" || name === "obtainedMarks") {
      const total = Number(updatedData.totalMarks);
      const obtained = Number(updatedData.obtainedMarks);

      if (total > 0 && obtained >= 0) {
        const percent = ((obtained / total) * 100).toFixed(2);
        updatedData.percentage = percent;

        let grade = "";
        if (percent >= 90) grade = "A+";
        else if (percent >= 80) grade = "A";
        else if (percent >= 70) grade = "B";
        else if (percent >= 60) grade = "C";
        else if (percent >= 50) grade = "D";
        else grade = "F";

        updatedData.grade = grade;
        updatedData.result = percent >= 40 ? "pass" : "fail";
      }
    }

    setFormData(updatedData);
  };

  // ------------------ VALIDATION ------------------
  const validate = () => {
    const requiredFields = [
      "name",
      "fatherName",
      "motherName",
      "totalMarks",
      "obtainedMarks",
      "percentage",
      "grade",
      "result",
      "courseDuration",
      "durationType",
      "courseName",
      "image",
      "dateOfAdmission",
    ];

    for (let field of requiredFields) {
      if (!formData[field]) {
        return `${field} is required`;
      }
    }
    return null;
  };

  // ------------------ HANDLE SUBMIT ------------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    const errorMsg = validate();
    if (errorMsg) {
      setError(errorMsg);
      console.error("Validation error:", errorMsg);
      return;
    }

    try {
      setLoading(true);
      setError("");
      setSuccess("");

      // ------------------ FORM DATA ------------------
      const form = new FormData();
      Object.keys(formData).forEach((key) => {
        if (key === "image") {
          form.append("image", formData.image);
        } else {
          form.append(key, formData[key]);
        }
      });
      for (let pair of form.entries()) {
      }

      // ------------------ SEND TO BACKEND ------------------
      const res = await createStudent(form);

      setSuccess("Student created successfully");
      setFormData(initialState);
    } catch (err) {
      console.error("Error during submission:", err);
      setError(err.response?.data?.message || "Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-3xl bg-white rounded-xl shadow-xl p-8">
        <h2 className="text-3xl font-bold text-center mb-6">
          Admin – Create Student
        </h2>

        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-sm">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-100 text-green-700 p-3 rounded mb-4 text-sm">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit}
  encType="multipart/form-data" className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block mb-1 font-medium">Student Name *</label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              placeholder="Enter student name"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Father Name *</label>
            <input
              name="fatherName"
              value={formData.fatherName}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              placeholder="Enter father name"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Mother Name *</label>
            <input
              name="motherName"
              value={formData.motherName}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              placeholder="Enter mother name"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Total Marks *</label>
            <input
              type="number"
              name="totalMarks"
              value={formData.totalMarks}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              placeholder="Total marks"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Marks Obtained *</label>
            <input
              type="number"
              name="obtainedMarks"
              value={formData.obtainedMarks}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              placeholder="Marks obtained"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Percentage *</label>
            <input
              type="number"
              name="percentage"
              value={formData.percentage}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              placeholder="Percentage"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Grade *</label>
            <input
              name="grade"
              value={formData.grade}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              placeholder="Grade"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Result *</label>
            <input
              name="result"
              value={formData.result}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              placeholder="Pass / Fail"
            />
          </div>
          <div>
  <label className="block mb-1 font-medium">Course Name *</label>

  <select
    name="courseName"
    value={formData.courseName}
    onChange={handleChange}
    className="w-full p-2 border rounded bg-white"
  >
    <option value="">Select Course</option>
<option value="Basic Computer">Basic Computer</option>
<option value="Basic Computer & Typing">Basic Computer & Typing</option>

<option value="Website Development">Website Development</option>
<option value="Website Designing">Website Designing</option>
<option value="Full Stack Development">Full Stack Development</option>

<option value="WordPress">WordPress</option>
<option value="Digital Marketing">Digital Marketing</option>

<option value="Java Training">Java Training</option>
<option value="Python Training">Python Training</option>
<option value="Php">Php</option>

<option value="Tally">Tally</option>
<option value="Tally (GST + Return)">Tally (GST + Return)</option>
<option value="Tally Prime">Tally Prime</option>

<option value="Punjabi Typing">Punjabi Typing</option>
<option value="Hindi Typing">Hindi Typing</option>
<option value="Javascript">Javascript</option>

  </select>
</div>
<div>
  <label className="block mb-1 font-medium">Course Duration *</label>

  <div className="flex gap-2">
    <input
      type="number"
      name="courseDuration"
      value={formData.courseDuration}
      onChange={handleChange}
      className="w-full p-2 border rounded"
      placeholder="Duration"
    />

    <select
      name="durationType"
      value={formData.durationType}
      onChange={handleChange}
      className="p-2 border rounded bg-white"
    >
      <option value="Day">Day</option>
      <option value="Month">Month</option>
      <option value="Year">Year</option>
    </select>
  </div>
</div>

<div>
  <label className="block mb-1 font-medium">Student Image *</label>

  <input
    type="file"
    name="image"
    accept="image/*"
    onChange={handleChange}
    className="w-full p-2 border rounded bg-white"
  />
</div>

          <div>
            <label className="block mb-1 font-medium">Date of Admission *</label>
            <input
              type="date"
              name="dateOfAdmission"
              value={formData.dateOfAdmission}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>

          {/* Submit Button */}
          <div className="md:col-span-2">
          <button
  type="submit"
  disabled={loading}
  className="w-full bg-black text-white py-3 rounded hover:bg-gray-800 transition flex items-center justify-center gap-2"
>
  {loading ? (
    <>
      <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
      Creating...
    </>
  ) : (
    "Create Student"
  )}
</button>
          </div>
        </form>
      </div>
    </div>
  );
}
