import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TestimonialForm from "./TestimonialForm";
import { updateTestimonial, getTestimonials } from "../../services/testimonialService";

export default function EditTestimonial() {
  const [testimonial, setTestimonial] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams(); // React Router params

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getTestimonials();
        // React version me res already data array hai
        const found = res.data.find((t) => t._id === id);
        setTestimonial(found);
      } catch (error) {
        console.error("Failed to fetch testimonial", error);
      }
    };
    fetchData();
  }, [id]);

  const handleUpdate = async (data) => {
    try {
      setLoading(true);
      await updateTestimonial(id, data); // API call
      navigate("/admin/testimonials"); // React Router navigate
    } catch (error) {
      console.error("Update failed", error);
      alert("Failed to update testimonial");
    } finally {
      setLoading(false);
    }
  };

  if (!testimonial) return <p className="text-gray-500">Loading testimonial...</p>;

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Edit Testimonial</h2>
      <TestimonialForm
        initialData={testimonial}
        onSubmit={handleUpdate}
        loading={loading}
      />
    </div>
  );
}
