// DeveloperSemiRealTypingGlass.jsx

import { motion, useReducedMotion } from "framer-motion";

export default function DeveloperSemiRealTypingGlass({ className = "" }) {
  const reduce = useReducedMotion();

  return (
    <div className={`w-full h-[320px] md:h-[420px] flex items-center justify-center ${className}`}>
      <svg viewBox="0 0 520 420" xmlns="http://www.w3.org/2000/svg" className="w-[340px] md:w-[420px]">
        <defs>
          <linearGradient id="glassG" x1="0" x2="1">
            <stop offset="0" stopColor="#e0f2fe" stopOpacity="0.06"/>
            <stop offset="1" stopColor="#bfdbfe" stopOpacity="0.03"/>
          </linearGradient>
        </defs>

        {/* subtle glass rectangle */}
        <rect x="30" y="30" width="460" height="360" rx="18" fill="url(#glassG)" stroke="#ffffff10" />

        {/* desk */}
        <rect x="80" y="330" width="360" height="12" rx="6" fill="#0f172a" opacity="0.6" />

        {/* laptop */}
        <rect x="200" y="240" width="120" height="64" rx="8" fill="#0b1220" stroke="#3b82f6" strokeWidth="1.2" />
        <rect x="210" y="256" width="100" height="36" rx="6" fill="#07102a" />

        {/* semi face */}
        <ellipse cx="260" cy="140" rx="30" ry="32" fill="#2f3b47" />
        <rect x="245" y="170" width="30" height="46" rx="6" fill="#263240" />

        {/* hair top */}
        <path d="M235 130 Q260 105 285 130 Q270 118 260 118 Q250 118 235 130 Z" fill="#0b1220" />

        {/* left hand - typing */}
        <motion.path
          d="M225 270 Q205 285 195 300 Q210 305 225 293 Z"
          fill="#475569"
          animate={reduce ? {} : { d: [
            "M225 270 Q205 285 195 300 Q210 305 225 293 Z", // pos A
            "M225 266 Q205 281 195 295 Q210 300 225 288 Z", // pos B slight up
            "M225 270 Q205 285 195 300 Q210 305 225 293 Z"  // back
          ]}}
          transition={{ duration: 0.9, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* right hand - typing alternate */}
        <motion.path
          d="M295 270 Q315 285 325 300 Q310 305 295 293 Z"
          fill="#475569"
          animate={reduce ? {} : { d: [
            "M295 270 Q315 285 325 300 Q310 305 295 293 Z",
            "M295 266 Q315 281 325 295 Q310 300 295 288 Z",
            "M295 270 Q315 285 325 300 Q310 305 295 293 Z"
          ]}}
          transition={{ duration: 0.9, repeat: Infinity, ease: "easeInOut", delay: 0.45 }}
        />

        {/* floating subtle glow from screen */}
        <motion.rect x="210" y="242" width="100" height="8" rx="2" fill="#60a5fa" opacity="0.12" animate={reduce ? {} : { opacity: [0.08,0.22,0.08] }} transition={{ duration: 3, repeat: Infinity }} />
      </svg>
    </div>
  );
}
