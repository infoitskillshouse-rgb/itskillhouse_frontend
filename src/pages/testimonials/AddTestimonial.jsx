import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TestimonialForm from "./TestimonialForm";
import { createTestimonial } from "../../services/testimonialService";

export default function AddTestimonial() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleCreate = async (formData) => {
    try {
      setLoading(true);

      // ✅ Ensure image is provided
      if (!formData.image) {
        alert("Please upload an image for the testimonial");
        return;
      }

      await createTestimonial(formData); // API call
      navigate("/admin/testimonials"); // Redirect to list
    } catch (error) {
      console.error("Failed to add testimonial", error);
      alert(error?.response?.data?.message || "Failed to add testimonial");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Add Testimonial
      </h2>

      <TestimonialForm onSubmit={handleCreate} loading={loading} />
    </div>
  );
}
