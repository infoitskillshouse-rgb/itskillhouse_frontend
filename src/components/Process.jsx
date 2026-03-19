import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const STEPS = [
  {
    title: "Understanding",
    desc: "We decode goals, constraints, and intent before execution begins.",
    side: "left",
  },
  {
    title: "Strategy",
    desc: "Clear systems, priorities, and direction built for scale.",
    side: "right",
  },
  {
    title: "Design & Build",
    desc: "Design-led engineering focused on performance and longevity.",
    side: "left",
  },
  {
    title: "Testing",
    desc: "Relentless testing to eliminate friction and uncertainty.",
    side: "right",
  },
  {
    title: "Launch & Scale",
    desc: "Confident launches backed by systems ready to scale.",
    side: "left",
  },
];

export default function ProcessSection() {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 85%", "end 25%"],
  });

  return (
    <section
      ref={ref}
      className="relative bg-black text-white py-[18vw] md:py-[12vw] overflow-hidden"
    >
      <div className="relative max-w-6xl mx-auto px-5 md:px-[6vw]">

        {/* HEADING */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-24 md:mb-40 text-center"
        >
          <h2 className="text-4xl md:text-6xl max-sm:text-[30px] font-semibold leading-tight">
            how we build systems
          </h2>
        </motion.div>

        {/* TIMELINE */}
        <div className="relative">

          {/* LINE */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-white/25 shadow-[0_0_20px_rgba(255,255,255,0.25)] md:-translate-x-1/2" />

          <div className="flex flex-col gap-20 md:gap-28">
            {STEPS.map((step, i) => {
              const start = i * 0.12;
              const end = start + 0.25;

              const opacity = useTransform(scrollYProgress, [start, end], [0, 1]);
              const y = useTransform(scrollYProgress, [start, end], [60, 0]);
              const blur = useTransform(
                scrollYProgress,
                [start, end],
                ["blur(10px)", "blur(0px)"]
              );

              const floatY = [0, -6, 0]; // 🔥 floating animation

              return (
                <motion.div
                  key={i}
                  style={{ opacity, y, filter: blur }}
                  className={`
                    relative grid grid-cols-1 md:grid-cols-2
                    ${
                      step.side === "left"
                        ? "md:pr-16 md:text-right"
                        : "md:pl-16 md:text-left"
                    }
                  `}
                >

                  {/* DOT with Pulse */}
                  <motion.div
                    animate={{ scale: [1, 1.4, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute left-4 md:left-1/2 top-2 md:top-8 w-3 h-3 rounded-full bg-white shadow-[0_0_18px_rgba(255,255,255,0.9)] md:-translate-x-1/2"
                  />

                  {/* CARD */}
                  <motion.div
                    whileHover={{ scale: 1.05, rotate: 0.5 }}
                    animate={{ y: floatY }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: i * 0.3,
                    }}
                    className={`
                      relative ml-10 md:ml-0 w-[90%] md:w-auto max-w-md
                      rounded-xl px-6 md:px-8 py-6 md:py-7
                      bg-neutral-900 border border-white/10
                      shadow-[0_0_40px_rgba(255,255,255,0.15)]
                      hover:shadow-[0_0_80px_rgba(255,255,255,0.35)]
                      transition-all duration-300
                      ${
                        step.side === "left"
                          ? "md:col-start-1 md:ml-auto"
                          : "md:col-start-2 md:mr-auto"
                      }
                    `}
                  >
                    <h3 className="text-2xl md:text-3xl font-medium mb-3 md:mb-4">
                      {step.title}
                    </h3>
                    <p className="text-base md:text-lg text-white/70 leading-relaxed">
                      {step.desc}
                    </p>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}