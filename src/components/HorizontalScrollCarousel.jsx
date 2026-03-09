import React, { memo } from "react";
import { motion } from "framer-motion";

/* ================= DATA ================= */

const whyChooseMeCards = [
  {
    id: 1,
    title: "Fast Performance",
    tag: "Speed",
    desc: "Lightning fast websites with optimized code, lazy loading and performance-first architecture.",
    url: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1400&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "Modern UI / UX",
    tag: "Design",
    desc: "Clean and modern interfaces designed to increase engagement and improve user experience.",
    url: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?q=80&w=1400&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "SEO Optimized",
    tag: "SEO",
    desc: "SEO-friendly structure that helps your website rank higher on Google search results.",
    url: "https://images.unsplash.com/photo-1562577309-2592ab84b1bc?q=80&w=1400&auto=format&fit=crop",
  },
  {
    id: 4,
    title: "Secure Code",
    tag: "Security",
    desc: "Best security practices, protected APIs and scalable architecture for long-term growth.",
    url: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1400&auto=format&fit=crop",
  },
  {
    id: 5,
    title: "Client Satisfaction",
    tag: "Trust",
    desc: "Transparent communication, reliable delivery and complete client satisfaction.",
    url: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1400&auto=format&fit=crop",
  },
  {
    id: 6,
    title: "Responsive Design",
    tag: "Mobile",
    desc: "Fully responsive websites that look perfect on mobile, tablet and desktop devices.",
    url: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1400&auto=format&fit=crop",
  }
];

/* ================= CARD ================= */

const Card = memo(({ card }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -8 }}
      transition={{ type: "spring", stiffness: 150 }}
      className="group relative h-[320px] rounded-3xl overflow-hidden border border-white/10 shadow-xl"
    >
      {/* IMAGE */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
        style={{ backgroundImage: `url(${card.url})` }}
      />

      {/* OVERLAY */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />

      {/* CONTENT */}
      <div className="relative z-10 p-6 h-full flex flex-col justify-end gap-3">
        
        <span className="inline-block w-fit px-3 py-1 text-xs rounded-full bg-text/80 backdrop-blur-md">
          {card.tag}
        </span>

        <h3 className="text-2xl font-bold">{card.title}</h3>

        <p className="text-white/80 text-sm leading-relaxed">
          {card.desc}
        </p>

      </div>
    </motion.div>
  );
});

/* ================= MAIN ================= */

const WhyChooseUsModern = () => {

  const cardVariants = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7 }
    }
  };

  return (
    <section className="relative py-24 px-6 md:px-12 bg-gradient-to-b from-black via-zinc-900 to-black text-white">

      {/* HEADER */}

      <div className="text-center max-w-3xl mx-auto mb-20">

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-bold"
        >
          Why Choose <span className="text-text">Us</span>
        </motion.h2>

        <p className="mt-4 text-lg text-white/70">
          Premium development, modern design aur fast performance — sab ek jagah.
        </p>

      </div>

      {/* GRID */}

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="grid gap-10 max-w-6xl mx-auto grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
      >
        {whyChooseMeCards.map((card) => (
          <motion.div key={card.id} variants={cardVariants}>
            <Card card={card} />
          </motion.div>
        ))}
      </motion.div>

    </section>
  );
};

export default WhyChooseUsModern;