import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowLeft, Ban } from "lucide-react";
import { useAppContext } from "../context/AppContext";

export default function NotFound() {
  const { theme } = useAppContext();

  return (
    <div className={`min-h-[80vh] flex flex-col items-center justify-center px-6 relative overflow-hidden ${theme === 'dark' ? 'bg-[#000]' : 'bg-[#fff]'}`}>
      
      {/* Background Orbs */}
      <motion.div 
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-accent/20 blur-[100px] rounded-full z-0 pointer-events-none"
      />

      <div className="relative z-10 flex flex-col items-center text-center space-y-8">
        
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8 }}
           className="relative"
        >
          <div className="text-[120px] md:text-[200px] font-satoshi font-black leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-[var(--text-primary)] to-[var(--bg-primary)] opacity-80">
            404
          </div>
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-accent opacity-50"
          >
            <Ban size={100} />
          </motion.div>
        </motion.div>

        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8, delay: 0.2 }}
           className="space-y-4 max-w-md"
        >
          <h2 className="text-3xl md:text-4xl font-satoshi font-bold text-[var(--text-primary)] tracking-tight">
            Oops! Sahifa topilmadi
          </h2>
          <p className="text-[var(--text-secondary)] font-dm-sans text-lg">
            Siz qidirayotgan manzil o'zgartirilgan, o'chirilgan yoki umuman mavjud bo'lmagan bo'lishi mumkin.
          </p>
        </motion.div>

        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Link to="/" className="group flex items-center gap-3 px-8 py-4 bg-[var(--text-primary)] text-[var(--bg-primary)] rounded-full font-bold uppercase tracking-widest text-[13px] hover:scale-105 transition-transform">
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Bosh sahifaga qaytish
          </Link>
        </motion.div>
      </div>

    </div>
  );
}
