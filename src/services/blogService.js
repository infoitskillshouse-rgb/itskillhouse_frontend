import axiosInstance from "../../utils/axiosInstance";

// 📥 GET all blogs
export const getAllBlogs = () => axiosInstance.get("/blogs");

// 📄 GET blog by slug
export const getBlogBySlug = (slug) =>
  axiosInstance.get(`/blogs/${slug}`);

// 📄 GET blog by ID
export const getBlogById = (id) =>
  axiosInstance.get(`/blogs/id/${id}`); 

// ➕ CREATE blog (with image)
export const createBlog = (formData) => {
  return axiosInstance.post("/blogs/create", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// ✏️ UPDATE blog (with image support)
export const updateBlog = (id, formData) => {
  return axiosInstance.put(`/blogs/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// ❌ DELETE blog
export const deleteBlog = (id) =>
  axiosInstance.delete(`/blogs/${id}`);