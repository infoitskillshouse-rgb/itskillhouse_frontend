import axiosInstance from "../../utils/axiosTestimonials";

/* =====================
   GET (Public)
===================== */
export const getTestimonials = async () => {
  const res = await axiosInstance.get("/testimonials");
  return res.data; // { success, data }
};

/* =====================
   CREATE (Admin)
===================== */
export const createTestimonial = async ({ name, message, rating, image }) => {
  const formData = new FormData();
  formData.append("name", name);
  formData.append("message", message);
  formData.append("rating", rating);
  formData.append("image", image);

  const res = await axiosInstance.post("/testimonials/create", formData);
  return res.data;
};

/* =====================
   UPDATE (Admin)
===================== */
export const updateTestimonial = async (id, data) => {
  const formData = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      formData.append(key, value);
    }
  });

  const res = await axiosInstance.put(`/testimonials/${id}`, formData);
  return res.data;
};

/* =====================
   DELETE (Admin)
===================== */
export const deleteTestimonial = async (id) => {
  const res = await axiosInstance.delete(`/testimonials/${id}`);
  return res.data;
};
