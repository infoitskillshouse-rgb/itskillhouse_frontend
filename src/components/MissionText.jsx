import React, { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import "../style/MissionText.css";
import Button from "./Button";
import { FaArrowRight } from "react-icons/fa";

const MissionText = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "center center"],
  });

  // Detect mobile device
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    setIsMobile(window.innerWidth <= 768);
  }, []);

  // Framer Motion transforms (desktop only)
  const headingX = useTransform(scrollYProgress, [0, 1], [-60, 0]);
  const headingOpacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const paragraphX = useTransform(scrollYProgress, [0, 1], [80, 0]);
  const paragraphOpacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const buttonY = useTransform(scrollYProgress, [0, 1], [20, 0]);
  const buttonOpacity = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const paragraph = `At IT SKILLS, we’re a design-first, code-strong studio helping startups and growing brands turn bold ideas into powerful digital products — from standout websites and seamless UI/UX to SEO-optimized strategies — all crafted to deliver the best user experience and real business results. We blend creativity with clean, scalable code to build fast, responsive, and conversion-focused websites. Whether you're launching something new or leveling up your online presence.`;

  return (
    <section
      ref={sectionRef}
      className="w-full bg-surface md:py-[2vh] lg:py-[14vh] md:px-[5vw] lg:px-[6vw] flex flex-col gap-12 md:gap-16 lg:gap-20 lg:flex-row lg:items-start max-sm:px-[5vw] max-sm:pb-[8vh] max-sm:gap-7"
    >
      {/* Left: Section Title */}
      <motion.div
        className="flex items-center gap-3"
        {...(isMobile
          ? {
              initial: { opacity: 0, scale: 0.9 },
              animate: { opacity: 1, scale: 1 },
              transition: { duration: 0.9, delay: 0.2, ease: "easeOut" },
            }
          : { style: { x: headingX, opacity: headingOpacity } })}
      >
        <div className="w-1 h-6 bg-text" />
        <h2 className="text-[clamp(18px,2vw,28px)]  font-bold text-text tracking-wide uppercase max-sm:text-[6vw]">
          mission
        </h2>
      </motion.div>

      {/* Right: Content */}
      <div className="flex flex-col gap-2 max-w-4xl md:max-w-3xl lg:max-w-4xl">
        <motion.p
          className=" text-dark text-[clamp(15px,1.8vw,22px)] leading-[1.7] will-change-transform max-sm:text-[4.5vw] font-normal  "
          {...(isMobile
            ? {
                initial: { opacity: 0, y: 40 },
                animate: { opacity: 1, y: 0 },
                transition: { duration: 1, delay: 0.4, ease: "easeOut" },
              }
            : { style: { x: paragraphX, opacity: paragraphOpacity } })}
        >
          {paragraph}
        </motion.p>

        <motion.p
          className=" text-black text-[clamp(15px,1.8vw,22px)] leading-[1.7] will-change-transform max-sm:text-[4.5vw] font-normal   "
          {...(isMobile
            ? {
                initial: { opacity: 0, y: 30 },
                animate: { opacity: 1, y: 0 },
                transition: { duration: 0.9, delay: 0.6, ease: "easeOut" },
              }
            : { style: { x: paragraphX, opacity: paragraphOpacity } })}
        >
          we bring clarity, speed, and passion to every pixel.
        </motion.p>

        <motion.div
          className="pt-2"
          {...(isMobile
            ? {
                initial: { opacity: 0, y: 30 },
                animate: { opacity: 1, y: 0 },
                transition: { duration: 0.5, delay: 0.8, ease: "easeOut" },
              }
            : { style: { y: buttonY, opacity: buttonOpacity } })}
        >
          <Button
            size="lg"
            iconRight={<FaArrowRight />}
            className="w-fit text-[2.5vw] md:text-[2.2vw] max-sm:text-[5.5vw] max-sm:mb-[0]"
          >
            discover more
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default MissionText;
