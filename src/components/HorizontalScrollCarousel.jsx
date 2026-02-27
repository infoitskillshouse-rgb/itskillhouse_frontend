import React, { memo } from "react";
import { motion } from "framer-motion";

/* ================= DATA ================= */

const whyChooseMeCards = [
  {
    id: 1,
    title: "Fast Performance",
    tag: "Speed",
    desc: "Lightning fast website loading with optimized code and performance-first approach.",
    url: "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "Modern UI/UX",
    tag: "Design",
    desc: "Clean, modern and user-friendly interface that increases engagement and conversions.",
    url: "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "SEO Optimization",
    tag: "SEO",
    desc: "Search-engine friendly website structure for better Google ranking and visibility.",
    url: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 4,
    title: "Secure & Scalable",
    tag: "Security",
    desc: "Secure code practices with future-ready scalable architecture for business growth.",
    url: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 5,
    title: "Client Satisfaction",
    tag: "Trust",
    desc: "Client-focused development with proper communication and on-time delivery.",
    url: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop",
  },
];

/* ================= CARD COMPONENT ================= */

const Card = memo(({ card }) => {
  return (
    <motion.div
      className="group relative rounded-3xl overflow-hidden shadow-lg border border-white/10 bg-white/5 backdrop-blur-md"
      whileHover={{ scale: 1.05, y: -5 }}
      transition={{ type: "spring", stiffness: 120 }}
    >
      {/* BACKGROUND IMAGE */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${card.url})` }}
      />
      <div className="absolute inset-0 bg-black/60" />

      {/* CONTENT */}
      <div className="relative z-10 p-6 md:p-8 flex flex-col gap-4 h-full justify-between">
        <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-xs backdrop-blur-sm">
          {card.tag}
        </span>
        <h3 className="text-2xl md:text-3xl font-bold text-white mt-2">
          {card.title}
        </h3>
        <p className="text-white/80">{card.desc}</p>
        <button className="mt-4 px-6 py-2 bg-white text-black rounded-full font-semibold hover:bg-white/90 transition">
          Explore
        </button>
      </div>
    </motion.div>
  );
});

/* ================= MAIN COMPONENT ================= */

const WhyChooseUsModern = () => {
  /* Motion Variants for Cards */
  const cardVariants = {
    offscreen: { opacity: 0, y: 50, scale: 0.95 },
    onscreen: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring", bounce: 0.3, duration: 0.8 },
    },
  };

  return (
    <section className="relative bg-gradient-to-b from-black via-zinc-900 to-black text-white py-24 px-6 md:px-12">
      {/* HEADER */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-bold"
        >
          Why Choose <span className="text-text">Us</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 1 }}
          className="mt-4 text-white/70 text-lg md:text-xl"
        >
          Quality, speed, aur trust — sab ek jagah. Experience premium development.
        </motion.p>
      </div>

      {/* CARDS GRID */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto"
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true, amount: 0.3 }}
      >
        {whyChooseMeCards.map((card, i) => (
          <motion.div key={card.id} variants={cardVariants}>
            <Card card={card} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default WhyChooseUsModern;