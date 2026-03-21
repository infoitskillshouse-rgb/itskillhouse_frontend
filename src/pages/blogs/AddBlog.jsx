import { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { createBlog } from '../../services/blogService'; // ✅ use service
import { toast } from 'react-toastify';
import Editor from '../../components/Editor';
import DOMPurify from 'dompurify';

import {
  FaToggleOn,
  FaHeading,
  FaLink,
  FaTags,
  FaImage,
  FaKeyboard,
  FaListAlt,
  FaFileAlt,
  FaGlobe,
  FaInfoCircle
} from 'react-icons/fa';

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
      ogImage: '',
      excerpt: ''
    },
  });

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
  } = methods;

  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  // ✅ AUTO SLUG
  const autoSlugify = (title) =>
    title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

  // ✅ IMAGE HANDLE
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    if (!file.type.startsWith('image/')) {
      return toast.error('Only image files allowed');
    }

    if (file.size > 2 * 1024 * 1024) {
      return toast.error('Image must be under 2MB');
    }

    setValue('image', file);
    setPreview(URL.createObjectURL(file));
  };

  // ✅ SUBMIT
  const onSubmit = async (data) => {
    if (!data.title || !data.slug || !data.content || !data.category) {
      return toast.error('Required fields missing');
    }

    try {
      setLoading(true);

      const sanitizedContent = DOMPurify.sanitize(data.content);

      // ✅ FormData prepare
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
      formData.append('excerpt', data.excerpt);

      if (data.image instanceof File) {
        formData.append('image', data.image);
      }

      // ✅ SERVICE CALL (IMPORTANT FIX)
      const res = await createBlog(formData);

      toast.success('✅ Blog created successfully');

      reset();
      setPreview(null);

    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || 'Blog create failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-md p-6 rounded">
      <h2 className="text-2xl font-semibold mb-6">📝 Add New Blog</h2>

      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

          {/* TITLE */}
          <div>
            <label className="flex items-center gap-2 font-medium mb-1">
              <FaHeading /> Title
            </label>
            <input
              {...register('title', { required: true })}
              className="w-full border p-2 rounded"
              onChange={(e) => {
                const value = e.target.value;
                setValue('title', value);
                setValue('slug', autoSlugify(value));
              }}
            />
          </div>

          {/* SLUG */}
          <div>
            <label className="flex items-center gap-2 font-medium mb-1">
              <FaLink /> Slug
            </label>
            <input
              {...register('slug', { required: true })}
              className="w-full border p-2 rounded"
            />
          </div>

          {/* CONTENT */}
          <div>
            <label className="flex items-center gap-2 font-medium mb-1">
              <FaFileAlt /> Content
            </label>
            <Editor
              value={watch('content')}
              onChange={(value) => setValue('content', value)}
            />
          </div>

          {/* CATEGORY */}
          <div>
            <label className="flex items-center gap-2 font-medium mb-1">
              <FaListAlt /> Category
            </label>
            <select {...register('category')} className="w-full border p-2 rounded">
              <option value="">Select</option>
              <option value="Technology">Technology</option>
              <option value="Education">Education</option>
              <option value="Health">Health</option>
              <option value="Business">Business</option>
            </select>
          </div>

          {/* STATUS */}
          <div>
            <label className="flex items-center gap-2 font-medium mb-1">
              <FaToggleOn /> Status
            </label>
            <select {...register('status')} className="w-full border p-2 rounded">
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </div>

          {/* IMAGE */}
          <div>
            <label className="flex items-center gap-2 font-medium mb-1">
              <FaImage /> Upload Image
            </label>
            <input type="file" onChange={handleImageChange} />
            {preview && (
              <img src={preview} alt="preview" className="mt-2 h-40 rounded" />
            )}
          </div>

          {/* EXCERPT */}
          <textarea {...register('excerpt')} placeholder="Excerpt" className="w-full border p-2 rounded" />

          {/* TAGS */}
          <input {...register('tags')} placeholder="Tags" className="w-full border p-2 rounded" />

          {/* META */}
          <input {...register('metaTitle')} placeholder="Meta Title" className="w-full border p-2 rounded" />
          <textarea {...register('metaDescription')} placeholder="Meta Description" className="w-full border p-2 rounded" />
          <input {...register('metaKeywords')} placeholder="Keywords" className="w-full border p-2 rounded" />
          <input {...register('canonicalUrl')} placeholder="Canonical URL" className="w-full border p-2 rounded" />
          <input {...register('ogImage')} placeholder="OG Image URL" className="w-full border p-2 rounded" />

          {/* SUBMIT */}
          <button
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded"
          >
            {loading ? 'Submitting...' : 'Create Blog'}
          </button>

        </form>
      </FormProvider>
    </div>
  );
};

export default AddBlog;