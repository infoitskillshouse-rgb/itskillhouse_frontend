import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const Preloader = () => {
  const [chars, setChars] = useState([]);
  const fullText = "IT SKILLS...";

  // Typing animation
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      const sliced = fullText.slice(0, index + 1);
      setChars(sliced.split(""));
      index++;
      if (index > fullText.length) clearInterval(interval);
    }, 55);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center text-white text-center px-4"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7, ease: "easeInOut" }}
    >
      {/* Glowing background blob */}
      <motion.div
        className="absolute w-[300px] h-[300px] bg-text/30 rounded-full blur-[100px]"
        initial={{ scale: 0.8 }}
        animate={{ scale: [1, 1.07, 1] }}
        transition={{
          repeat: Infinity,
          duration: 3.2,
          ease: "easeInOut",
        }}
      />

      {/* Typing animated text */}
      <div className="text-3xl md:text-5xl font-semibold tracking-wider font-[Caveat] z-10 flex flex-wrap justify-center">
        {chars.map((char, index) => (
          <motion.span
            key={index}
            className="inline-block"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.04, duration: 0.4, ease: "easeOut" }}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
};

export default Preloader;
