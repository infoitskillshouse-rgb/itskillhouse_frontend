import { motion } from "framer-motion";

const FloatingItem = ({ children }) => {
  return (
    <motion.div
      animate={{
        x: [0, -5, 0, 5, 0], // Left → Center → Right → Center
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.div>
  );
};

export default FloatingItem;
