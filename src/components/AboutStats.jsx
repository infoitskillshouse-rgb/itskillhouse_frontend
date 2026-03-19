import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { FaBriefcase, FaProjectDiagram, FaUsers, FaSmile } from "react-icons/fa";

const stats = [
  { title: "5+", desc: "Years Experience", value: 5, icon: FaBriefcase },
  { title: "50+", desc: "Projects Completed", value: 50, icon: FaProjectDiagram },
  { title: "10+", desc: "Expert Team Members", value: 10, icon: FaUsers },
  { title: "100%", desc: "Client Satisfaction", value: 100, icon: FaSmile },
];

export default function AboutStats() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const [counters, setCounters] = useState(stats.map(() => 0));

  useEffect(() => {
    if (!isInView) return;

    const duration = 1200;
    const start = performance.now();

    const animate = (time) => {
      const progress = Math.min((time - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);

      setCounters(stats.map((stat) => Math.floor(stat.value * eased)));

      if (progress < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, [isInView]);

  return (
    <section
      ref={ref}
      className="relative py-28 bg-gradient-to-b from-black via-slate-900 to-black text-white overflow-hidden"
    >
      {/* Glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-20 w-80 h-80 bg-blue-600/20 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-16 w-[420px] h-[420px] bg-indigo-700/20 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6 text-center">

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-5xl md:text-7xl font-bold mb-20 bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent"
        >
          Our Impact in Numbers
        </motion.h2>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 place-items-center">

          {stats.map((stat, i) => {
            const Icon = stat.icon;

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.7 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: i * 0.15, duration: 0.5 }}
                className="group relative flex flex-col items-center justify-center 
                w-52 h-52 md:w-64 md:h-64 rounded-full 
                bg-white/5 backdrop-blur-xl border border-white/10 
                hover:border-blue-500/40 transition-all duration-300 
                hover:scale-105"
              >
                {/* Icon */}
                <div className="mb-3">
                  <Icon className="text-3xl md:text-4xl text-blue-400" />
                </div>

                {/* Number */}
                <h3 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">
                  {counters[i]}
                  {stat.title.replace(/\d+/g, "")}
                </h3>

                {/* Curved Text */}
                <div className="absolute bottom-3 w-full flex justify-center">
                  <svg width="180" height="70" viewBox="0 0 180 70">
                    
                    <path
                      id={`curve-${i}`}
                      d="M20,25 Q90,65 160,25"
                      fill="transparent"
                    />

                    <text
                      fill="#cbd5e1"
                      fontSize="12"
                      textAnchor="middle"
                    >
                      <textPath href={`#curve-${i}`} startOffset="50%">
                        {stat.desc}
                      </textPath>
                    </text>

                  </svg>
                </div>

                {/* Glow */}
                <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 blur-xl transition duration-500" />
              </motion.div>
            );
          })}

        </div>
      </div>
    </section>
  );
}