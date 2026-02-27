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

/* RANDOM AMBIENT GLOWS */
const AMBIENT_GLOWS = [
  { top: "15%", left: "20%", size: 320 },
  { top: "35%", right: "10%", size: 260 },
  { top: "55%", left: "30%", size: 380 },
  { top: "75%", right: "25%", size: 300 },
  { top: "90%", left: "50%", size: 240 },
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
  {/* AMBIENT GLOWS */}


  <div className="relative max-w-6xl mx-auto px-5 md:px-[6vw]">

    {/* HEADING */}
    <div className="mb-24 md:mb-40 text-center">
      <h2 className="text-4xl md:text-6xl  max-sm:text-[30px] font-semibold leading-tight">
        how we build
        systems
      </h2>
    </div>

    {/* TIMELINE */}
    <div className="relative">

      {/* GLOWING SPINE – ALL SIZES */}
      <div
        className="
          absolute
          left-4 md:left-1/2
          top-0 bottom-0
          w-px
          bg-white/25
          shadow-[0_0_20px_rgba(255,255,255,0.25)]
          md:-translate-x-1/2
        "
      />

      <div className="flex flex-col gap-20 md:gap-28">
        {STEPS.map((step, i) => {
          const start = i * 0.12;
          const end = start + 0.25;

          const opacity = useTransform(scrollYProgress, [start, end], [0, 1]);
          const y = useTransform(scrollYProgress, [start, end], [24, 0]);
          const blur = useTransform(
            scrollYProgress,
            [start, end],
            ["blur(6px)", "blur(0px)"]
          );

          return (
            <motion.div
              key={i}
              style={{ opacity, y, filter: blur }}
              className={`
                relative
                grid
                grid-cols-1 md:grid-cols-2
                ${
                  step.side === "left"
                    ? "md:pr-16 md:text-right"
                    : "md:pl-16 md:text-left"
                }
              `}
            >
              {/* DOT */}
              <div
                className="
                  absolute
                  left-4 md:left-1/2
                  top-2 md:top-8
                  w-2.5 h-2.5 md:w-3 md:h-3
                  rounded-full
                  bg-white
                  shadow-[0_0_14px_rgba(255,255,255,0.9)]
                  md:-translate-x-1/2
                "
              />

              {/* GLASS CARD */}
<motion.div
  whileHover={{ scale: 1.04 }}
  transition={{ type: "spring", stiffness: 200, damping: 15 }}
  className={`
    relative
    ml-10 md:ml-0
    w-[90%] md:w-auto
    max-w-md
    rounded-xl
    px-6 md:px-8
    py-6 md:py-7
    bg-neutral-900
    border border-white/10
    shadow-[0_0_40px_rgba(255,255,255,0.15)]
    hover:shadow-[0_0_70px_rgba(255,255,255,0.35)]
    transition-shadow duration-300
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
