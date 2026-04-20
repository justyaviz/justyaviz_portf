import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useAppContext } from "../context/AppContext";
import { Logo } from "./Logo";

export default function Preloader() {
  const [complete, setComplete] = useState(false);
  const [percent, setPercent] = useState(0);
  const { theme } = useAppContext();

  useEffect(() => {
    const interval = setInterval(() => {
      setPercent((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setComplete(true), 1000);
          return 100;
        }
        return prev + Math.floor(Math.random() * 15) + 5;
      });
    }, 150);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {!complete && (
        <motion.div
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className={`fixed inset-0 z-[1000] flex flex-col items-center justify-center ${theme === 'dark' ? 'bg-[#050505]' : 'bg-[#fff]'}`}
        >
          <div className="flex flex-col items-center gap-12 w-full max-w-[200px]">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className={`w-20 h-20 flex items-center justify-center rounded-3xl ${theme === 'dark' ? 'bg-white text-black' : 'bg-black text-white'} shadow-2xl relative overflow-hidden`}
            >
              <Logo className="w-full h-full p-4 relative z-10" />
              <motion.div 
                className="absolute bottom-0 left-0 right-0 bg-accent transition-all duration-300" 
                style={{ height: `${percent}%`, opacity: 0.2 }}
              />
            </motion.div>

            <div className="w-full space-y-4">
               <div className="flex justify-between items-end">
                  <span className="text-[10px] font-black uppercase tracking-[0.4em] opacity-30">Loading</span>
                  <span className="text-2xl font-space-grotesk font-black text-accent">{Math.min(100, percent)}%</span>
               </div>
               <div className={`h-px w-full ${theme === 'dark' ? 'bg-white/10' : 'bg-black/10'} relative overflow-hidden`}>
                  <motion.div 
                    className="absolute inset-y-0 left-0 bg-accent shadow-[0_0_15px_rgba(var(--accent-rgb),0.5)]"
                    style={{ width: `${percent}%` }}
                  />
               </div>
            </div>

            <div className="text-center">
               <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40">Just.Yaviz Studio</p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
