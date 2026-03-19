

import React from "react";
import { motion } from "framer-motion";
import MagneticItem from "./MagneticItem";
import FloatingItem from "./FloatingItem";
import Button from "./Button";
import { BoxReveal } from "./magicui/box-reveal";
import { FaArrowRight, FaHome } from 'react-icons/fa';
import { Link } from 'react-router-dom';

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

function CarresHeading() {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
      className="Herosection w-full  bg-surface px-[5vw]  
        flex flex-col  text-black  lg:h-[100vh]
        max-sm:py-[15vw] md:py-[8vw] lg:py-[6vw]
        min-h-[50vh] sm:min-h-[60vh] md:min-h-screen max-sm:pt-[5vh] "
    >
      <BoxReveal duration={0.2} boxColor="#155DFC">
        {/* Line 1 */}
        <div className="Home_div flex items-center justify-start gap-3">
          <Link to='/'><FaHome className="lg:text-[3vw] max-sm:text-[8vw] hover:text-text" /></Link>
          <FaArrowRight />
          <h1 className="text-[20px] font-medium ">Services</h1>
        </div>
        <h1 className="text-[3vw] leading-[7vw] lg:font-light  max-sm:font-light tracking-tight max-sm:text-[8vw] max-sm:leading-[12vw]">
          your  <span className="font-normal ">future </span> <span className="text-text text-[3.1vw] font-medium inline-block max-sm:text-[9vw] max-sm:font-light">
            deserve
          </span> more than a{" "}
          <MagneticItem>
            <FloatingItem>

              <span className="text-text text-[3.1vw] font-medium inline-block max-sm:text-[9vw] max-sm:font-light">
                job
              </span>

            </FloatingItem>
          </MagneticItem>

        </h1>
      </BoxReveal>
      {/* Line 2 */}
      <BoxReveal duration={0.4} boxColor="#155DFC">
        <h1 className="text-[7.5vw] leading-[7vw] font-[300] tracking-tight max-sm:text-[13vw] max-sm:leading-[16vw]">
          it deserves a {" "}


          <span className="font-medium max-lg:text-[12vw] max-sm:font-normal text-text max-sm:text-[17vw]">
            purpose.
          </span>


        </h1>
      </BoxReveal>

      {/* Tagline */}
      <BoxReveal duration={0.6} boxColor="#155DFC">
        <p className="text-[3vw] max-sm:text-[5.2vw] font-light  max-sm:font-normal leading-[1.4] mt-4">
          We see every team member as a{" "}
          <MagneticItem>

            <span className="text-[3vw] max-sm:text-[5.2vw] text-text font-normal">
              partner,
            </span> 
          </MagneticItem>{" "}
          <br className="max-sm:hidden"/>
         
          not just a{" "}
          <MagneticItem>

            <span className="text-[3vw] font-normal max-sm:text-[5.2vw] max-sm:font-medium  text-text font-arboria font-light">
              worker.
            </span>

          </MagneticItem>
        </p>
      </BoxReveal  >

      {/* Button */}
      <motion.div variants={slideLeft} className="mt-2">
        <Button
          size="lg"
          iconRight={<FaArrowRight />}
          className="w-fit text-[2.8vw] max-sm:text-[6vw]"
        >
          for enquiry
        </Button>
      </motion.div>
    </motion.div>
  );
}

export default CarresHeading;
