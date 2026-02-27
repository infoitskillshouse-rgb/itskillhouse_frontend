import { motion, useAnimation, useInView } from "motion/react";
import { useEffect, useRef } from "react";

interface BoxRevealProps {
  children: JSX.Element;
  width?: "fit-content" | "100%";
  boxColor?: string;
  duration?: number;
  align?: "left" | "center" | "right";
}

export const BoxReveal = ({
  children,
  width = "fit-content",
  boxColor = "#5046e6",
  duration = 0.5,
  align = "left",
}: BoxRevealProps) => {
  const mainControls = useAnimation();
  const slideControls = useAnimation();

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      slideControls.start("visible");
      mainControls.start("visible");
    }
  }, [isInView, mainControls, slideControls]);

  const alignmentStyles = {
    left: { display: "flex", justifyContent: "flex-start" },
    center: { display: "flex", justifyContent: "center" },
    right: { display: "flex", justifyContent: "flex-end" },
  };

  return (
    <div
      ref={ref}
      style={{
        position: "relative",
        width,
        overflow: "hidden",
        ...alignmentStyles[align],
      }}
    >
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 60 },
          visible: { opacity: 1, y: 0 },
        }}
        initial="hidden"
        animate={mainControls}
        transition={{ duration, delay: 0.2 }}
      >
        {children}
      </motion.div>

      <motion.div
        variants={{
          hidden: { left: 0 },
          visible: { left: "100%" },
        }}
        initial="hidden"
        animate={slideControls}
        transition={{ duration, ease: "easeIn" }}
        style={{
          position: "absolute",
          top: 4,
          bottom: 4,
          left: 0,
          right: 0,
          zIndex: 20,
          background: boxColor,
        }}
      />
    </div>
  );
};
