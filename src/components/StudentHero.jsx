import React from "react";
import { motion } from "framer-motion";
import MagneticItem from "./MagneticItem";
import Button from "./Button";
import { BoxReveal } from "./magicui/box-reveal";
import { Link } from "react-router-dom";
import { FaArrowRight, FaHome } from "react-icons/fa";

const slideLeft = {
  hidden: { opacity: 0, x: -80 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      delay: 1,
      ease: "easeOut",
    },
  },
};

function StudentHero() {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
      className="w-full min-h-screen bg-surface px-[5vw] flex flex-col text-black 
      py-[12vw] sm:py-[8vw] lg:py-[6vw]"
    >
      
      {/* Breadcrumb */}
      <BoxReveal duration={0.2} boxColor="#155DFC">
        <div className="flex items-center gap-3 mb-4">
          <Link to="/">
            <FaHome className="text-[5vw] sm:text-[2vw] hover:text-text" />
          </Link>
          <FaArrowRight />
          <h1 className="text-[16px] sm:text-[18px] font-medium">
            Student Learning
          </h1>
        </div>

        {/* Heading Line 1 */}
        <h1 className="text-[9vw] sm:text-[5vw] lg:text-[3vw] leading-tight tracking-tight font-light">
          Empowering your{" "}
          <span className="text-text font-medium">
            learning
          </span>
        </h1>
      </BoxReveal>

      {/* Heading Line 2 */}
      <BoxReveal duration={0.4} boxColor="#155DFC">
        <h1 className="text-[13vw] sm:text-[8vw] lg:text-[7vw] leading-[1.1] tracking-tight font-light mt-2">
          with our{" "}
          <span className="text-text font-medium">
            best guidance.
          </span>
        </h1>
      </BoxReveal>

      {/* Tagline */}
      <BoxReveal duration={0.6} boxColor="#155DFC">
        <p className="text-[5.5vw] sm:text-[3vw] lg:text-[2.2vw] font-light leading-relaxed mt-6 max-w-4xl">
          We don’t just teach, we{" "}
          <MagneticItem>
            <span className="text-text font-medium">
              build strong foundations
            </span>
          </MagneticItem>{" "}
          and help students achieve{" "}
          <MagneticItem>
            <span className="text-text font-medium">
              real success
            </span>
          </MagneticItem>{" "}
          in their careers.
        </p>
      </BoxReveal>


    </motion.div>
  );
}

export default StudentHero;