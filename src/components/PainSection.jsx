import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  FaClock,
  FaBullseye,
  FaMobileAlt,
  FaUserCheck,
  FaChartLine,
  FaCogs,
} from "react-icons/fa";

/* ✅ DATA SAME */
const issues = [
  { icon: <FaBullseye />, title: "You need", text: "to drive more qualified leads efficiently and scale your business quickly." },
  { icon: <FaClock />, title: "You have", text: "to follow tight deadlines while maintaining high-quality standards." },
  { icon: <FaMobileAlt />, title: "You need", text: "cross-platform compatibility for all modern devices and browsers." },
  { icon: <FaUserCheck />, title: "You have", text: "to meet evolving customer expectations consistently." },
  { icon: <FaChartLine />, title: "You need", text: "to increase conversions and optimize marketing ROI effectively." },
  { icon: <FaCogs />, title: "You need", text: "scalable architecture and automation to handle growing workloads." },
];

const PainSection = () => {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "end start"],
  });

  const headingY = useTransform(scrollYProgress, [0.05, 0.25], [140, 0]);
  const headingOpacity = useTransform(scrollYProgress, [0.05, 0.20], [0, 1]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen w-full bg-black text-white py-[120px] md:py-[160px] overflow-hidden"
    >
      {/* 🔹 MULTI-LAYER CYBER BACKGROUND */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-[-25%] left-[-10%] w-[700px] h-[700px] bg-blue-600/30 blur-[180px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-25%] right-[-10%] w-[600px] h-[600px] bg-blue-600/25 blur-[200px] rounded-full animate-pulse" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(59,130,246,0.18),transparent_65%)]" />
      </div>

      {/* 🔹 HEADING */}
      <motion.div
        style={{ y: headingY, opacity: headingOpacity }}
        className="text-center mb-32 px-6"
      >
        <h1 className="text-[10vw] md:text-[6vw] lg:text-[4.5vw] font-semibold tracking-tight leading-tight">
          We Understand Your{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-600">
            Pain
          </span>
        </h1>

        <div className="mt-6 w-28 h-[3px] mx-auto bg-gradient-to-r from-blue-600 to-cyan-400 rounded-full" />

        <p className="text-white/60 mt-6 max-w-2xl mx-auto text-sm md:text-base lg:text-lg leading-snug">
          The hidden struggles silently destroying your digital growth. We help you overcome them efficiently.
        </p>
      </motion.div>

      {/* 🔹 HOLOGRAM AI CORE */}
 {/* 🔹 HOLOGRAM AI CORE */}
<div className="relative w-full flex items-center justify-center mb-20 md:mb-40">
  <div className="absolute w-40 h-40 md:w-80 md:h-80 rounded-full bg-gradient-to-br from-blue-600 to-cyan-400 blur-[80px] md:blur-[140px] opacity-30 animate-pulse" />
  <motion.div
    animate={{ rotate: 360 }}
    transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
    className="relative w-24 h-24 md:w-36 md:h-36 rounded-full border border-blue-400/30 md:border-blue-400/40 flex items-center justify-center"
  >
    <span className="text-blue-400 text-xs md:text-sm tracking-widest uppercase">
      AI CORE
    </span>
  </motion.div>
</div>

{/* 🔹 GLASS NEON ISSUE BLOCKS */}
<div className="relative max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-12 md:gap-16 lg:gap-20">
  {issues.map((item, i) => {
    const start = 0.2 + i * 0.04;
    const end = start + 0.12;

    const opacity = useTransform(scrollYProgress, [start, end], [0, 1]);
    const y = useTransform(scrollYProgress, [start, end], [160, 0]);

    const isDesktop = typeof window !== "undefined" ? window.innerWidth >= 768 : true;

    return (
      <motion.div
        key={i}
        style={{ opacity, y }}
        whileHover={isDesktop ? { scale: 1.08 } : {}}
        transition={{ type: "spring", stiffness: 120, damping: 16 }}
        className="relative group"
      >
        <div className="absolute -inset-1 rounded-[24px] bg-gradient-to-r from-blue-600 via-cyan-400 to-blue-600 opacity-0 md:group-hover:opacity-80 blur-2xl transition duration-500" />

        <div className="relative overflow-hidden backdrop-blur-xl md:backdrop-blur-3xl border border-white/10 rounded-[16px] p-4 sm:p-6 md:p-10 flex flex-col shadow-[0_0_50px_rgba(59,130,246,0.15)]">
          <div className="mb-4 w-12 md:w-16 h-12 md:h-16 rounded-full bg-gradient-to-br from-blue-600 to-cyan-400 flex items-center justify-center text-black text-xl md:text-3xl shadow-[0_0_30px_rgba(59,130,246,0.7)]">
            {item.icon}
          </div>

          <h3 className="text-xl md:text-3xl font-semibold mb-1 md:mb-3 tracking-wide">
            {item.title}
          </h3>

          <p className="text-white/65 leading-relaxed text-sm md:text-base max-w-sm break-words">
            {item.text}
          </p>

          <div className="absolute bottom-0 left-0 h-[2px] w-0 md:group-hover:w-full bg-gradient-to-r from-blue-600 to-cyan-400 transition-all duration-700" />
        </div>
      </motion.div>
    );
  })}
</div>


      {/* 🔹 FUTURISTIC SCROLL MARQUEE */}
      <div className="relative w-full overflow-hidden mt-20 md:mt-32 lg:mt-48 border-t border-white/10">
        <div className="flex animate-marquee max-sm:text-[40px] max-sm:gap-15 gap-32 md:gap-40  lg:gap-48 whitespace-nowrap py-6 md:py-8 text-white/40 text-lg md:text-2xl lg:text-3xl tracking-widest">
          <span>• AI Driven •</span>
          <span>• Web3 Ready •</span>
          <span>• Cyber Secure •</span>
          <span>• Ultra Performance •</span>
          <span>• Automation •</span>
          <span>• Cloud Scale •</span>
          {/* repeat for smooth infinite scroll */}
          <span>• AI Driven •</span>
          <span>• Web3 Ready •</span>
          <span>• Cyber Secure •</span>
          <span>• Ultra Performance •</span>
          <span>• Automation •</span>
          <span>• Cloud Scale •</span>
        </div>
      </div>

      <style>
        {`
          @keyframes marquee {
            0% { transform: translateX(0%); }
            100% { transform: translateX(-50%); }
          }
          .animate-marquee {
            display: flex;
            animation: marquee 3s linear infinite;
          }
        `}
      </style>
    </section>
  );
};

export default PainSection;
