// src/pages/blogs/EditBlog.jsx

import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from '../../api/axiosInstance';
import { toast } from 'react-toastify';
import Spinner from '../../components/Spinner';
import { useForm, FormProvider } from 'react-hook-form';
import Editor from '../../components/Editor';
import DOMPurify from 'dompurify';
import {
  FaHeading, FaLink, FaFileAlt, FaListAlt, FaToggleOn, FaImage, FaTags,
  FaGlobe, FaInfoCircle, FaKeyboard, FaEye
} from 'react-icons/fa';

const EditBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [preview, setPreview] = useState('');
  const [loading, setLoading] = useState(false);
  const [serverImage, setServerImage] = useState('');

  const methods = useForm({
    defaultValues: {
      title: '', slug: '', content: '', status: 'draft', image: null,
      category: '', tags: '', metaTitle: '', metaDescription: '',
      metaKeywords: '', canonicalUrl: '', ogImage: ''
    }
  });

  const { register, handleSubmit, setValue, watch } = methods;

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`/blogs/id/${id}`);
        const fields = [
          'title', 'slug', 'content', 'status', 'category', 'tags',
          'metaTitle', 'metaDescription', 'metaKeywords', 'canonicalUrl', 'ogImage'
        ];
        fields.forEach((field) => setValue(field, data[field] || ''));
        setServerImage(data.image);
        setPreview(`/uploads/blogs/${data.image}`);
      } catch {
        toast.error("Failed to load blog.");
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [id, setValue]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) return toast.error('Only image files allowed');
    if (file.size > 2 * 1024 * 1024) return toast.error('Max image size 2MB');
    setValue('image', file);
    setPreview(URL.createObjectURL(file));
  };

  const autoSlugify = (title) =>
    title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

  const onSubmit = async (data, statusOverride = null) => {
    const sanitizedContent = DOMPurify.sanitize(data.content);
    const formData = new FormData();
    formData.append('title', data.title.trim());
    formData.append('slug', data.slug.trim() || autoSlugify(data.title));
    formData.append('content', sanitizedContent);
    formData.append('category', data.category);
    formData.append('status', statusOverride || data.status);
    formData.append('tags', data.tags);
    formData.append('metaTitle', data.metaTitle);
    formData.append('metaDescription', data.metaDescription);
    formData.append('metaKeywords', data.metaKeywords);
    formData.append('canonicalUrl', data.canonicalUrl);
    formData.append('ogImage', data.ogImage);
    if (data.image instanceof File) formData.append('image', data.image);

    try {
      setLoading(true);
      await axios.put(`/blogs/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true
      });
      toast.success('✅ Blog updated successfully!');
      navigate('/admin/blogs');
    } catch (err) {
      toast.error(err.response?.data?.message || '❌ Update failed!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">✏️ Edit Blog</h2>
        <Link to="/admin/blogs" className="text-blue-600 hover:underline">← Back</Link>
      </div>

      {loading ? <Spinner /> : (
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit((data) => onSubmit(data))} className="space-y-5">

            {/* Title */}
            <div>
              <label className="flex items-center gap-2 font-medium mb-1">
                <FaHeading /> Title
              </label>
              <input
                {...register('title', { required: true })}
                className="w-full border p-2 rounded"
                onChange={(e) => {
                  setValue('title', e.target.value);
                  setValue('slug', autoSlugify(e.target.value));
                }}
              />
            </div>

            {/* Slug */}
            <div>
              <label className="flex items-center gap-2 font-medium mb-1">
                <FaLink /> Slug
              </label>
              <input {...register('slug', { required: true })} className="w-full border p-2 rounded" />
            </div>

            {/* Content */}
            <div>
              <label className="flex items-center gap-2 font-medium mb-1">
                <FaFileAlt /> Content
              </label>
              <Editor value={watch('content')} onChange={(val) => setValue('content', val)} />
            </div>

            {/* Category */}
            <div>
              <label className="flex items-center gap-2 font-medium mb-1">
                <FaListAlt /> Category
              </label>
              <select {...register('category', { required: true })} className="w-full border p-2 rounded">
                <option value="">Select Category</option>
                <option value="Technology">Technology</option>
                <option value="Education">Education</option>
                <option value="Health">Health</option>
                <option value="Business">Business</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Status */}
            <div>
              <label className="flex items-center gap-2 font-medium mb-1">
                <FaToggleOn /> Status
              </label>
              <select {...register('status')} className="w-full border p-2 rounded">
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </div>

            {/* Image Upload */}
            <div>
              <label className="flex items-center gap-2 font-medium mb-1">
                <FaImage /> Upload Image
              </label>
              <input type="file" accept="image/*" onChange={handleImageChange} className="w-full border p-2 rounded" />
              {preview && <img src={preview} alt="Preview" className="h-40 mt-2 rounded shadow-sm" />}
            </div>

            {/* Tags */}
            <div>
              <label className="flex items-center gap-2 font-medium mb-1">
                <FaTags /> Tags
              </label>
              <input {...register('tags')} className="w-full border p-2 rounded" placeholder="comma separated tags" />
            </div>

            {/* Meta Title */}
            <div>
              <label className="flex items-center gap-2 font-medium mb-1">
                <FaGlobe /> Meta Title
              </label>
              <input {...register('metaTitle')} className="w-full border p-2 rounded" />
            </div>

            {/* Meta Description */}
            <div>
              <label className="flex items-center gap-2 font-medium mb-1">
                <FaInfoCircle /> Meta Description
              </label>
              <textarea {...register('metaDescription')} className="w-full border p-2 rounded" />
            </div>

            {/* Meta Keywords */}
            <div>
              <label className="flex items-center gap-2 font-medium mb-1">
                <FaKeyboard /> Meta Keywords
              </label>
              <input {...register('metaKeywords')} className="w-full border p-2 rounded" />
            </div>

            {/* Canonical URL */}
            <div>
              <label className="flex items-center gap-2 font-medium mb-1">
                <FaLink /> Canonical URL
              </label>
              <input {...register('canonicalUrl')} className="w-full border p-2 rounded" />
            </div>

            {/* OG Image */}
            <div>
              <label className="flex items-center gap-2 font-medium mb-1">
                <FaEye /> OG Image URL
              </label>
              <input {...register('ogImage')} className="w-full border p-2 rounded" />
            </div>

            {/* Submit */}
            <div className="flex gap-4">
              <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
                Update Blog
              </button>
              <button
                type="button"
                onClick={handleSubmit((data) => onSubmit(data, 'draft'))}
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
              >
                Save as Draft
              </button>
            </div>
          </form>
        </FormProvider>
      )}
    </div>
  );
};

export default EditBlog;


