
import { motion } from "framer-motion";
import { Lightbulb, ShieldCheck, Star, Users } from "lucide-react";

const values = [
  {
    icon: <Lightbulb className="w-8 h-8 text-blue-500" />,
    title: "Innovation",
    desc: "We push boundaries and create inspiring solutions.",
  },
  {
    icon: <ShieldCheck className="w-8 h-8 text-blue-500" />,
    title: "Integrity",
    desc: "Honesty and ethics guide every decision.",
  },
  {
    icon: <Star className="w-8 h-8 text-blue-500" />,
    title: "Excellence",
    desc: "Delivering top-notch quality is our standard.",
  },
  {
    icon: <Users className="w-8 h-8 text-blue-500" />,
    title: "Client Focus",
    desc: "Your goals are our priority, every step.",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.18 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 120, damping: 15 },
  },
};

export default function AboutValues() {
  return (
    <section className="relative py-28 px-6 bg-gradient-to-b from-blue-50 via-white to-blue-100 overflow-hidden">
      {/* Background Motion Blobs (disabled on small screens for performance) */}
      <motion.div
        className="hidden sm:block absolute -top-16 left-1/4 w-80 h-80 bg-blue-300/25 rounded-full blur-3xl"
        animate={{ y: [0, 20, 0], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="hidden sm:block absolute bottom-0 right-1/4 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl"
        animate={{ y: [0, -25, 0], opacity: [0.3, 0.45, 0.3] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Section Header */}
      <motion.div
        className="text-center mb-20 relative z-10"
        initial={{ opacity: 0, y: -40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <h2 className="text-6xl max-sm:text-4xl font-semibold text-slate-800 tracking-tight">
          Our Core Values
        </h2>
        <p className="text-slate-600 max-w-2xl mx-auto mt-4 text-lg md:text-xl leading-relaxed">
          Principles that define who we are and how we deliver exceptional work.
        </p>
      </motion.div>

      {/* Value Cards */}
      <motion.div
        className="relative z-10 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {values.map((value, i) => (
          <motion.div
            key={i}
            variants={itemVariants}
            whileHover={{
              y: -4,
              scale: 1.03,
              rotateX: 1,
              rotateY: -1,
            }}
            transition={{ type: "spring", stiffness: 160, damping: 18 }}
            className="group relative p-8 rounded-3xl bg-white/70 border border-blue-200/40 
                       backdrop-blur-xl shadow-lg transition-all duration-500
                       hover:shadow-blue-200/40 will-change-transform overflow-hidden"
          >
            {/* Gradient border shimmer */}
            <motion.div
              className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-400 via-blue-200 to-blue-400 opacity-0 group-hover:opacity-20 blur-lg"
              animate={{ x: ["0%", "100%"] }}
              transition={{ duration: 3, repeat: Infinity }}
            />

            {/* Floating Icon */}
            <motion.div
              className="p-4 bg-blue-100/60 rounded-2xl mb-5 inline-flex items-center justify-center shadow-inner shadow-blue-200/50"
              animate={{ y: [0, -2, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              {value.icon}
            </motion.div>

            <h3 className="text-2xl font-bold text-slate-800 mb-2 group-hover:text-blue-600 transition-colors duration-300">
              {value.title}
            </h3>
            <p className="text-slate-600 text-base leading-relaxed">{value.desc}</p>

            {/* Animated underline */}
            <motion.div
              className="mt-4 h-1 w-12 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              viewport={{ once: true }}
              style={{ transformOrigin: "left" }}
            />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
