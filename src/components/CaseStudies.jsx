import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const caseStudies = [
  {
    id: 1,
    title: "E-commerce Redesign Boosted Sales by 60%",
    client: "ShopEase",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d",
    challenge: "Low conversions and poor mobile UX affecting sales.",
    solution: "Mobile-first redesign with optimized checkout & visuals.",
    result: "60% sales growth & 35% lower bounce rate in 3 months.",
  },
  {
    id: 2,
    title: "Brand Identity Overhaul for Tech Startup",
    client: "InnovateX",
    image: "https://images.unsplash.com/photo-1559028012-481c04fa702d",
    challenge: "No consistent brand identity across platforms.",
    solution: "Created logo, typography & brand guidelines.",
    result: "Better brand recall & higher engagement.",
  },
  {
    id: 3,
    title: "Restaurant Website with Booking System",
    client: "The Spice House",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0",
    challenge: "Manual bookings causing confusion.",
    solution: "Online booking system with payments integration.",
    result: "Bookings doubled & satisfaction +45%.",
  },
];

export default function CaseStudiesSlider() {
  const [index, setIndex] = useState(0);

  const next = () => {
    setIndex((prev) => (prev + 1) % caseStudies.length);
  };

  const prev = () => {
    setIndex((prev) =>
      prev === 0 ? caseStudies.length - 1 : prev - 1
    );
  };

  const study = caseStudies[index];

  return (
    <section className="relative h-screen bg-white overflow-hidden flex items-center justify-center">

      {/* Buttons */}
      <button
        onClick={prev}
        className="absolute left-6 z-10 bg-black text-white px-4 py-2 rounded-full"
      >
        ←
      </button>

      <button
        onClick={next}
        className="absolute right-6 z-10 bg-black text-white px-4 py-2 rounded-full"
      >
        →
      </button>

      {/* Slide */}
      <AnimatePresence mode="wait">
        <motion.div
          key={study.id}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.6 }}
          className="grid md:grid-cols-2 gap-10 items-center max-w-6xl mx-auto px-6"
        >

          {/* Image */}
          <div className="overflow-hidden rounded-3xl shadow-xl">
            <img
              src={study.image}
              alt={study.title}
              className="w-full h-[350px] object-cover"
            />
          </div>

          {/* Content */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              {study.title}
            </h2>

            <p className="text-blue-600 font-medium mb-4">
              Client: {study.client}
            </p>

            <div className="space-y-3 text-gray-700">
              <p><strong>Challenge:</strong> {study.challenge}</p>
              <p><strong>Solution:</strong> {study.solution}</p>
              <p><strong>Result:</strong> {study.result}</p>
            </div>

            <button className="mt-6 px-6 py-2 bg-black text-white rounded-full text-sm hover:bg-gray-800 transition">
              View Project →
            </button>
          </div>

        </motion.div>
      </AnimatePresence>

      {/* Dots */}
      <div className="absolute bottom-8 flex gap-2">
        {caseStudies.map((_, i) => (
          <div
            key={i}
            className={`w-3 h-3 rounded-full ${
              i === index ? "bg-black" : "bg-gray-300"
            }`}
          ></div>
        ))}
      </div>

    </section>
  );
}