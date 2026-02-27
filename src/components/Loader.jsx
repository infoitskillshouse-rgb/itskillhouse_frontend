

import React from 'react';
import {motion}  from 'framer-motion';

const spinTransition = {
  loop: Infinity,
  ease: "linear",
  duration: 1,
};

const Loader = ({ text = "Loading..." }) => {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="flex flex-col items-center space-y-4">
        <motion.div
          className="w-16 h-16 border-4 border-t-transparent border-white rounded-full"
          animate={{ rotate: 360 }}
          transition={spinTransition}
        />
        <motion.p
          className="text-white text-lg font-medium tracking-wider"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {text}
        </motion.p>
      </div>
    </motion.div>
  );
};

export default Loader;
