import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { getTestimonials } from "../services/testimonialService";

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await getTestimonials();
        setTestimonials(res.data || []);
      } catch (error) {
        console.error("Failed to load testimonials", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  // ✅ Loading State
  if (loading) {
    return (
      <section className="py-20 bg-white text-center">
        <p className="text-gray-500">Loading testimonials...</p>
      </section>
    );
  }

  // ✅ Empty State
  if (!testimonials.length) {
    return (
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-semibold text-text mb-4 "
          >
            Testimonials Coming Soon
          </motion.h2>

          <p className="text-gray-500">
            We're currently gathering feedback from our amazing clients.
            Stay tuned — great words are on the way.
          </p>
        </div>
      </section>
    );
  }

  // ✅ Main Testimonials Section
  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-gray-800 mb-12"
        >
          What Our <span className="text-indigo-500">Clients Say</span>
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((item, index) => (
            <motion.div
              key={item._id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              className="bg-gray-50 shadow-md rounded-2xl p-6 border border-gray-100 hover:shadow-xl transition-all"
            >
              <div className="flex justify-center mb-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-indigo-500"
                />
              </div>

              <div className="flex justify-center text-yellow-400 mb-2">
                {[...Array(item.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400" />
                ))}
              </div>

              <h3 className="text-lg font-semibold text-gray-800">
                {item.name}
              </h3>

              <p className="text-gray-600 text-sm mt-2">
                "{item.message}"
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}