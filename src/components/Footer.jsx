import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaFacebookF,
} from "react-icons/fa";

const links = [
  { name: "About", path: "/about" },
  { name: "Expertise", path: "/expertise" },
  { name: "Work", path: "/work" },
  { name: "Blog", path: "/blog" },
  { name: "Contact", path: "/contact" },
  { name: "Student Verification", path: "/student-result" },
];

const socials = [
  { Icon: FaFacebookF },
  { Icon: FaInstagram },
  { Icon: FaLinkedinIn },
  { Icon: FaTwitter },
];

export default function Footer() {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 90%", "end 10%"],
  });

  const glowOpacity = useTransform(scrollYProgress, [0, 1], [0.1, 0.25]);

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: (i = 0) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.6, ease: "easeOut" },
    }),
  };

  return (
    <motion.footer
      ref={ref}
      className="relative bg-dark text-light px-[6vw] pt-20 pb-14 overflow-hidden"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <div className="relative z-10 space-y-16">

        {/* DESKTOP GRID */}
        <div className="hidden md:grid grid-cols-3 gap-16">

          {/* LINKS */}
          <motion.div variants={fadeUp} custom={0} className="space-y-4">
            {links.map((l) => (
  <Link
    key={l.name}
    to={l.path}
    className="block text-lg text-light/80 hover:text-text transition"
  >
    {l.name}
  </Link>
))}
          </motion.div>

          {/* CONTACT */}
          <motion.div
            variants={fadeUp}
            custom={1}
            className="text-center space-y-3"
          >
            <p className="text-xl font-medium">contact@yourbrand.com</p>
            <p className="text-lg text-light/70">+91 9592838557</p>

            <div className="flex justify-center gap-5 pt-4">
              {socials.map(({ Icon }, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.1 }}
                  className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center"
                >
                  <Icon />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* ADDRESS */}
          <motion.div
            variants={fadeUp}
            custom={2}
            className="text-right text-light/70 text-lg leading-relaxed"
          >
            <p className="font-medium mb-2 text-light">Address</p>
            <p>IT Skills</p>
            <p>Taragarh</p>
            <p>Pathankot, Punjab – 143534</p>
            <p>India</p>
          </motion.div>
        </div>

        {/* MOBILE STRUCTURE */}
        <div className="md:hidden flex flex-col items-center text-center space-y-12">

          {/* LINKS */}
          <motion.div
            variants={fadeUp}
            custom={0}
            className="flex flex-col gap-4 text-lg"
          >
            {links.map((l) => (
  <Link
    key={l.name}
    to={l.path}
    className="text-light/80 hover:text-text transition"
  >
    {l.name}
  </Link>
))}
          </motion.div>

          {/* CONTACT */}
          <motion.div
            variants={fadeUp}
            custom={1}
            className="space-y-2"
          >
            <p className="text-xl font-medium">infoitskillshouse@gmail.com</p>
            <p className="text-lg text-light/70">+91 9592838557</p>
          </motion.div>

          {/* SOCIALS */}
          <motion.div
            variants={fadeUp}
            custom={2}
            className="flex justify-center gap-5"
          >
            {socials.map(({ Icon }, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.1 }}
                className="w-11 h-11 rounded-full border border-white/20 flex items-center justify-center"
              >
                <Icon />
              </motion.div>
            ))}
          </motion.div>

          {/* ADDRESS */}
          <motion.div
            variants={fadeUp}
            custom={3}
            className="text-light/70 text-base leading-relaxed"
          >
            <p className="font-medium mb-2 text-light">Address</p>
            <p>IT Skills</p>
            <p>Taragarh</p>
            <p>Pathankot, Punjab – 143534</p>
            <p>India</p>
          </motion.div>
        </div>

        {/* DIVIDER */}
        <div className="h-px bg-white/10" />

        {/* LEGAL */}
        <motion.div
          variants={fadeUp}
          custom={4}
          className="flex flex-col md:flex-row justify-between items-center text-light/50 text-sm gap-4"
        >
          <p>© {new Date().getFullYear()} YourBrand. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms & Conditions</a>
          </div>
        </motion.div>
      </div>

      {/* BACKGROUND TEXT */}
      <div className="absolute bottom-0 left-0 w-full text-center pointer-events-none select-none">
        <h1 className="text-[26vw] md:text-[20vw] font-black text-dark-50 opacity-20 leading-none">
          IT SKILLS
        </h1>
      </div>

      {/* GLOW */}
      <motion.div
        className="absolute inset-0 -z-10"
        style={{ opacity: glowOpacity }}
      >
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[85vw] h-[40vh] bg-gradient-to-t from-text/30 to-transparent rounded-full" />
      </motion.div>
    </motion.footer>
  );
}
