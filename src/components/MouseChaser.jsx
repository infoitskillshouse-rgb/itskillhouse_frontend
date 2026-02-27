import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';

const baseSize = 15;

const isTouchDevice = () =>
  typeof window !== 'undefined' &&
  ('ontouchstart' in window || navigator.maxTouchPoints > 0);

const MouseChaser = () => {
  const [text, setText] = useState('');
  const [enabled, setEnabled] = useState(true);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const scale = useMotionValue(1);

  const springX = useSpring(x, { stiffness: 150, damping: 20 });
  const springY = useSpring(y, { stiffness: 150, damping: 20 });
  const springScale = useSpring(scale, { stiffness: 200, damping: 15 });

  useEffect(() => {
    if (isTouchDevice()) {
      setEnabled(false);
      return;
    }

    const handleMouseMove = (e) => {
      x.set(e.clientX - baseSize / 2);
      y.set(e.clientY - baseSize / 2);
    };

    const handleHover = (e) => {
      const el = e.target.closest('[data-cursor-hover]');
      if (el) {
        const msg = el.dataset.cursorHoverText || 'Hello';
        scale.set(5);
        setText(msg);
      }
    };

    const handleLeave = (e) => {
      const el = e.target.closest('[data-cursor-hover]');
      if (el) {
        scale.set(1);
        setText('');
      }
    };

    const handleClick = (e) => {
      const el = document.elementFromPoint(e.clientX, e.clientY);
      if (el?.dataset?.cursorClick === 'wavy') {
        scale.set(3);
        setText(el.dataset.cursorHoverText || 'Hire Us');
        setTimeout(() => {
          scale.set(1);
          setText('');
        }, 1000);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleHover);
    window.addEventListener('mouseout', handleLeave);
    window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleHover);
      window.removeEventListener('mouseout', handleLeave);
      window.removeEventListener('click', handleClick);
    };
  }, []);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden="true"
      role="presentation"
      style={{
        x: springX,
        y: springY,
        scale: springScale,
        width: baseSize,
        height: baseSize,
      }}
      className="fixed top-0 left-0 z-[9999] opacity-80 rounded-full pointer-events-none bg-text flex items-center justify-center text-light   shadow-2xl  "
    >
      <AnimatePresence>
        {text && (
         <motion.span
  key="cursor-text"
  initial={{ opacity: 0, scale: 0.6 }}
  animate={{ opacity: 1, scale: 0.8 }}
  exit={{ opacity: 0, scale: 0.6 }}
  transition={{ duration: 0.3 }}
className=" text-center text-[3px] leading-none"
>
  {text}
</motion.span>


  
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default MouseChaser;
