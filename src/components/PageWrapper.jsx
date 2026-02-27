// components/PageWrapper.jsx
import { motion } from "framer-motion";
import React from "react";

const PageWrapper = ({ children }) => {
  return (
    <motion.div
      className="min-h-screen"
      initial={{ opacity: 0, y: 50, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -30, scale: 0.97 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
};

export default PageWrapper;
