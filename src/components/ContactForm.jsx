import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Lottie from 'lottie-react';
import successAnimation from './success.json';
import confetti from 'canvas-confetti';
import {createInquiry} from '../services/inquiryService.js'

const initialState = {
  fullName: '',
  companyName: '',
  email: '',
  phone: '',
  services: [],
  requirements: '',
};

const servicesList = [
  'Branding',
  'Web Design',
  'Web & Development',
  'Mobile App Development',
  'Something Else',
];

// Variants for staggered animations
const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      when: 'beforeChildren',
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function ContactForm() {
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const paragraph =
    "We’re passionate about creating exceptional digital experiences, and we’d love to hear about your project. No matter the size or scope, we’re here to help you achieve your goals.";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const toggleService = (service) => {
    setFormData((prev) => {
      const exists = prev.services.includes(service);
      const updated = exists
        ? prev.services.filter((s) => s !== service)
        : [...prev.services, service];
      return { ...prev, services: updated };
    });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName) newErrors.fullName = 'Full name is required';
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = 'Valid email required';
    if (!formData.phone || !/^\d{10}$/.test(formData.phone))
      newErrors.phone = 'Valid 10-digit phone number required';
    return newErrors;
  };

  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  const errs = validate();
  if (Object.keys(errs).length > 0) {
    setErrors(errs);
    return;
  }

  setErrors({});
  setIsSubmitting(true);

  try {
    // ✅ Service function use (NO fetch)
    await createInquiry(formData);

    setFormData(initialState);
    setShowSuccess(true);
    triggerConfetti();
  } catch (error) {
    console.error("Submit failed", error);
  } finally {
    setIsSubmitting(false);
  }
};


  return (
    <>
      {/* Success Modal */}
      {showSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-surface bg-opacity-90">
          <div className="max-w-xs w-full">
            <Lottie animationData={successAnimation} loop={false} />
            <p className="text-center text-xl font-semibold mt-2">Submitted successfully!</p>
            <button
              className="mt-4 w-full bg-black text-white py-2 rounded-full"
              onClick={() => setShowSuccess(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Info Section (Optional) */}
      <section className="w-full px-[5vw] py-[8vh] bg-surface lg:py-[8vw] lg:px-[10vw] flex flex-col gap-8 lg:flex-row items-start">
        <motion.div
          className="flex bg-surface items-center justify-start lg:justify-center gap-5 w-full lg:max-w-sm"

          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <div className="w-1 h-6 bg-text" />
          <h2 className="text-[clamp(1.2rem,1vw,1.5rem)] font-bold uppercase tracking-wide text-text">
            how can we help you?
          </h2>
        </motion.div>

        <motion.p
          className="text-gray-700 text-[clamp(1.3rem,1.8vw,22px)] leading-[1.7]"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          {paragraph}
        </motion.p>
      </section>

      {/* Contact Form with Scroll-Based Staggered Animation */}
      <motion.form
        ref={ref}
        onSubmit={handleSubmit}
        className="max-w-4xl mx-auto px-4 pb-5 space-y-8 py-5 "
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={containerVariants}
      >
        {/* Name + Company */}
        <motion.div
          className="flex flex-col md:flex-row gap-4"
          variants={itemVariants}
        >
          <div className="w-full">
            <label className="block text-sm font-medium">Full Name *</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className={`w-full mt-1 rounded-full px-4 py-2 bg-gray-100 outline-none border focus:ring-2 focus:ring-blue-500 ${errors.fullName ? 'border-red-500' : 'border-transparent'
                }`}
            />
            {errors.fullName && (
              <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>
            )}
          </div>
          <div className="w-full">
            <label className="block text-sm font-medium">Company Name</label>
            <input
              type="text"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              className="w-full mt-1 rounded-full px-4 py-2 bg-gray-100 outline-none border focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </motion.div>

        {/* Services */}
        <motion.div variants={itemVariants}>
          <p className="text-sm font-medium mb-2">I'm interested in</p>
          <div className="flex flex-wrap gap-3">
            {servicesList.map((service) => (
              <button
                key={service}
                type="button"
                onClick={() => toggleService(service)}
                className={`rounded-full px-4 py-2 text-sm font-medium border transition ${formData.services.includes(service)
                    ? 'bg-black text-white'
                    : 'bg-gray-100 text-black'
                  }`}
              >
                {service}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Email + Phone */}
        <motion.div
          className="flex flex-col md:flex-row gap-4"
          variants={itemVariants}
        >
          <div className="w-full">
            <label className="block text-sm font-medium">Email Address *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full mt-1 rounded-full px-4 py-2 bg-gray-100 outline-none border focus:ring-2 focus:ring-blue-500 ${errors.email ? 'border-red-500' : 'border-transparent'
                }`}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>
          <div className="w-full">
            <label className="block text-sm font-medium">Phone Number *</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={`w-full mt-1 rounded-full px-4 py-2 bg-gray-100 outline-none border focus:ring-2 focus:ring-blue-500 ${errors.phone ? 'border-red-500' : 'border-transparent'
                }`}
            />
            {errors.phone && (
              <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
            )}
          </div>
        </motion.div>

        {/* Requirements */}
        <motion.div variants={itemVariants}>
          <label className="block text-sm font-medium">
            Brief your requirements here:
          </label>
          <textarea
            name="requirements"
            value={formData.requirements}
            onChange={handleChange}
            rows={4}
            className="w-full mt-1 rounded-xl px-4 py-2 bg-gray-100 outline-none border focus:ring-2 focus:ring-blue-500"
            placeholder="Share your idea/project here..."
          />
        </motion.div>

        {/* Submit */}
        <motion.div variants={itemVariants}>
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-black text-white px-6 py-3 rounded-full hover:bg-gray-800 transition"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Inquiry'}
          </button>
        </motion.div>
      </motion.form>
    </>
  );
}
