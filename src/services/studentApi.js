import axiosInstance from "../../utils/axiosStu";

/* ============================
   ✅ 1. CREATE STUDENT (ADMIN)
============================= */
export const createStudent = async (formData) => {

  return await axiosInstance.post("/students/create", formData);

};


/* ============================
   ✅ 2. GET ALL STUDENTS (ADMIN)
============================= */
export const getAllStudents = async () => {
  return await axiosInstance.get("/students");
};

/* ============================
   ✅ 3. GET SINGLE STUDENT (ADMIN / STUDENT)
============================= */
export const getStudentById = async (uniqueId) => {
  return await axiosInstance.get(`/students/${uniqueId}`);
};

/* ============================
   ✅ 4. UPDATE STUDENT (ADMIN)
============================= */
export const updateStudent = async (uniqueId, data) => {
  return await axiosInstance.put(`/students/${uniqueId}`, data);
};

/* ============================
   ✅ 5. DELETE STUDENT (ADMIN)
============================= */
export const deleteStudent = async (uniqueId) => {
  return await axiosInstance.delete(`/students/${uniqueId}`);
};

