// src/pages/blogs/AddBlog.jsx
import { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import axios from '../../api/axiosInstance';
import { toast } from 'react-toastify';
import { getToken } from '../../../utils/auth';
import Editor from '../../components/Editor';
import DOMPurify from 'dompurify';

import {  FaToggleOn ,FaHeading, FaLink, FaTags, FaImage, FaKeyboard, FaListAlt, FaCheckCircle, FaFileAlt, FaGlobe, FaEye, FaInfoCircle } from 'react-icons/fa';
import { Navigate } from 'react-router-dom';


const AddBlog = () => {
  const methods = useForm({
    defaultValues: {
      title: '',
      slug: '',
      content: '',
      image: null,
      category: '',
      status: 'draft',
      tags: '',
      metaTitle: '',
      metaDescription: '',
      metaKeywords: '',
      canonicalUrl: '',
      ogImage: ''
    },
  });

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = methods;

  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const status = watch('status');

  const autoSlugify = (title) =>
    title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      return toast.error('Only image files are allowed');
    }

    if (file.size > 2 * 1024 * 1024) {
      return toast.error('Image size must be under 2MB');
    }

    setValue('image', file);
    setPreview(URL.createObjectURL(file));
  };

  const onSubmit = async (data) => {
    if (!data.title || !data.slug || !data.content || !data.category) {
      return toast.error('All fields are required.');
    }

    const sanitizedContent = DOMPurify.sanitize(data.content);

    const formData = new FormData();
    formData.append('title', data.title.trim());
    formData.append('slug', data.slug.trim());
    formData.append('content', sanitizedContent);
    formData.append('category', data.category);
    formData.append('status', data.status);
    formData.append('tags', data.tags);
    formData.append('metaTitle', data.metaTitle);
    formData.append('metaDescription', data.metaDescription);
    formData.append('metaKeywords', data.metaKeywords);
    formData.append('canonicalUrl', data.canonicalUrl);
    formData.append('ogImage', data.ogImage);

    if (data.image instanceof File) {
      formData.append('image', data.image);
    }

    try {
      setLoading(true);
      await axios.post('/blogs', formData, {
        headers: {
          Authorization: `Bearer ${getToken().token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      toast.success('✅ Blog added successfully');
     
      reset();
      setPreview(null);
    } catch (error) {
      toast.error(error.response?.data?.message || '❌ Failed to create blog');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-md p-6 rounded">
      <h2 className="text-2xl font-semibold mb-6">📝 Add New Blog</h2>

      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">


          {/* Title */}
          <div>
            <label className="block mb-1 font-medium flex items-center gap-2">
              <FaHeading className="text-gray-500 " /> Title
            </label>
            <input
              {...register('title', { required: true })}
              placeholder="Blog Title"
              className="w-full border outline-none p-2 rounded focus:ring-2 focus:ring-blue-400"
              onChange={(e) => {
                const value = e.target.value;
                setValue('title', value);
                setValue('slug', autoSlugify(value));
              }}
            />
          </div>

          {/* Slug */}
          <div>
            <label className="block mb-1 font-medium flex items-center gap-2">
              <FaLink className="text-gray-500" /> Slug
            </label>
            <input
              {...register('slug', { required: true })}
              placeholder="Slug (unique)"
              className="w-full border p-2 outline-none rounded focus:ring-2 focus:ring-blue-400"
            />
          </div>
          {/* Content Editor */}
          <div>
            <label className="block mb-1 font-medium flex items-center gap-2">
              <FaFileAlt className="text-gray-500" /> Content
            </label>
            <Editor
              value={watch('content')}
              onChange={(value) => setValue('content', value)}
            />
          </div>
          {/* Category */}
          <div>
            <label className="block mb-1 font-medium flex items-center gap-2">
              <FaListAlt className="text-gray-500" /> Category
            </label>
            <select
              {...register('category', { required: true })}
              className="w-full border p-2 outline-none rounded focus:ring-2 focus:ring-blue-400"
            >
              <option value="">Select Category</option>
              <option value="Technology">Technology</option>
              <option value="Education">Education</option>
              <option value="Health">Health</option>
              <option value="Business">Business</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="my-4">
            <label className="block mb-1 font-medium flex items-center gap-2">
              <FaToggleOn className="text-gray-500" /> Status
            </label>
            <select
              {...register("status")}
              defaultValue="draft"
              className="w-full border border-gray-300 rounded px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </div>

          {/* Image Upload */}
          <div>
            <label className="block mb-1 font-medium flex items-center gap-2">
              <FaImage className="text-gray-500" /> Upload Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full border p-2 rounded outline-none focus:ring-2 focus:ring-blue-400"
            />
            {preview && (
              <img src={preview} alt="Preview" className="h-40 mt-2 rounded shadow-sm" />
            )}
          </div>


          {/* Tags */}
          {/* Tags */}
          <div>
            <label className="block mb-1 font-medium flex items-center gap-2">
              <FaTags className="text-gray-500" /> Tags
            </label>
            <input
              {...register('tags')}
              placeholder="Tags (comma separated)"
              className="w-full border p-2 outline-none rounded focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Meta Title */}
          <div>
            <label className="block mb-1 font-medium flex items-center gap-2">
              <FaGlobe className="text-gray-500" /> Meta Title
            </label>
            <input
              {...register('metaTitle')}
              placeholder="Meta Title"
              className="w-full border p-2 outline-none rounded focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Meta Description */}
          <div>
            <label className="block mb-1 font-medium flex items-center gap-2">
              <FaInfoCircle className="text-gray-500" /> Meta Description
            </label>
            <textarea
              {...register('metaDescription')}
              placeholder="Meta Description"
              className="w-full border p-2 outline-none rounded focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Meta Keywords */}
          <div>
            <label className="block mb-1 font-medium flex items-center gap-2">
              <FaKeyboard className="text-gray-500" /> Meta Keywords
            </label>
            <input
              {...register('metaKeywords')}
              placeholder="Meta Keywords (comma separated)"
              className="w-full border p-2 outline-none rounded focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Canonical URL */}
          <div>
            <label className="block mb-1 font-medium flex items-center gap-2">
              <FaLink className="text-gray-500" /> Canonical URL
            </label>
            <input
              {...register('canonicalUrl')}
              placeholder="Canonical URL"
              className="w-full border p-2 outline-none rounded focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* OG Image */}
          <div>
            <label className="block mb-1 font-medium flex items-center gap-2">
              <FaImage className="text-gray-500" /> OG Image URL
            </label>
            <input
              {...register('ogImage')}
              placeholder="OG Image URL (optional)"
              className="w-full border p-2 outline-none rounded focus:ring-2 focus:ring-blue-400"
            />
          </div>


          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded disabled:opacity-50"
          >
            {loading ? 'Submitting...' : 'Submit Blog'}
          </button>
        </form>
      </FormProvider>
    </div>
  );
};

export default AddBlog;
