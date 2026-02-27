import React from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";

const WhatsAppButton = ({ isHeaderOpen }) => {
  const location = useLocation();
  const isHome = location.pathname === "/";

  if (isHome || isHeaderOpen) return null;

  const phoneNumber = "9592838557";
  const message = "Hi, I came across your site and wanted to connect!";
  const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    message
  )}`;

  return (
    <motion.a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
 className="
  fixed
  bottom-6 right-[7%]
  max-md:bottom-[2%] max-md:left-[6%]
  max-md:right-8
  z-50
  w-14 h-14
  max-md:w-13 max-md:h-13
  rounded-full
  bg-green-500
  shadow-lg
  hover:shadow-xl
  flex items-center justify-center
  text-white text-2xl
  transition-all duration-300
"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <FaWhatsapp className="w-6 h-6" />
    </motion.a>
  );
};

export default WhatsAppButton;
