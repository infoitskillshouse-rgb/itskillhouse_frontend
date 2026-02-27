// import React, { useEffect, useState } from "react";
// import { motion } from "framer-motion";

// const TrailGhosts = () => {
//   const [pos, setPos] = useState({ x: 0, y: 0 });

//   useEffect(() => {
//     const move = (e) => {
//       setPos({ x: e.clientX, y: e.clientY });
//     };
//     window.addEventListener("mousemove", move);
//     return () => window.removeEventListener("mousemove", move);
//   }, []);

//   return (
//     <>
//       {Array.from({ length: 5 }).map((_, i) => (
//         <motion.div
//           key={i}
//           animate={{
//             x: pos.x - 15,
//             y: pos.y - 15,
//           }}
//           transition={{
//             duration: 0.1 + i * 0.05,
//             ease: "easeOut",
//           }}
//           style={{
//             position: "fixed",
//             width: 30 - i * 5,
//             height: 30 - i * 5,
//             borderRadius: "50%",
//             backgroundColor: "yellow",
//             pointerEvents: "none",
//             mixBlendMode: "difference",
//             zIndex: 9998 - i,
//             opacity: 1 - i * 0.2,
//           }}
//         />
//       ))}
//     </>
//   );
// };

// export default TrailGhosts;
