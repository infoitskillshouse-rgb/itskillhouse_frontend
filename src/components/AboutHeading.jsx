import React from 'react';
import { motion } from 'framer-motion';
import MagneticItem from './MagneticItem';
import FloatingItem from './FloatingItem';
import Button from './Button';
import { FaArrowRight,FaHome } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (customDelay = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: customDelay,
      ease: 'easeOut',
    },
  }),
};

const slideLeft = {
  hidden: { opacity: 0, x: -80 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      delay: 2.5,
      ease: 'easeOut',
    },
  },
};

const zoomIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delay: 1,
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

function AboutHeading() {
  return (
<motion.div
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, amount: 0.4 }}
  className="Herosection w-full lg:h-screen bg-surface px-[5vw]  
    flex flex-col  text-black  
     max-sm:py-[15vw] md:py-[8vw] lg:py-[6vw]
    sm:min-h-[60vh] md:min-h-screen max-sm:pt-[5vh]"
>
      {/* Line 1 */}
       <div className="Home_div flex items-center justify-start gap-3">
       <Link to='/'><FaHome  className="lg:text-[3vw] max-sm:text-[6vw] hover:text-text"/></Link> 
       <FaArrowRight />
       <h1 className="text-[20px] font-medium ">About</h1>
      </div>
      <motion.h1
        className="text-[3.5vw] leading-[6.5vw] lg:font-light  max-sm:font-light tracking-tight max-sm:text-[12.1vw] max-sm:leading-[13vw]"
        variants={fadeInUp}
        custom={0.4}
      >
        we're <span className=" font-normal  ">here</span>, to{' '}
        <MagneticItem>
          <FloatingItem>
            <motion.span
              variants={fadeInUp}
              custom={0.7}
              className=" text-text text-[3.5vw] font-medium inline-block max-sm:text-[15.5vw] max-sm:font-light"
            >
              redfine
            </motion.span>
          </FloatingItem>
        </MagneticItem>
      </motion.h1>

      {/* Line 2 */}
      <motion.h1
        className="text-[7.5vw] leading-[6vw]  font-[300] tracking-tight max-sm:text-[21vw] max-sm:leading-[16vw]"
        variants={fadeInUp}
        custom={1}
      >
        what's {' '}
        <motion.span variants={zoomIn} className="inline-block">
          <MagneticItem>
            <span className="font-medium max-lg:text-[8vw] max-sm:font-normal text-text max-sm:text-[20vw]">possible.</span>
          </MagneticItem>
        </motion.span>
      </motion.h1>

      {/* Tagline */}
      <motion.p
        className="text-[2.8vw] max-sm:text-[6.5vw] font-light  max-sm:font-normal leading-[1.4] mt-4"
        variants={fadeInUp}
        custom={1.7}
      >
       if not to change the{' '}
        <MagneticItem>
          <span className="text-[2.8vw] max-sm:text-[6.5vw] text-text font-normal">
            game,
          </span>
            

        </MagneticItem>{' '}
       
   
        then what’s the{' '}
        <MagneticItem>
          <span className="text-[3vw] font-normal max-sm:text-[6.5vw] max-sm:font-medium  text-text font-arboria font-light">
             point?
          </span>
        </MagneticItem>
      </motion.p>

      {/* Button */}
      <motion.div variants={slideLeft} className="mt-2">
        <Button
          size="lg"
          iconRight={<FaArrowRight />}
          className="w-fit text-[2.8vw] max-sm:text-[6vw] "
        >
          for enquiry
        </Button>
      </motion.div>
    </motion.div>
  );
}

export default AboutHeading;
