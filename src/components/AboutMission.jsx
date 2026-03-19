import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Button from "./Button";
import { FaArrowRight } from "react-icons/fa";

const AboutMission = () => {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 80%", "center center"],
  });

  // smoother & shorter motion (mobile friendly)
  const headingX = useTransform(scrollYProgress, [0, 1], [-40, 0]);
  const paragraphY = useTransform(scrollYProgress, [0, 1], [40, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [0, 1]);

  const paragraph = `With over 5+ years of hands-on experience, we're not just building
  products — we're shaping digital experiences that redefine what’s
  possible. From startups to scale-ups, we've partnered with brands to
  craft solutions that are fast, reliable and deeply human-centered.`;

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-20 md:py-28 px-5 md:px-[6vw] bg-gradient-to-b from-white via-slate-50 to-blue-50 overflow-hidden"
    >
      {/* Soft Background Glow */}
      <div className="absolute -top-20 left-1/4 w-72 md:w-96 h-72 md:h-96 bg-blue-300/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-64 md:w-80 h-64 md:h-80 bg-indigo-300/10 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 md:gap-16 items-center">

        {/* LEFT */}
        <motion.div
          style={{ x: headingX, opacity }}
          className="flex flex-col gap-5 md:gap-6"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 md:w-10 h-[2px] bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full" />
            <span className="uppercase tracking-widest text-xs md:text-sm text-slate-500">
              our mission
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight">
            Building products that{" "}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              inspire impact
            </span>
          </h2>
        </motion.div>

        {/* RIGHT */}
        <motion.div
          style={{ y: paragraphY, opacity }}
          className="bg-white/60 backdrop-blur-xl p-6 sm:p-8 md:p-10 rounded-2xl md:rounded-3xl border border-white/30 shadow-lg md:shadow-xl flex flex-col gap-4 md:gap-6"
        >
          <p className="text-slate-700 text-base md:text-lg leading-relaxed">
            {paragraph}
          </p>

          <p className="text-slate-800 font-medium text-base md:text-lg leading-relaxed">
            Our mission is simple: build with purpose, challenge the ordinary,
            and deliver experiences that truly matter.
          </p>

          <p className="text-slate-700 text-base md:text-lg">
            We don't just follow trends — we create them.
          </p>

          <div>
            <Button
              size="lg"
              iconRight={<FaArrowRight />}
              className="w-fit"
            >
              Discover More
            </Button>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default AboutMission;