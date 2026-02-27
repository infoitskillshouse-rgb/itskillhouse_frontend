// MagneticItem.jsx
import React, { useRef } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";

const MagneticItem = ({ children }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const handleMouseMove = (e) => {
    const bounds = ref.current.getBoundingClientRect();
    const deltaX = e.clientX - (bounds.left + bounds.width / 2);
    const deltaY = e.clientY - (bounds.top + bounds.height / 2);
    x.set(deltaX * 0.3);
    y.set(deltaY * 0.3);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        x,
        y,
        display: "inline-block",
        transition: "all 0.3s ease",
      }}
    >
      {children}
    </motion.div>
  );
};

export default MagneticItem;
