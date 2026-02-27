import React from "react";
import { motion } from "framer-motion";
import FloatiingItem from './FloatingItem'


const Button = ({
  children,
  onClick,
  variant = "primary",
  size = "md",
  iconRight = null,
  className = "",
  type = "button",
  disabled = false,
}) => {
  const base =
    "inline-flex items-center justify-start font-light rounded-full transition-all duration-300 ";

  const sizes = {
    lg: "text-[2vw]",
  };

  const variants = {
    primary: "text-black",
  };

  return (
    <FloatiingItem>
    <motion.button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}
      whileTap={{ scale: 0.97 }}
      initial="initial"
      whileHover="hover"
    >
      <span className="flex items-center gap-1 group relative">
        {/* Button Text with Framer Motion Underline */}
        <span className="relative inline-block">
          <span>{children}</span>
          <motion.span
            className="absolute left-0 -bottom-1 h-[2px] w-full bg-black"
            variants={{
              initial: { scaleX: 1, backgroundColor: "#000000" },
              hover: { scaleX: 1, backgroundColor: "#155DFC" },
            }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 15,
              mass: 0.5,
            }}
            style={{ transformOrigin: "left", display: "block" }}
          />
        </span>

        {/* Animated Arrow/Icon on Hover */}
        {iconRight && (
          <motion.span
            variants={{
              initial: {
                rotate: -45,
                y: 4,
                x: -4,
                color: "#000000",
              },
              hover: {
                rotate: 0,
                y: 4,
                x: -4,
                color: "#155DFC",
              },
            }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
            className="text-black group-hover:text-[#155DFC] text-xl"
          >
            {iconRight}
          </motion.span>
        )}
      </span>
    </motion.button>
    </FloatiingItem>
  );
};

export default Button;
