// AboutStory.jsx
import { motion } from "framer-motion";

export default function AboutStory() {
  return (
    <section className="relative bg-gradient-to-b from-gray-50 to-white py-24 px-6 md:px-12 overflow-hidden">
      {/* Decorative floating shapes */}
      <div className="absolute top-10 left-10 w-40 h-40 bg-blue-100/40 rounded-full blur-3xl animate-pulse pointer-events-none" />
      <div className="absolute bottom-10 right-16 w-60 h-60 bg-pink-100/30 rounded-full blur-3xl animate-pulse pointer-events-none" />

      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Left: Text */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.3 } },
          }}
        >
          <motion.h2
            className="text-5xl  font-bold mb-6 text-gray-900"
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
            }}
          >
            Who <span className="text-blue-500">We Are</span>
          </motion.h2>

          <motion.p
            className="text-gray-700 text-base md:text-lg leading-relaxed mb-6"
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
            }}
          >
            With over <span className="font-semibold text-blue-500">5+ years</span> of hands-on experience, we are a passionate team of <span className="font-semibold text-pink-500">tech enthusiasts, creatives, and problem-solvers</span> committed to delivering excellence. Our journey began with a mission: to transform ideas into <span className="underline decoration-blue-300">impactful digital experiences</span>. From startups to enterprise solutions, our team crafts with <span className="font-semibold text-blue-500">purpose and precision</span>.
          </motion.p>

          <motion.a
            href="#contact"
            className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-semibold px-8 py-3 rounded-lg shadow-lg transition-colors duration-300"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
            }}
          >
            Get in Touch
          </motion.a>
        </motion.div>

        {/* Right: Image */}
<div className="relative w-full h-96 grid grid-cols-2 gap-4">
  {[1,2,3,4].map((i) => (
    <motion.div
      key={i}
      className="rounded-xl overflow-hidden shadow-lg bg-white"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: i * 0.2 }}
      viewport={{ once: true }}
    >
      <img
        src={`https://picsum.photos/300/200?random=${i}`}
        alt={`Sample ${i}`}
        className="w-full h-full object-cover"
      />
    </motion.div>
  ))}
</div>


      </div>
    </section>
  );
}
