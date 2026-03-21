// src/pages/blogs/EditBlog.jsx
import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useForm, FormProvider } from 'react-hook-form';
import DOMPurify from 'dompurify';
import Editor from '../../components/Editor';
import Spinner from '../../components/Spinner';
import { updateBlog, getBlogById } from '../../services/blogService';
import {
  FaHeading, FaLink, FaFileAlt, FaListAlt, FaToggleOn, FaImage,
  FaTags, FaGlobe, FaInfoCircle, FaKeyboard, FaEye
} from 'react-icons/fa';

const EditBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState('');
  const [serverImage, setServerImage] = useState('');

  const methods = useForm({
    defaultValues: {
      title: '', slug: '', content: '', status: 'draft', image: null,
      category: '', tags: '', metaTitle: '', metaDescription: '',
      metaKeywords: '', canonicalUrl: '', ogImage: ''
    }
  });

const { register, handleSubmit, setValue, watch, reset } = methods;

useEffect(() => {
  const fetchBlog = async () => {
    try {
      setLoading(true);

      const res = await getBlogById(id);

      const blog = res.data.data; // 🔥 correct path


      reset({
        title: blog.title || '',
        slug: blog.slug || '',
        content: blog.content || '',
        status: blog.status || 'draft',
        category: blog.category || '',
        tags: blog.tags?.join(', ') || '', // 🔥 array → string
        metaTitle: blog.metaTitle || '',
        metaDescription: blog.metaDescription || '',
        metaKeywords: blog.metaKeywords || '',
        canonicalUrl: blog.canonicalUrl || '',
        ogImage: blog.ogImage || ''
      });

      // ✅ Image preview (Cloudinary URL direct)
      setPreview(blog.image || '');

    } catch (err) {
      console.error(err);
      toast.error('Failed to load blog data');
    } finally {
      setLoading(false);
    }
  };

  fetchBlog();
}, [id, reset]);

  // ----------------- Handle image selection -----------------
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return toast.error('No file selected');
    if (!file.type.startsWith('image/')) return toast.error('Only image files allowed');
    if (file.size > 2 * 1024 * 1024) return toast.error('Max image size 2MB');

    setValue('image', file);
    setPreview(URL.createObjectURL(file));
  };

  // ----------------- Auto-generate slug -----------------
  const autoSlugify = (title) =>
    title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

  // ----------------- Submit handler -----------------
  const onSubmit = async (data, statusOverride = null) => {
    try {
      setLoading(true);

      const sanitizedContent = DOMPurify.sanitize(data.content);
      const formData = new FormData();

      // Append all fields
      const keys = [
        'title', 'slug', 'content', 'category', 'status', 'tags',
        'metaTitle', 'metaDescription', 'metaKeywords', 'canonicalUrl', 'ogImage'
      ];
     keys.forEach(key => {
  let value = key === 'status' && statusOverride ? statusOverride : data[key];
  if (value !== undefined && value !== null) formData.append(key, value);
});

      // Append image if selected
      if (data.image instanceof File) {
        formData.append('image', data.image);
        
      }

      for (let pair of formData.entries()) {
        console.log("👉", pair[0], pair[1]);
      }

      const response = await updateBlog(id, formData);

  

      toast.success('✅ Blog updated successfully!');
      navigate('/admin/blogs');
    } catch (err) {
      console.error("❌ Update failed:", err);
      toast.error(err.response?.data?.message || '❌ Update failed!');
    } finally {
      setLoading(false);
    }
  };

  // ----------------- Render -----------------
  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">✏️ Edit Blog</h2>
        <Link to="/admin/blogs" className="text-blue-600 hover:underline">← Back</Link>
      </div>

      {loading ? <Spinner /> : (
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

            {/* Title */}
            <div>
              <label className="flex items-center gap-2 font-medium mb-1"><FaHeading /> Title</label>
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
              <label className="flex items-center gap-2 font-medium mb-1"><FaLink /> Slug</label>
              <input {...register('slug', { required: true })} className="w-full border p-2 rounded" />
            </div>

            {/* Content */}
            <div>
              <label className="flex items-center gap-2 font-medium mb-1"><FaFileAlt /> Content</label>
              <Editor value={watch('content')} onChange={val => setValue('content', val)} />
            </div>

            {/* Category */}
            <div>
              <label className="flex items-center gap-2 font-medium mb-1"><FaListAlt /> Category</label>
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
              <label className="flex items-center gap-2 font-medium mb-1"><FaToggleOn /> Status</label>
              <select {...register('status')} className="w-full border p-2 rounded">
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </div>

            {/* Image Upload */}
            <div>
              <label className="flex items-center gap-2 font-medium mb-1"><FaImage /> Upload Image</label>
              <input type="file" accept="image/*" onChange={handleImageChange} className="w-full border p-2 rounded" />
              {preview && <img src={preview} alt="Preview" className="h-40 mt-2 rounded shadow-sm" />}
            </div>

            {/* Tags */}
            <div>
              <label className="flex items-center gap-2 font-medium mb-1"><FaTags /> Tags</label>
              <input {...register('tags')} className="w-full border p-2 rounded" placeholder="comma separated tags" />
            </div>

            {/* Meta Title */}
            <div>
              <label className="flex items-center gap-2 font-medium mb-1"><FaGlobe /> Meta Title</label>
              <input {...register('metaTitle')} className="w-full border p-2 rounded" />
            </div>

            {/* Meta Description */}
            <div>
              <label className="flex items-center gap-2 font-medium mb-1"><FaInfoCircle /> Meta Description</label>
              <textarea {...register('metaDescription')} className="w-full border p-2 rounded" />
            </div>

            {/* Meta Keywords */}
            <div>
              <label className="flex items-center gap-2 font-medium mb-1"><FaKeyboard /> Meta Keywords</label>
              <input {...register('metaKeywords')} className="w-full border p-2 rounded" />
            </div>

            {/* Canonical URL */}
            <div>
              <label className="flex items-center gap-2 font-medium mb-1"><FaLink /> Canonical URL</label>
              <input {...register('canonicalUrl')} className="w-full border p-2 rounded" />
            </div>

            {/* OG Image */}
            <div>
              <label className="flex items-center gap-2 font-medium mb-1"><FaEye /> OG Image URL</label>
              <input {...register('ogImage')} className="w-full border p-2 rounded" />
            </div>

            {/* Submit buttons */}
            <div className="flex gap-4">
              <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
                Update Blog
              </button>
              <button type="button" onClick={handleSubmit((data) => onSubmit(data, 'draft'))}
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded">
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