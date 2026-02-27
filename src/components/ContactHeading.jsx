

import React from "react";
import { motion } from "framer-motion";
import MagneticItem from "./MagneticItem";
import FloatingItem from "./FloatingItem";
import Button from "./Button";

import { BoxReveal } from "./magicui/box-reveal";
import { Link } from "react-router-dom";
import { FaArrowRight,FaHome } from "react-icons/fa";


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

function ContactHeading() {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
      className="Herosection w-full h-screen bg-surface px-[5vw]  
        flex flex-col  text-black  lg:h-[100vh]
        max-sm:py-[15vw] md:py-[8vw] lg:py-[6vw]
        min-h-[50vh] max-sm:h-[45vh] md:min-h-screen"
    >
        <BoxReveal duration={0.2} boxColor="#155DFC">
      {/* Line 1 */}
      <div className="Home_div flex items-center justify-start gap-3">
       <Link to='/'><FaHome  className="lg:text-[3vw] max-sm:text-[6vw]hover:text-text"/></Link> 
       <FaArrowRight />
       <h1 className="text-[20px] font-medium ">Contact</h1>
      </div>
      <h1 className="text-[5vw] leading-[6.5vw] lg:font-light  max-sm:font-light tracking-tight max-sm:text-[10vw] max-sm:leading-[12vw]">
      ready to  <span className="text-text text-[5vw] font-medium inline-block max-sm:text-[10vw] max-sm:font-light">
                connect
              </span> 
        <MagneticItem>
        </MagneticItem>
       
      </h1>
 </BoxReveal>
      {/* Line 2 */}
      <BoxReveal duration={0.4} boxColor="#155DFC"> 
      <h1 className="text-[7.5vw] leading-[6.5vw] font-[300] tracking-tight max-sm:text-[15vw] max-sm:leading-[16vw]">
          with  {" "} 
          

            <span className="font-medium max-lg:text-[12vw] max-sm:font-normal text-text max-sm:text-[16vw]">
              us
            </span>
            
          
      </h1>
      </BoxReveal>

      {/* Tagline */}
      <BoxReveal  duration={0.6} boxColor="#155DFC">
      <p className="text-[2.3vw] max-sm:text-[6.5vw]  max-sm:font-normal leading-[1.4] mt-4">
       We’re here to answer your questions and discuss your 
        <MagneticItem>

         
          
            <span className="text-[2.3vw] font-medium max-sm:text-[6.5vw] max-sm:font-medium  text-text font-arboria font-light">
           project.</span>
          
        </MagneticItem>
      </p>
       </BoxReveal  >


    </motion.div>
  );
}

export default ContactHeading;
