import { motion, AnimatePresence } from "motion/react";
import { 
  Instagram, 
  Send, 
  Github, 
  Youtube, 
  Menu, 
  X,
  ArrowRight,
  Settings,
  Edit3,
  LogOut,
  Eye
} from "lucide-react";
import { useState, useEffect } from "react";
import React from "react";
import { useLocation, Link } from "react-router-dom";
import { useAdmin } from "./AdminProvider";
import { logout } from "../lib/firebase";
import { Logo } from "./Logo";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { isAdmin, isEditMode, setEditMode, user } = useAdmin();

  useEffect(() => {
    setMobileMenuOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-[#000] text-white font-sans selection:bg-accent/40 selection:text-white overflow-hidden">
      {/* ADMIN BAR */}
      {isAdmin && (
        <div className="fixed top-0 left-0 right-0 h-12 bg-accent text-black z-[200] flex items-center justify-between px-6 font-space-grotesk text-[10px] font-bold uppercase tracking-widest shadow-[0_0_30px_rgba(var(--accent-rgb),0.3)]">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-black rounded-full animate-pulse" />
              <span>Admin: {user?.displayName || user?.email}</span>
            </div>
            <div className="h-4 w-px bg-black/20" />
            <button 
              onClick={() => setEditMode(!isEditMode)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full transition-all ${isEditMode ? 'bg-black text-white' : 'bg-black/5 hover:bg-black/10'}`}
            >
              {isEditMode ? <Eye size={12} /> : <Edit3 size={12} />}
              {isEditMode ? 'Ko\'rish rejimi' : 'Tahrirlash rejimi'}
            </button>
          </div>
          <div className="flex items-center gap-6">
            <Link to="/admin" className="hover:opacity-60 transition-opacity flex items-center gap-2">
              <Settings size={12} /> Dashboard
            </Link>
            <button onClick={logout} className="hover:opacity-60 transition-opacity flex items-center gap-2 text-red-700">
              <LogOut size={12} /> Chiqish
            </button>
          </div>
        </div>
      )}

      {/* BACKGROUND DECORATIONS */}
      <div className={`fixed inset-0 pointer-events-none overflow-hidden z-0 ${isAdmin ? 'mt-12' : ''}`}>
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-accent/10 blur-[150px] rounded-full" 
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.3, 1],
            x: [0, -60, 0],
            y: [0, -40, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] bg-accent-pink/10 blur-[150px] rounded-full" 
        />
      </div>

      {/* REFINED NAVBAR - FLOATING PILL */}
      <nav className={`pill-nav backdrop-blur-3xl bg-black/60 border-white/5 py-3 fixed left-1/2 -translate-x-1/2 z-[100] flex items-center justify-between px-10 rounded-full border transition-all ${isAdmin ? 'top-16 md:top-18' : 'top-6'}`}>
        <div className="flex items-center gap-3">
           <Link to="/" className="flex flex-row items-center gap-2">
              <div className="flex flex-col items-center justify-center -rotate-90">
                 <span className="text-[6px] font-black uppercase tracking-[0.3em] text-white/40">just.yaviz</span>
              </div>
              <div className="w-10 h-10 flex items-center justify-center font-black bg-white rounded-xl text-black overflow-hidden p-2">
                 <Logo className="w-full h-full" />
              </div>
           </Link>
        </div>

        <div className="hidden md:flex items-center gap-10 text-[11px] font-medium tracking-[0.05em] text-white/60">
          <Link to="/" className={`hover:text-white transition-colors ${location.pathname === '/' ? 'text-white' : ''}`}>Home</Link>
          <Link to="/branding" className={`hover:text-white transition-colors ${location.pathname === '/branding' ? 'text-white' : ''}`}>Brending</Link>
          <Link to="/projects" className={`hover:text-white transition-colors ${location.pathname === '/projects' ? 'text-white' : ''}`}>Loyihalar</Link>
          <Link to="/contact" className={`hover:text-white transition-colors ${location.pathname === '/contact' ? 'text-white' : ''}`}>Aloqa</Link>
        </div>

        <Link 
          to="/contact"
          className="neon-btn group scale-90"
        >
          <span>Hozir bog'lanish</span>
          <div className="absolute inset-0 bg-accent/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
        </Link>

        <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </nav>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-[90] bg-black/95 backdrop-blur-2xl flex flex-col items-center justify-center gap-8 text-2xl font-display font-black"
          >
            <Link to="/" onClick={() => setMobileMenuOpen(false)}>Home</Link>
            <Link to="/branding" onClick={() => setMobileMenuOpen(false)}>Brending</Link>
            <Link to="/projects" onClick={() => setMobileMenuOpen(false)}>Loyihalar</Link>
            <Link to="/contact" onClick={() => setMobileMenuOpen(false)}>Aloqa</Link>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="relative z-10">
        {children}
      </main>

      {/* FOOTER */}
      <footer className="py-32 px-6 border-t border-white/5 bg-[#000] relative overflow-hidden z-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-linear-to-r from-transparent via-white/20 to-transparent" />
        
        <div className="max-w-7xl mx-auto flex flex-col items-center gap-20">
          <div className="flex flex-col items-center gap-8">
            <div className="w-16 h-16 flex items-center justify-center font-black bg-white rounded-2xl text-black overflow-hidden relative rotate-[-5deg] hover:rotate-0 transition-transform cursor-pointer">
               <Logo className="w-full h-full relative z-10 p-3" />
               <div className="absolute inset-0 bg-linear-to-br from-white via-white to-accent opacity-20" />
            </div>
            <div className="text-[35px] font-satoshi font-normal tracking-tighter">
              just.yaviz
            </div>
          </div>

          <div className="flex gap-8 md:gap-16">
            <a href="https://instagram.com/just_yaviz" className="text-white/30 hover:text-white transition-all hover:scale-125">
              <Instagram size={24} />
            </a>
            <a href="https://t.me/justyaviz_life" className="text-white/30 hover:text-white transition-all hover:scale-125">
              <Send size={24} />
            </a>
            <a href="https://github.com/justyaviz" className="text-white/30 hover:text-white transition-all hover:scale-125">
              <Github size={24} />
            </a>
            <a href="https://youtube.com/@just_yaviz" className="text-white/30 hover:text-white transition-all hover:scale-125">
              <Youtube size={24} />
            </a>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between w-full border-t border-white/5 pt-12 gap-6">
            <div className="text-[13px] font-cactus text-white/40 font-normal uppercase tracking-[0.5em]">
              © 2026 just yaviz
            </div>
            <div className="flex gap-8 text-[14px] font-space-grotesk text-white font-medium uppercase tracking-widest">
               <Link to="/admin" className="text-white/20 hover:text-white transition-colors">Admin</Link>
               <Link to="#" className="hover:text-accent transition-colors">Privacy Policy</Link>
               <Link to="#" className="hover:text-accent transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
