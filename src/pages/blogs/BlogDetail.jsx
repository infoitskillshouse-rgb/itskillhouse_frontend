// src/pages/blog/BlogDetail.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import axios from "../../../utils/axiosInstance";
import Spinner from "../../components/Spinner";
import TagBadges from "../../components/TagBadges";
import { Calendar, Clock } from "lucide-react";
import { getAllBlogs } from "../../services/blogService";

const BlogDetail = () => {
  const { slug } = useParams();

  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

const fetchBlog = async () => {
  try {
    const res = await getAllBlogs(); // 👈 sab blogs le aaye
    const blogs = res.data.blogs;

    // 🔥 slug match karo
    const foundBlog = blogs.find((b) => b.slug === slug);

    setBlog(foundBlog);
  } catch (error) {
    console.log(error);
  } finally {
    setLoading(false);
  }
};
  useEffect(() => {
    fetchBlog();
  }, [slug]);

  if (loading) return <Spinner />;
  if (!blog) return <div className="text-center py-20">Blog Not Found</div>;

return (
  <div className="bg-gray-50 min-h-screen">

    <Helmet>
      <title>{blog.title}</title>
      <meta name="description" content={blog.excerpt || blog.title} />
    </Helmet>

    {/* 🔥 HERO SECTION */}
    <div className="relative h-[70vh] w-full overflow-hidden">

      {/* Background Image */}
      <img
        src={blog.image}
        className="w-full h-full object-cover scale-105 hover:scale-110 transition duration-700"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />

      {/* Content */}
      <div className="absolute bottom-0 w-full pb-16">
        <div className="max-w-5xl mx-auto px-6 text-white">

          {/* Tags */}
          <div className="mb-4">
            <TagBadges tags={blog.tags} />
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
            {blog.title}
          </h1>

          {/* Meta Info */}
          <div className="flex flex-wrap gap-6 text-sm opacity-80">

            <div className="flex items-center gap-2">
              <Calendar size={18} />
              {new Date(blog.createdAt).toDateString()}
            </div>

            <div className="flex items-center gap-2">
              <Clock size={18} />
              5 min read
            </div>

          </div>

        </div>
      </div>
    </div>

    {/* 🔥 ARTICLE SECTION */}
    <div className="max-w-4xl mx-auto px-6 py-16">

      {/* Glass Card */}
      <div className="bg-white/80 backdrop-blur-lg shadow-xl rounded-3xl p-8 md:p-12">

<div
  className="
  prose 
  prose-lg 
  max-w-none

  prose-headings:font-bold
  prose-headings:text-gray-900

  prose-h1:text-4xl
  prose-h2:text-3xl
  prose-h3:text-2xl

  prose-p:text-gray-700
  prose-p:leading-8
  prose-p:mb-6

  prose-a:text-blue-600
  prose-a:font-medium
  hover:prose-a:underline

  prose-img:rounded-2xl
  prose-img:shadow-lg
  prose-img:my-8

  prose-blockquote:border-l-4
  prose-blockquote:border-blue-500
  prose-blockquote:pl-4
  prose-blockquote:italic
  prose-blockquote:text-gray-600

  prose-ul:list-disc
  prose-ul:pl-6

  prose-code:bg-gray-100
  prose-code:px-1
  prose-code:py-0.5
  prose-code:rounded
  "
  dangerouslySetInnerHTML={{
    __html: blog.content,
  }}
/>

      </div>

    </div>

  </div>
);
};

export default BlogDetail;