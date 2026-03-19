import React, { memo } from "react";
import { motion } from "framer-motion";
import why1 from "../assets/whyCHooseUs/why1.avif"
import why2 from "../assets/whyCHooseUs/why2.avif"
import why3 from "../assets/whyCHooseUs/why3.avif"
import why4 from "../assets/whyCHooseUs/why4.avif"
import why5 from "../assets/whyCHooseUs/why5.avif"
import why6 from "../assets/whyCHooseUs/why6.avif"

/* ================= DATA ================= */
const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 60,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};
const whyChooseMeCards = [
  {
    id: 1,
    title: "Fast Performance",
    tag: "Speed",
    desc: "Lightning fast websites...",
    url: why1,
  },
  {
    id: 2,
    title: "Modern UI / UX",
    tag: "Design",
    desc: "Clean and modern interfaces...",
    url: why2,
  },
  {
    id: 3,
    title: "SEO Optimized",
    tag: "SEO",
    desc: "SEO-friendly structure...",
    url: why3,
  },
  {
    id: 4,
    title: "Secure Code",
    tag: "Security",
    desc: "Best security practices...",
    url: why4,
  },
  {
    id: 5,
    title: "Client Satisfaction",
    tag: "Trust",
    desc: "Transparent communication...",
    url: why5,
  },
  {
    id: 6,
    title: "Responsive Design",
    tag: "Mobile",
    desc: "Fully responsive websites...",
    url: why6,
  }
];

/* ================= CARD ================= */

const Card = memo(({ card }) => {
  return (
    <motion.div
          variants={cardVariants}   
      whileHover={{ y: -10 }}
      transition={{ type: "spring", stiffness: 120 }}
      className="group relative h-[250px] rounded-3xl overflow-hidden border border-white/10 shadow-2xl"
    >
      {/* IMAGE */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
        style={{ backgroundImage: `url(${card.url})` }}
      />

      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/60 group-hover:bg-black/70 transition duration-500" />

      {/* GLOW */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 blur-xl transition duration-500" />

      {/* TAG */}
      <div className="absolute top-4 left-4 z-10">
        <span className="px-3 py-1 text-xs rounded-full bg-white/10 backdrop-blur-md border border-white/20">
          {card.tag}
        </span>
      </div>

      {/* CONTENT */}
      <div className="relative z-10 h-full flex flex-col justify-end p-6">

        <motion.h3
          className="text-2xl font-bold mb-2"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {card.title}
        </motion.h3>

        <motion.p
          className="text-white/80 text-sm leading-relaxed translate-y-6 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500"
        >
          {card.desc}
        </motion.p>

      </div>
    </motion.div>
  );
});

/* ================= MAIN ================= */

const WhyChooseUsModern = () => {

  return (
    <section className="relative py-28 px-6 md:px-12 bg-gradient-to-b from-black via-zinc-900 to-black text-white">

      {/* HEADER */}
      <div className="text-center max-w-3xl mx-auto mb-20">

        <motion.h2
           initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, amount: 0.5 }}
  transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-bold"
        >
          Why Choose <span className="bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">Us</span>
        </motion.h2>

        <p className="mt-4 text-lg text-white/70">
          Premium development, modern design aur fast performance
        </p>

      </div>

      {/* GRID */}
<motion.div
  variants={containerVariants}
  initial="hidden"
  whileInView="show"
  viewport={{ once: true, amount: 0.3 }} // 🔥 scroll trigger
  className="grid gap-10 max-w-6xl mx-auto grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
>
        {whyChooseMeCards.map((card) => (
          <Card key={card.id} card={card} />
        ))}
      </motion.div>

    </section>
  );
};

export default WhyChooseUsModern;