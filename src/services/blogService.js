  // src/services/blogApi.js
  import api from "./api";
  import axiosInstance from "../../utils/axiosInstance";

  export const getAllBlogs = () => api.get("/blogs");
  export const getBlogBySlug = (slug) => api.get(`/api/blogs/${slug}`);
  export const createBlog = (data) => api.post("/api/blogs", data);
  export const updateBlog = (id, data) => api.put(`/api/blogs/${id}`, data);
  export const deleteBlog = async (blogId, imagePath) => {
    try {
      const res = await axiosInstance.delete(`/blogs/${blogId}`);
      alert("Deleted successfully!");
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };

