import React from 'react';
import { motion } from 'framer-motion';
import MagneticItem from './MagneticItem';
import FloatingItem from './FloatingItem';
import Button from './Button';
import { FaArrowRight } from 'react-icons/fa';

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
      delay: 1.2,
      duration: 0.6,
      ease: 'easeOut',
    },
  },
};

function HomeText() {
  return (
<motion.div
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, amount: 0.4 }}
  className="Herosection w-full bg-surface px-[5vw]  
    flex flex-col text-black  lg:h-[90vh] 
     max-sm:py-[15vw] md:py-[8vw] lg:py-[3vw]
    min-h-[50vh] sm:min-h-[60vh] md:min-h-screen max-sm:pt-[5vh] md:min-h-[25vh]"
>
      {/* Line 1 */}
      
      <motion.h1
        className="text-[5.5vw] md:text-[7vw] leading-[7vw] md:leading-[8vw]
 lg:font-light  max-sm:font-light tracking-tight max-sm:text-[12.1vw] max-sm:leading-[13vw]"
        variants={fadeInUp}
        custom={0.4}
      >
        your <span className=" font-normal  ">vision</span>, your{' '}
        <MagneticItem>
          <FloatingItem>
            <motion.span
              variants={fadeInUp}
              custom={0.7}
              className=" text-text text-[6.5vw] font-medium inline-block max-sm:text-[15.5vw] max-sm:font-light"
            >
              growth
            </motion.span>
          </FloatingItem>
        </MagneticItem>
      </motion.h1>

      {/* Line 2 */}
      <motion.h1
        className="text-[10vw] md:text-[12vw] leading-[7vw] md:leading-[9vw]
  font-[200] tracking-tight max-sm:text-[21vw] max-sm:leading-[16vw]"
        variants={fadeInUp}
        custom={1}
      >
        our{' '}
        <motion.span variants={zoomIn} className="inline-block">
          <MagneticItem>
            <span className="font-medium max-lg:text-[12vw] max-sm:font-normal text-text max-sm:text-[20vw]">code</span>
          </MagneticItem>
        </motion.span>
      </motion.h1>

      {/* Tagline */}
      <motion.p
        className="text-[3.3vw] max-sm:text-[6.1vw] font-light  max-sm:font-normal leading-[1.4] mt-4"
        variants={fadeInUp}
        custom={1.7}
      >
        Building{' '}
        <MagneticItem>
          <span className="text-[4vw] max-sm:text-[5.6vw] text-text font-normal">
            Digital
          </span>
        </MagneticItem>{' '}
        Foundations for the
        Next{' '}
        <MagneticItem>
          <span className="text-[4vw] font-normal max-sm:text-[7vw] max-sm:font-medium  text-text font-arboria font-light">
            Generation.
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

export default HomeText;
