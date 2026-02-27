
import { motion } from "framer-motion";
import {
  SiHtml5, SiCss3, SiJavascript, SiReact, SiTailwindcss,
  SiBootstrap, SiTypescript, SiNodedotjs, SiExpress, SiMongodb,
  SiMysql, SiPhp, SiPython, SiFirebase, SiWordpress,
  SiFigma, SiAdobephotoshop, SiGit, SiExpo, SiOpenjdk
} from "react-icons/si";

const techStack = [
  { name: "HTML5", icon: SiHtml5, color: "#fc683b" },
  { name: "CSS3", icon: SiCss3, color: "#64B5F6" },
  { name: "JavaScript", icon: SiJavascript, color: "#FFD54F" },
  { name: "React", icon: SiReact, color: "#80DEEA" },
  { name: "Java", icon: SiOpenjdk, color: "#FFB74D" },
  { name: "Expo", icon: SiExpo, color: "#E0E0E0" },
  { name: "Tailwind CSS", icon: SiTailwindcss, color: "#4FC3F7" },
  { name: "Bootstrap", icon: SiBootstrap, color: "#af87f8" },
  { name: "TypeScript", icon: SiTypescript, color: "#90CAF9" },
  { name: "Node.js", icon: SiNodedotjs, color: "#8af48e" },
  { name: "Express.js", icon: SiExpress, color: "#E0E0E0" },
  { name: "MongoDB", icon: SiMongodb, color: "#a6e361" },
  { name: "MySQL", icon: SiMysql, color: "#81D4FA" },
  { name: "PHP", icon: SiPhp, color: "#97a4ef" },
  { name: "Python", icon: SiPython, color: "#81A1F0" },
  { name: "Firebase", icon: SiFirebase, color: "#FFD54F" },
  { name: "WordPress", icon: SiWordpress, color: "#90CAF9" },
  { name: "Figma", icon: SiFigma, color: "#FF8A65" },
  { name: "Photoshop", icon: SiAdobephotoshop, color: "#64B5F6" },
  { name: "Git", icon: SiGit, color: "#f57777" },
];

// 🔹 Entrance stagger animation setup
const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.07, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 15 },
  },
};

export default function TechStack() {
  return (
    <section className="relative py-28 px-6 bg-gradient-to-b from-[#020617] to-[#0a0f1f] text-white">
      {/* 🌟 Section Header */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
        className="text-center mb-20"
      >
        <h2 className="text-5xl md:text-6xl max-sm:text-4xl font-semibold mb-4">
          Our{" "}
          <span className="bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 bg-clip-text text-transparent">
            Tech Stack
          </span>
        </h2>
        <p className="text-blue-200 text-lg md:text-xl max-w-2xl mx-auto">
          Technologies we master to craft seamless digital experiences.
        </p>
      </motion.div>

      {/* 🚀 Tech Grid with staggered entrance */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-10"
      >
        {techStack.map((tech) => {
          const Icon = tech.icon;
          return (
            <motion.div
              key={tech.name}
              variants={itemVariants}
              className="flex flex-col items-center justify-center p-8 rounded-2xl 
                         bg-white/[0.05] backdrop-blur-xl border border-white/10 
                         hover:border-blue-400/40 hover:bg-white/[0.08] 
                         transition-all duration-300 ease-out"
            >
              <Icon size={48} color={tech.color} className="mb-4 drop-shadow-md" />
              <p className="text-lg font-semibold text-blue-100 tracking-wide">
                {tech.name}
              </p>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
