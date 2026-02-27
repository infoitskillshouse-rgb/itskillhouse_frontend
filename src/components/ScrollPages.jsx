// import React, { useRef } from "react";
// import { motion, useScroll, useTransform } from "framer-motion";

// const cards = [
//   {
//     title: "SEO Strategy",
//     description: "Crafting growth-driven SEO plans tailored to your brand.",
//     src: "https://source.unsplash.com/random/800x600?seo",
//     link: "#",
//     color: "#F9F9F9",
//   },
//   {
//     title: "Web Design",
//     description: "Clean, aesthetic and responsive UI/UX experiences.",
//     src: "https://source.unsplash.com/random/800x600?design",
//     link: "#",
//     color: "#F3F4F6",
//   },
//   {
//     title: "Meta Ads",
//     description: "Boost your sales through high-performing Meta campaigns.",
//     src: "https://source.unsplash.com/random/800x600?marketing",
//     link: "#",
//     color: "#E5E7EB",
//   },
//   {
//     title: "App Development",
//     description: "Robust, scalable and stunning mobile/web applications.",
//     src: "https://source.unsplash.com/random/800x600?app",
//     link: "#",
//     color: "#F1F5F9",
//   },
// ];

// export default function ScrollStack() {
//   const containerRef = useRef(null);

//   const { scrollYProgress } = useScroll({
//     target: containerRef,
//     offset: ["start end", "end start"],
//   });

//   const activeIndex = useTransform(scrollYProgress, [0, 1], [0, cards.length - 1]);

//   return (
//     <div
//       ref={containerRef}
//       className="relative min-h-[400vh] bg-white text-black px-4"
//     >
//       <div className="sticky top-0 h-screen flex items-center justify-center">
//         {cards.map((card, i) => (
//           <motion.div
//             key={i}
//             className="absolute flex flex-col items-center justify-center w-[90vw] max-w-2xl rounded-2xl p-8 shadow-2xl transition-all duration-700"
//             style={{
//               backgroundColor: card.color,
//               opacity: activeIndex.to((x) => (Math.round(x) === i ? 1 : 0)),
//               scale: activeIndex.to((x) => (Math.round(x) === i ? 1 : 0.95)),
//               y: activeIndex.to((x) => (Math.round(x) === i ? 0 : i * 40)),
//               zIndex: cards.length - i,
//             }}
//           >
//             <h2 className="text-3xl font-bold mb-4 text-center font-arboria">
//               {card.title}
//             </h2>
//             <p className="text-center text-lg mb-4 font-light font-arboria">
//               {card.description}
//             </p>
//             <motion.div className="overflow-hidden rounded-xl w-full max-w-md h-64">
//               <img
//                 src={card.src}
//                 alt={card.title}
//                 className="object-cover w-full h-full"
//               />
//             </motion.div>
//             <a
//               href={card.link}
//               target="_blank"
//               className="mt-6 inline-block bg-black text-white px-6 py-2 rounded-full hover:bg-gray-800 transition"
//             >
//               See More
//             </a>
//           </motion.div>
//         ))}
//       </div>
//     </div>
//   );
// }
