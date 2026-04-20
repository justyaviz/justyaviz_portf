import { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "motion/react";
import { useAppContext } from "../context/AppContext";

export default function CustomCursor() {
  const { theme } = useAppContext();
  const [isPointer, setIsPointer] = useState(false);
  
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 150 };
  const circleX = useSpring(mouseX, springConfig);
  const circleY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isClickable = 
        target.tagName === 'BUTTON' || 
        target.tagName === 'A' || 
        target.closest('button') || 
        target.closest('a') ||
        target.classList.contains('cursor-pointer');
      
      setIsPointer(!!isClickable);
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [mouseX, mouseY]);

  return (
    <>
      <motion.div
        className={`fixed top-0 left-0 w-10 h-10 rounded-full border border-accent pointer-events-none z-[9999] hidden md:block`}
        style={{
          x: circleX,
          y: circleY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isPointer ? 1.5 : 1,
          opacity: 0.5,
          borderWidth: isPointer ? "2px" : "1px",
        }}
      />
      <motion.div
        className={`fixed top-0 left-0 w-2 h-2 rounded-full bg-accent pointer-events-none z-[9999] hidden md:block shadow-[0_0_15px_rgba(var(--accent-rgb),0.5)]`}
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isPointer ? 0.5 : 1,
        }}
      />
    </>
  );
}
