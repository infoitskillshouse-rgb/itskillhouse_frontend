
import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";

const stats = [
  { title: "5+", desc: "Years Experience", value: 5 },
  { title: "50+", desc: "Projects Completed", value: 50 },
  { title: "10+", desc: "Expert Team Members", value: 10 },
  { title: "100%", desc: "Client Satisfaction", value: 100 },
];

export default function AboutStats() {
  const controls = useAnimation();
  const [counters, setCounters] = useState(stats.map(() => 0));
  const [hasAnimated, setHasAnimated] = useState(false);

  // ⚙️ Lightweight Counter Animation
  const startCounters = () => {
    const duration = 1000;
    const steps = 60;
    let frame = 0;
    const interval = setInterval(() => {
      frame++;
      const progress = Math.min(frame / steps, 1);
      setCounters(stats.map((stat) => Math.floor(stat.value * progress)));
      if (progress === 1) clearInterval(interval);
    }, duration / steps);
  };

  useEffect(() => {
    controls.start((i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.15, duration: 0.6, ease: "easeOut" },
    }));
  }, []);

  return (
    <motion.section
      className="relative py-20 sm:py-24 bg-dark text-white overflow-hidden"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      onViewportEnter={() => {
        if (!hasAnimated) {
          startCounters();
          setHasAnimated(true);
        }
      }}
    >
      {/* 🌌 Background Glow */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="hidden sm:block absolute top-20 left-20 w-72 h-72 bg-blue-600/20 rounded-full blur-2xl" />
        <div className="hidden sm:block absolute bottom-10 right-16 w-96 h-96 bg-indigo-700/20 rounded-full blur-2xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
        {/* Title */}
        <motion.h2
          className="text-4xl md:text-6xl font-semibold mb-14 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-700 drop-shadow-[0_3px_12px_rgba(0,0,0,0.4)]"
          initial={{ opacity: 0, y: 40 }}
          animate={controls}
        >
          Our Impact in Numbers
        </motion.h2>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-4 gap-6 md:gap-10">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              custom={i}
              initial={{ opacity: 0, y: 50 }}
              animate={controls}
              transition={{ type: "spring", stiffness: 180, damping: 14 }}
              className="group relative overflow-hidden bg-white/10 backdrop-blur-md sm:backdrop-blur-xl border border-white/10 rounded-3xl p-6 sm:p-10"
            >
              {/* Stat Number */}
              <motion.h3
                className="relative text-3xl max-sm:text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 bg-clip-text text-transparent drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)]"
              >
                {counters[i]}
                {stat.title.replace(/\d+/g, "")}
              </motion.h3>

              {/* Description */}
              <p className="mt-2 sm:mt-3 text-gray-300 text-sm sm:text-base md:text-lg tracking-wide">
                {stat.desc}
              </p>

              {/* Glow Line */}
              <motion.div
                className="mt-4 mx-auto h-1 w-10 sm:w-12 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 0.6 }}
                style={{ transformOrigin: "left" }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
