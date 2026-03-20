// src/services/blogApi.js
import axiosInstance from "../../utils/axiosInstance";

// GET all blogs
export const getAllBlogs = () => axiosInstance.get("/blogs");

// GET single blog by slug
export const getBlogBySlug = (slug) =>
  axiosInstance.get(`/blogs/${slug}`);

// CREATE blog
export const createBlog = (data) =>
  axiosInstance.post("/blogs/create", data);

// UPDATE blog
export const updateBlog = (id, data) =>
  axiosInstance.put(`/blogs/${id}`, data);

// DELETE blog
export const deleteBlog = async (blogId) => {
  try {
    const res = await axiosInstance.delete(`/blogs/${blogId}`);
    return res.data; // better return instead of alert
  } catch (err) {
    console.error(err);
    throw err; // error ko upar handle karne do
  }
};