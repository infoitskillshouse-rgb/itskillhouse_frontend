import React, { useRef, useState, useEffect } from 'react';
import {
  motion,
  useMotionValue,
  useTransform,
  useScroll,
  useInView,
  useSpring,
} from 'framer-motion';
import FloatingItem from './FloatingItem.jsx';
import MagneticItem from './MagneticItem.jsx';
import { Globe, Zap, Rocket, Timer } from 'lucide-react';

function ButWhy() {
  const containerRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e) => {
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    mouseX.set(x);
    mouseY.set(y);
  };

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const textOpacity = useTransform(scrollYProgress, [1, 0.3], [1, 1]);
  const textY = useTransform(scrollYProgress, [0.15, 0.3], [40, 0]);

const cardsData = [
  {
    title: "5+",
    subtitle: "Years of Creative Hustle",
    pos: "top-[5%] left-[4vw]",
    image: "https://images.unsplash.com/photo-1492724441997-5dc865305da7?q=80&w=1400",
    icon: Timer,
  },
  {
    title: "20+",
    subtitle: "Brands Empowered",
    pos: "top-[5%] right-[4vw]",
    image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1400",
    icon: Globe,
  },
  {
    title: "75+",
    subtitle: "Digital Projects",
    pos: "bottom-[5%] left-[4vw]",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1400",
    icon: Rocket,
  },
  {
    title: "8",
    subtitle: "Passionate Creators",
    pos: "bottom-[5%] right-[4vw]",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1400",
    icon: Zap,
  },
];

  const [hasAnimated, setHasAnimated] = useState(
    Array(cardsData.length).fill(false)
  );

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      aria-labelledby="but-why-heading"
      className="relative w-full min-h-[120vh] md:min-h-[100vh] lg:min-h-[140vh]
 bg-light overflow-hidden 
                 flex flex-col items-center justify-center 
                 px-4 sm:px-8 md:px-2 lg:px-[5vw] py-12 lg:py-[5vw]"
    >
      <div className="flex flex-col items-center w-full font-Arboria">
        <FloatingItem>
          <motion.div
            style={{ opacity: textOpacity, y: textY, willChange: 'transform, opacity' }}
            className="w-full max-w-[850px] mb-6 text-center px-2 sm:px-4"
          >
            <h1 id="but-why-heading" className="font-normal lg:text-[4vw] max-sm:text-[8.5vw] md:text-[5.5vw]">
              but, why <span className="text-text font-bold">IT SKILLS</span>?
            </h1>
            <p className="lg:text-[1.6vw] font-normal max-sm:text-[4.8vw] mt-6">
              Because we’re not just building websites — we’re building your trust.
              As a startup ourselves, we know the value of every client, every project, and every pixel.
            </p>
            <p className="lg:text-[1.6vw] font-normal max-sm:text-[4.8vw] mt-4">
              Every site we build is fast, responsive, SEO-ready, and tailored to your unique goals.
              Whether you’re just starting out or scaling up, we’re here to grow with you — with clarity, creativity, and code that performs.
            </p>
          </motion.div>
        </FloatingItem>

        {/* Mobile Cards */}
        <div className="block lg:hidden mt-8 space-y-6 w-full flex flex-col items-center">
          {cardsData.map((card, i) => {
            const ref = useRef(null);
            const isInView = useInView(ref, { once: true });

            return (
<motion.div
  key={i}
  ref={ref}
  initial={{ opacity: 0, y: 40 }}
  animate={isInView ? { opacity: 1, y: 0 } : {}}
  transition={{ delay: i * 0.12 }}
  className="relative w-full max-w-[350px] rounded-3xl overflow-hidden shadow-xl group"
>
  <img src={card.image} className="absolute inset-0 w-full h-full object-cover" />

  <div className="absolute inset-0 bg-black/60" />

  {/* ICON */}
<div className="absolute top-4 right-4 w-14 h-14 rounded-full 
  bg-black/40 backdrop-blur-md 
  flex items-center justify-center"
>
  <card.icon className="w-7 h-7 text-white" />
</div>

  <div className="relative z-10 p-6 text-white">
    <h3 className="text-3xl font-bold">{card.title}</h3>
    <p className="mt-2">{card.subtitle}</p>
  </div>
</motion.div>
            );
          })}
        </div>
      </div>

      {/* Desktop Cards */}
      <div className="hidden lg:block absolute inset-0 pointer-events-none">
        {cardsData.map((card, i) => {
          const start = 0.3 + i * 0.08;
          const end = start + 0.01;

          const rawScale = useTransform(scrollYProgress, [start, end], [0.85, 1]);
          const rawOpacity = useTransform(scrollYProgress, [start, end], [0, 1]);
          const rawY = useTransform(scrollYProgress, [start, end], [60, 0]);

          const scale = useSpring(rawScale, { stiffness: 70, damping: 24, mass: 1.1 });
          const opacity = useSpring(rawOpacity, { stiffness: 60, damping: 22 });
          const translateY = useSpring(rawY, { stiffness: 80, damping: 26 });

          const moveX = useTransform(mouseX, [0, 1], [-20, 20]);
          const moveY = useTransform(mouseY, [0, 1], [-12, 12]);

          useEffect(() => {
            const unsub = scrollYProgress.on('change', (v) => {
              if (v >= start && !hasAnimated[i]) {
                setHasAnimated((prev) => {
                  const updated = [...prev];
                  updated[i] = true;
                  return updated;
                });
              }
            });
            return () => unsub();
          }, [scrollYProgress, hasAnimated, i]);

          const finalStyle = hasAnimated[i]
            ? { scale: 1, opacity: 1, x: moveX, y: moveY }
            : { scale, opacity, x: moveX, y: translateY };

          return (
            <MagneticItem key={i}>
<motion.article
  style={finalStyle}
  className={`absolute ${card.pos} w-[300px] rounded-3xl overflow-hidden shadow-[0_10px_60px_rgba(0,0,0,0.4)] group`}
>
  {/* IMAGE */}
  <img
    src={card.image}
    alt=""
    className="absolute inset-0 w-full h-full object-cover scale-100 group-hover:scale-110 transition duration-700"
  />

  {/* 🔥 EXTRA DARK OVERLAY */}
  <div className="absolute inset-0 bg-gradient-to-b 
    from-black/40 
    via-black/65 
    to-black/75" 
  />

  {/* 🔥 SVG ICON (TOP RIGHT) */}
  <div className="absolute top-4 right-4 w-16 h-16 rounded-xl 
    bg-black/50 backdrop-blur-lg border border-white/10 
    flex items-center justify-center shadow-lg"
  >
    <card.icon className="w-10 h-10 text-white opacity-90" />
  </div>

  {/* CONTENT */}
  <div className="relative z-10 p-6 text-white flex flex-col justify-end h-full">
    
    <h3 className="text-[clamp(2.5rem,5vw,4.5rem)] font-black leading-none tracking-tight">
      {card.title}
    </h3>

    <p className="mt-2 text-sm opacity-80 tracking-wide">
      {card.subtitle}
    </p>
  </div>

  {/* 🔥 PREMIUM HOVER GLOW */}
  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500">
    <div className="w-full h-full bg-gradient-to-r 
      from-transparent via-white/5 to-transparent 
      translate-x-[-100%] group-hover:translate-x-[100%] 
      transition duration-1000" 
    />
  </div>
</motion.article>
            </MagneticItem>
          );
        })}
      </div>
    </section>
  );
}

export default ButWhy;
