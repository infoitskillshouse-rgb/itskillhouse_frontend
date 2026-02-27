import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const STATS = [
  { value: "150+", label: "brands scaled globally", x: 70 },
  { value: "40%", label: "conversion growth", x: 35 },
  { value: "5M+", label: "qualified leads", x: 0 },
  { value: "30M+", label: "monthly traffic", x: 35 },
  { value: "99.9%", label: "system uptime", x: 70 },
  { value: "100%", label: "on-time execution", x: 110 },
];

export default function ResultsSection() {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 85%", "start 20%"],
  });

  /* Left content */
  const titleY = useTransform(scrollYProgress, [0, 0.35], [60, 0]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.35], [0, 1]);
  const titleBlur = useTransform(
    scrollYProgress,
    [0, 0.35],
    ["blur(8px)", "blur(0px)"]
  );

  return (
    <section
      ref={ref}
      className="relative bg-black min-h-screen flex items-center overflow-hidden"
    >
      <div className="w-full px-[7vw] py-[8vw] grid md:grid-cols-2 gap-28 items-center">

        {/* LEFT — SILENT POWER */}
        <motion.div
          style={{
            y: titleY,
            opacity: titleOpacity,
            filter: titleBlur,
          }}
          className="space-y-10"
        >
          <h2 className="text-5xl md:text-6xl font-semibold leading-[1.02] text-white">
            results that
            <br />
            move
            <br />
            markets
          </h2>

          <p className="max-w-md text-lg text-white/65">
            Performance-driven systems built for scale, precision,
            and long-term dominance.
          </p>
        </motion.div>

        {/* RIGHT — C TYPE / EXECUTIVE DATA */}
        <div className="relative flex flex-col gap-14">
          {STATS.map((stat, i) => {
            const start = 0.15 + i * 0.1;
            const end = start + 0.35;

            const opacity = useTransform(
              scrollYProgress,
              [start, end],
              [0, 1]
            );

            const y = useTransform(
              scrollYProgress,
              [start, end],
              [24, 0]
            );

            const blur = useTransform(
              scrollYProgress,
              [start, end],
              ["blur(6px)", "blur(0px)"]
            );

            return (
              <motion.div
                key={i}
                style={{
                  opacity,
                  y,
                  filter: blur,
                  transform: `translateX(${stat.x}px)`,
                }}
                className="flex items-baseline gap-8 will-change-transform"
              >
                <span className="text-4xl md:text-5xl font-semibold text-white tracking-tight">
                  {stat.value}
                </span>

                <span className="text-sm md:text-base text-white/60 max-w-xs leading-snug">
                  {stat.label}
                </span>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
