/* eslint-disable react/no-unescaped-entities */
import { motion } from "framer-motion";

export default function AboutCTA() {
  const springTrans = { type: "spring", stiffness: 70, damping: 14 };
  const fadeTrans = { duration: 0.7, ease: "easeOut" };

  return (
    <section className="relative py-28 px-6  overflow-hidden bg-gradient-to-b from-blue-100 via-blue-50 to-white">
      {/* 💠 Glass Gradient Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ ...springTrans, duration: 0.8 }}
        viewport={{ once: true }}
        className="relative z-10 max-w-6xl max-sm:px-4 mx-auto flex flex-col md:flex-row items-center gap-12
                   rounded-3xl border border-white/20 py-14 px-10 md:px-14
                   bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800
                   shadow-[0_0_30px_rgba(37,99,235,0.35)]
                   backdrop-blur-md text-white"
      >
        {/* ✨ Left Content */}
        <motion.div
          initial={{ x: -40, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ ...fadeTrans, delay: 0.15 }}
          className="flex-1 text-center md:text-left"
        >
          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ ...fadeTrans, delay: 0.25 }}
            className="text-4xl md:text-5xl max-sm:text-[6.2vw] font-semibold leading-tight mb-6 drop-shadow-[0_3px_10px_rgba(0,0,0,0.3)]"
          >
            Ready to build something{" "}
            <span className="bg-gradient-to-r from-blue-400 to-blue-500 bg-clip-text text-transparent">
              amazing
            </span>{" "}
            together?
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ ...fadeTrans, delay: 0.3 }}
            className="text-lg text-blue-100/90 max-w-lg mx-auto md:mx-0 mb-8 leading-relaxed"
          >
            Let’s turn your ideas into reality with creativity, strategy, and technology that inspire.
          </motion.p>

          {/* 🟦 CTA Button */}
          {/* 🟦 CTA Button */}
<motion.button
  onClick={() =>
    window.open(`https://wa.me/919592838557?text=Hey 👋 I'm interested in working together on something creative. Can we talk?
%20`, "_blank")
  }
  whileHover={{
    scale: 1.05,
    boxShadow: "0 0 22px rgba(28, 69, 116, 0.4)",
  }}
  whileTap={{ scale: 0.97 }}
  transition={{ type: "spring", stiffness: 200, damping: 12 }}
  className="relative mt-4 bg-white/15 backdrop-blur-md border border-white/20 text-white font-semibold 
             py-3 px-10 rounded-full overflow-hidden transition-all duration-300 hover:bg-white/25"
>
  <span className="relative z-10">Let's Talk</span>
  <motion.div
    className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-600 opacity-0 rounded-full"
    whileHover={{ opacity: 1 }}
    transition={{ duration: 0.3, ease: "easeInOut" }}
  />
</motion.button>

        </motion.div>

        {/* 👨‍💻 SVG Developer Illustration */}
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ ...springTrans, duration: 0.9, delay: 0.25 }}
          className="flex-1 relative w-full h-[280px] md:h-[380px] flex justify-center items-center"
        >
          <motion.svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 500 500"
            className="w-[330px] md:w-[400px] drop-shadow-2xl"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          >
            <defs>
              <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#2563eb" />
              </linearGradient>
            </defs>

            {/* Soft Glow Background */}
            <motion.circle
              cx="250"
              cy="250"
              r="200"
              fill="url(#grad)"
              opacity="0.1"
              animate={{ opacity: [0.08, 0.2, 0.08] }}
              transition={{ duration: 6, repeat: Infinity }}
            />

            {/* Desk */}
            <rect x="100" y="340" width="300" height="10" rx="3" fill="#1e3a8a" opacity="0.7" />

            {/* Laptop */}
            <rect x="170" y="260" width="160" height="65" rx="8" fill="#1e3a8a" stroke="#60a5fa" strokeWidth="2" />
            <rect x="190" y="280" width="120" height="35" rx="4" fill="#0f172a" />
            <motion.rect
              x="190"
              y="280"
              width="120"
              height="35"
              rx="4"
              fill="#60a5fa"
              opacity="0.1"
              animate={{ opacity: [0.05, 0.25, 0.05] }}
              transition={{ duration: 4, repeat: Infinity }}
            />

            {/* Face */}
            <circle cx="250" cy="190" r="38" fill="#fde68a" />
            <circle cx="238" cy="185" r="4.5" fill="#111827" />
            <circle cx="262" cy="185" r="4.5" fill="#111827" />
            <path d="M238 200 Q250 215 262 200" stroke="#111827" strokeWidth="2" fill="none" />

            {/* Hair */}
            <path d="M210 170 Q250 130 290 170 Q270 135 230 135 Z" fill="#0f172a" />

            {/* Body */}
            <path d="M210 200 Q250 230 290 200 L310 280 Q260 290 190 280 Z" fill="#1e293b" />

            {/* Left Arm Typing */}
{/* ✋ Left Arm - Typing animation on desk */}
<motion.path
  d="M215 270 Q210 285 205 300 Q215 310 230 305 Q225 290 220 275 Z"
  fill="#475569"
  animate={{ rotate: [0, -6, 3, 0] }}
  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
  style={{ transformOrigin: "215px 270px" }}
/>
<circle cx="232" cy="305" r="6" fill="#fde68a" />

{/* 💪 Right Arm - Stable (relaxed) */}
<motion.g
  animate={{ rotate: [0, 5, -3, 0] }}
  transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
  style={{ transformOrigin: "290px 230px" }}
>
  <path
    d="M270 240 Q285 235 305 225 Q320 218 325 226 Q320 234 305 240 Q290 245 275 248 Z"
    fill="#475569"
  />
  <circle cx="327" cy="224" r="7" fill="#fde68a" />
</motion.g>

            {/* Floating particles */}
            <motion.circle
              cx="150"
              cy="150"
              r="3"
              fill="#93c5fd"
              animate={{ y: [0, -15, 0], opacity: [0.3, 0.8, 0.3] }}
              transition={{ duration: 4, repeat: Infinity }}
            />
            <motion.circle
              cx="350"
              cy="160"
              r="3"
              fill="#a5b4fc"
              animate={{ y: [0, -12, 0], opacity: [0.3, 0.8, 0.3] }}
              transition={{ duration: 3.5, repeat: Infinity }}
            />
          </motion.svg>
        </motion.div>
      </motion.div>

      {/* 🌫 Soft Glow Overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-t from-blue-300/20 to-transparent opacity-30"
        animate={{ opacity: [0.25, 0.4, 0.25] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
    </section>
  );
}
