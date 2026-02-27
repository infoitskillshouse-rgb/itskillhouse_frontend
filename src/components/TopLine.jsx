// components/TopLine.js
import { motion, useScroll } from "framer-motion"

export default function TopLine() {
    const { scrollYProgress } = useScroll();

    return (
        <motion.div
            id="scroll-indicator"
            style={{
                scaleX: scrollYProgress,
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                height: 3,
                originX: 0,
                backgroundColor: "#155DFC",
                zIndex: 1000,
            }}
        />
    );
}
