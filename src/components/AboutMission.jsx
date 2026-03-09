import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Button from "./Button";
import { FaArrowRight } from "react-icons/fa";

const AboutMission = () => {

  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "center center"],
  });

  const headingX = useTransform(scrollYProgress, [0, 1], [-80, 0]);
  const paragraphY = useTransform(scrollYProgress, [0, 1], [60, 0]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const paragraph = `With over 5+ years of hands-on experience, we're not just building
  products — we're shaping digital experiences that redefine what’s
  possible. From startups to scale-ups, we've partnered with brands to
  craft solutions that are fast, reliable and deeply human-centered.`;

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-28 px-6 lg:px-[8vw] bg-gradient-to-b from-white via-slate-50 to-blue-50 overflow-hidden"
    >

      {/* Background glow */}
      <div className="absolute -top-20 left-1/4 w-96 h-96 bg-blue-300/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-indigo-300/20 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-start">

        {/* LEFT SIDE */}

        <motion.div
          style={{ x: headingX, opacity }}
          className="flex flex-col gap-6"
        >

          <div className="flex items-center gap-3">
            <div className="w-10 h-[3px] bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"/>
            <span className="uppercase tracking-widest text-sm text-slate-500">
              our mission
            </span>
          </div>

          <h2 className="text-5xl md:text-6xl font-semibold leading-tight">

            Building products that{" "}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              inspire impact
            </span>

          </h2>

        </motion.div>

        {/* RIGHT SIDE */}

        <motion.div
          style={{ y: paragraphY, opacity }}
          className="bg-white/70 backdrop-blur-xl p-10 rounded-3xl border border-white/40 shadow-xl flex flex-col gap-6"
        >

          <p className="text-slate-700 text-lg leading-relaxed">
            {paragraph}
          </p>

          <p className="text-slate-800 font-medium text-lg leading-relaxed">
            Our mission is simple: build with purpose, challenge the ordinary,
            and deliver experiences that truly matter.
          </p>

          <p className="text-slate-700 text-lg">
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