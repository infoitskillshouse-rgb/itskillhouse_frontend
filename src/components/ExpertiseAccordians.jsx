import React, { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import AccordionComponent from "./AccordionComponent";

function ExpertiseAccordians() {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "center center"],
  });

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    setIsMobile(window.innerWidth <= 768);
  }, []);

  const headingX = useTransform(scrollYProgress, [0, 1], [-60, 0]);
  const headingOpacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const paragraphX = useTransform(scrollYProgress, [0, 1], [80, 0]);
  const paragraphOpacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const buttonY = useTransform(scrollYProgress, [0, 1], [20, 0]);
  const buttonOpacity = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const paragraph =
    "Over the years, IT SKILLS has established itself to serve as a trusted partner, delivering exceptional digital experiences and solutions tailored to meet the evolving needs of our clients.";

  return (
    <div className="w-full">
      {/* Section 1 */}
      <section
        ref={sectionRef}
        className="w-full  px-[5vw] py-[8vh] lg:py-[8vw] lg:px-[10vw] flex flex-col gap-8 lg:flex-row items-start"
      >
        {/* Left Heading */}
        <motion.div
          className="flex items-center gap-3 w-full lg:max-w-sm"
          {...(isMobile
            ? {
                initial: { opacity: 0, scale: 0.9 },
                animate: { opacity: 1, scale: 1 },
                transition: { duration: 0.9, delay: 0.2, ease: "easeOut" },
              }
            : { style: { x: headingX, opacity: headingOpacity } })}
        >
          <div className="w-1 h-6 bg-text" />
          <h2 className="text-[clamp(1.2rem,2vw,1.5rem)] font-bold text-text tracking-wide uppercase">
            how can we help you?
          </h2>
        </motion.div>

        {/* Right Content */}
        <div className="flex flex-col gap-4 w-full">
          <motion.p
            className="text-dark text-[clamp(1rem,1.8vw,22px)] leading-[1.7] font-normal"
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
        </div>
      </section>

      {/* Section 2: Accordions */}
      <section className="px-[5vw] py-[6vh] lg:py-[4vw] lg:px-[10vw] flex flex-col gap-10 lg:flex-row lg:items-start">
        {/* Left Title */}
        <div className="flex items-center items-center gap-3 w-full lg:max-w-sm">
          <div className="w-1 h-10 max-sm:h-8 bg-dark " />
          <h2 className="text-[clamp(1rem,1.5vw,1.5rem)] bg-dark   font-bold text-light tracking-wide uppercase rounded-3xl px-3 py-2">
            Our ways of working
          </h2>
        </div>

        {/* Right Accordions */}
        <div className="w-full max-w-[700px]">
          <AccordionComponent
            title="What is your return policy?"
            content="We accept returns within 30 days of purchase. Please contact support for more info."
          />
          <AccordionComponent
            title="How do I track my order?"
            content="After you place your order, you will receive an email with tracking information."
          />
          <AccordionComponent
            title="Is this reusable?"
            content="Yes! You can pass different titles and contents to reuse this component anywhere."
          />
        </div>
      </section>
    </div>
  );
}

export default ExpertiseAccordians;
