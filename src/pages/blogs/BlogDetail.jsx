// src/pages/blog/BlogDetail.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import axios from "../../../utils/axiosInstance";
import Spinner from "../../components/Spinner";
import TagBadges from "../../components/TagBadges";
import { Calendar, Clock } from "lucide-react";

const BlogDetail = () => {
  const { slug } = useParams();

  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchBlog = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/blogs/${slug}`
      );
      setBlog(res.data);
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
    <div className="bg-white">

      <Helmet>
        <title>{blog.title}</title>
        <meta name="description" content={blog.excerpt || blog.title} />
      </Helmet>

      {/* HERO SECTION */}

      <div className="relative">

        <img
          src={`${import.meta.env.VITE_IMAGE_BASE_URL}/blogs/${blog.image}`}
          className="w-full h-[420px] object-cover"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50" />

        {/* Title */}
        <div className="absolute bottom-10 left-0 right-0">

          <div className="max-w-4xl mx-auto px-4 text-white">

            <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-4">
              {blog.title}
            </h1>

            <div className="flex gap-6 text-sm opacity-90">

              <div className="flex items-center gap-2">
                <Calendar size={16} />
                {new Date(blog.createdAt).toDateString()}
              </div>

              <div className="flex items-center gap-2">
                <Clock size={16} />
                5 min read
              </div>

            </div>

          </div>

        </div>

      </div>

      {/* ARTICLE */}

      <div className="max-w-3xl mx-auto px-4 py-14">

        {/* Tags */}

        <div className="mb-8">
          <TagBadges tags={blog.tags} />
        </div>


        {/* CONTENT */}

        <div
          className="
          prose
          prose-lg
          max-w-none
          prose-img:rounded-xl
          prose-h1:text-3xl
          prose-h2:text-2xl
          prose-h3:text-xl
          prose-p:text-gray-700
          prose-p:leading-8
          prose-a:text-blue-600
          "
          dangerouslySetInnerHTML={{
            __html: blog.content,
          }}
        />

      </div>

    </div>
  );
};

export default BlogDetail;