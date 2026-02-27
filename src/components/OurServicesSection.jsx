import React, { useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import ui_ux from '../assets/Services/ui_ux.webp';
import web_dev from '../assets/Services/web_dev.webp';
import branding from '../assets/Services/branding.webp';
import seo_optimization from '../assets/Services/seo_optimization.webp';
import digital_marketing from '../assets/Services/digital_marketing.webp';

const services = [
  {
    title: "WEB DEVELOPMENT",
    desc: "We build high-performance, responsive, and scalable websites that convert visitors into customers. Every project is crafted with SEO best practices and modern tech stack.",
    tag: "& BEST SELLER WEB SOLUTIONS",
    image:web_dev,
  },
  {
    title: "UI / UX DESIGN",
    desc: "Our UI/UX design ensures a seamless and addictive user experience. Clean interfaces, intuitive navigation, and interactive elements keep users engaged.",
    image: ui_ux,
  },
  {
    title: "SEO OPTIMIZATION",
    desc: "Dominate search results organically with our SEO strategies. We improve site structure, content, and performance to rank higher on Google and attract more traffic.",
    image: seo_optimization,
  },
  {
    title: "DIGITAL MARKETING",
    desc: "From paid ads to organic growth, our marketing strategies help you acquire leads, grow your audience, and scale your business effectively.",
    image: digital_marketing,
  },
  {
    title: "BRANDING",
    desc: "We create visually stunning brand identities. Logos, color schemes, and visual guidelines that make your brand memorable and consistent across platforms.",
    tag: "& BEST SELLER BRAND STRATEGY",
    image: branding,
  },
];

export default function ServicesEditorial() {
  const ref = useRef(null);
  const [active, setActive] = useState(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.15], [0, 1]);

  return (
    <section
      ref={ref}
      className="bg-dark text-light px-[6vw] py-32 relative overflow-hidden"
    >
      {/* BACKGROUND TEXT */}
      <div className="absolute w-full inset-0 pointer-events-none select-none">
        <h1 className="text-7xl text-center w-full font-black text-white-50 font-semibold leading-none">
          SERVICES
        </h1>
      </div>

      <div className="relative z-10 flex flex-col lg:flex-row gap-20 max-w-7xl mx-auto">
        {/* LIST */}
        <motion.div style={{ opacity }} className="flex-1 max-w-3xl">
          {services.map((service, i) => {
            const isOpen = active === i;

            return (
              <motion.div
                key={service.title}
                onClick={() => setActive(isOpen ? null : i)} // toggle on click
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                viewport={{ once: true }}
                className="border-t border-white/20 py-4 cursor-pointer group relative"
              >
                <div className="flex justify-between items-start gap-6">
                  <div>
                    <span className="text-sm text-white/40">(0{i + 1})</span>
                    <h3 className="text-3xl font-medium tracking-wide mt-2 group-hover:text-text transition">
                      {service.title}
                    </h3>
                  </div>

                  {service.tag && (
                    <span className="hidden md:block text-xs text-white/40 uppercase tracking-widest">
                      {service.tag}
                    </span>
                  )}
                </div>

                {/* ✅ Mobile dropdown description */}
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      key="desc"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                      className="overflow-hidden mt-3 text-white/70 text-base leading-relaxed"
                    >
                      {service.desc}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}

          <div className="border-t border-white/20" />
        </motion.div>

        {/* IMAGE PREVIEW (DESKTOP ONLY) */}
        <div className="relative w-[450px] hidden lg:block">
          <AnimatePresence mode="wait">
            {active !== null && (
              <motion.img
                loading="lazy"
                key={services[active].image}
                src={services[active].image}
                alt={services[active].title}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                transition={{ duration: 0.3, ease: [0.3, 0, 0.2, 1] }}
                className="absolute top-1/1 w-full h-[480px] object-cover shadow-2xl"
              />
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}