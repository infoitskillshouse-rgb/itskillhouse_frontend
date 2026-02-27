// components/BlobTransition.jsx
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const transitionVariants = {
  initial: {
    y: '100%',
    scaleY: 0,
    opacity: 0,
    borderRadius: '0%',
    transformOrigin: 'bottom center',
  },
  animate: {
    y: '0%',
    scaleY: 1,
    opacity: 1,
    borderRadius: '0%',
    transition: { duration: 0.6, ease: 'easeInOut' },
  },
  exit: {
    y: '100%',
    scaleY: 0,
    opacity: 0,
    borderRadius: '0%',
    transition: { duration: 0.5, ease: 'easeInOut' },
  },
};

export default function BlobTransition({ isVisible }) {
  const [show, setShow] = useState(isVisible);

  useEffect(() => {
    if (isVisible) setShow(true);
  }, [isVisible]);

  return show ? (
    <motion.div
      className="fixed inset-0 z-[9999] origin-bottom"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={transitionVariants}
      onAnimationComplete={() => {
        if (!isVisible) setShow(false);
      }}
    >
      {/* Glow Effect */}
      <div className="absolute inset-0 bg-text blur-[100px] opacity-30 pointer-events-none" />
    </motion.div>
  ) : null;
}
