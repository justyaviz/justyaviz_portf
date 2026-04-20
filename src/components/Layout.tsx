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
  Eye,
  Sun,
  Moon
} from "lucide-react";
import { useState, useEffect } from "react";
import React from "react";
import { useLocation, Link } from "react-router-dom";
import { useAdmin } from "./AdminProvider";
import { useAppContext } from "../context/AppContext";
import { auth } from "../firebase";
import { Logo } from "./Logo";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { isAdmin, isEditMode, setEditMode, user } = useAdmin();
  const { lang, setLang, theme, toggleTheme, t } = useAppContext();

  useEffect(() => {
    setMobileMenuOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  if (location.pathname === "/admin" || location.pathname === "/bio") {
    return (
      <div className={`min-h-screen transition-colors duration-300 font-sans selection:bg-accent/40 selection:text-white ${location.pathname === "/admin" ? "bg-[#f8fafc] text-slate-900" : ""}`}>
        {children}
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 font-sans selection:bg-accent/40 selection:text-white overflow-hidden ${theme === 'dark' ? 'bg-[#000] text-white' : 'bg-[#fff] text-[#0f172a]'}`}>
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
            <button onClick={() => auth.signOut()} className="hover:opacity-60 transition-opacity flex items-center gap-2 text-red-700">
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
      <nav className={`pill-nav transition-all ${isAdmin ? 'top-16' : 'top-6'}`}>
        <div className="flex items-center">
           <Link to="/" className="flex items-center gap-3 group pl-2">
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-40 hover:opacity-100 transition-opacity">just.yaviz</span>
           </Link>
        </div>

        <div className="hidden lg:flex items-center gap-8">
          {[
            { to: "/", label: t("nav.home") },
            { to: "/branding", label: t("nav.branding") },
            { to: "/projects", label: t("nav.projects") },
            { to: "/client-portal", label: t("nav.portal") },
            { to: "/blog", label: "Blog" },
            { to: "/contact", label: t("nav.contact") }
          ].map(link => (
            <Link 
              key={link.to}
              to={link.to} 
              className={`nav-link ${location.pathname === link.to ? theme === 'dark' ? 'text-white' : 'text-black font-bold' : ''}`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          {/* LANGUAGE SWITCHER */}
          <div className="flex items-center gap-1 p-1 bg-[var(--border-primary)] rounded-full">
            {[
              { code: 'uz', label: 'UZ' },
              { code: 'ru', label: 'RU' },
              { code: 'en', label: 'EN' }
            ].map(l => (
              <button
                key={l.code}
                onClick={() => setLang(l.code as any)}
                className={`relative px-3 py-1.5 rounded-full text-[10px] font-bold transition-all duration-300 ${lang === l.code ? 'text-[var(--bg-primary)] shadow-md' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'}`}
              >
                {lang === l.code && (
                  <motion.div 
                    layoutId="active-lang"
                    className="absolute inset-0 bg-[var(--text-primary)] rounded-full z-0"
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  />
                )}
                <span className="relative z-10 uppercase tracking-widest">{l.label}</span>
              </button>
            ))}
          </div>

          {/* THEME TOGGLE */}
          <button 
            onClick={toggleTheme}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-[var(--border-primary)] text-[var(--text-primary)] hover:scale-110 transition-transform"
          >
            {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
          </button>

          <Link 
            to="/contact"
            className="ui-btn-galaxy hidden sm:flex ml-2"
          >
             <div className="ui-btn-galaxy-inner px-4 py-1.5 text-[11px] uppercase tracking-widest">
                {t("nav.connect")}
             </div>
          </Link>

          <button className="lg:hidden ml-2 flex items-center justify-center w-8 h-8 rounded-full bg-[var(--text-primary)] text-[var(--bg-primary)]" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={14} /> : <Menu size={14} />}
          </button>
        </div>
      </nav>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`fixed inset-0 z-[90] ${theme === 'dark' ? 'bg-black/95' : 'bg-white/95'} backdrop-blur-2xl flex flex-col items-center justify-center gap-8 text-2xl font-display font-black`}
          >
            <Link to="/" onClick={() => setMobileMenuOpen(false)}>{t("nav.home")}</Link>
            <Link to="/branding" onClick={() => setMobileMenuOpen(false)}>{t("nav.branding")}</Link>
            <Link to="/projects" onClick={() => setMobileMenuOpen(false)}>{t("nav.projects")}</Link>
            <Link to="/blog" onClick={() => setMobileMenuOpen(false)}>Blog</Link>
            <Link to="/contact" onClick={() => setMobileMenuOpen(false)}>{t("nav.contact")}</Link>
            <Link to="/client-portal" onClick={() => setMobileMenuOpen(false)}>{t("nav.portal")}</Link>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="relative z-10 transition-colors duration-300">
        {children}
      </main>

      {/* FOOTER */}
      <footer className={`py-32 px-6 border-t border-[var(--border-primary)] relative overflow-hidden z-10 ${theme === 'dark' ? 'bg-[#000]' : 'bg-[#fff]'}`}>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-linear-to-r from-transparent via-white/20 to-transparent" />
        
        <div className="max-w-7xl mx-auto flex flex-col items-center gap-20">
          <div className="flex flex-col items-center gap-8">
            <div className={`w-16 h-16 flex items-center justify-center font-black rounded-2xl overflow-hidden relative rotate-[-5deg] hover:rotate-0 transition-transform cursor-pointer ${theme === 'dark' ? 'bg-white text-black' : 'bg-black text-white'}`}>
               <Logo className="w-full h-full relative z-10 p-2" />
               <div className="absolute inset-0 bg-linear-to-br from-white via-white to-accent opacity-20" />
            </div>
            <div className={`text-[35px] font-satoshi font-normal tracking-tighter ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
              just.yaviz
            </div>
          </div>

          <div className="flex gap-6">
            <a href="https://instagram.com/just_yaviz" className="ui-social-icon">
              <Instagram size={24} />
            </a>
            <a href="https://t.me/justyaviz_life" className="ui-social-icon">
              <Send size={24} />
            </a>
            <a href="https://github.com/justyaviz" className="ui-social-icon">
              <Github size={24} />
            </a>
            <a href="https://youtube.com/@just_yaviz" className="ui-social-icon">
              <Youtube size={24} />
            </a>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between w-full border-t border-[var(--border-primary)] pt-12 gap-6">
            <div className="text-[13px] font-cactus text-[var(--text-secondary)] font-normal uppercase tracking-[0.5em]">
              {t("footer.rights")}
            </div>
            <div className="flex gap-8 text-[14px] font-space-grotesk text-[var(--text-primary)] font-medium uppercase tracking-widest">
               <Link to="/client-portal" className="text-accent hover:text-[var(--text-primary)] transition-colors">{t("nav.portal")}</Link>
               <Link to="/admin" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">Admin</Link>
               <Link to="#" className="hover:text-accent transition-colors">{t("footer.privacy")}</Link>
               <Link to="#" className="hover:text-accent transition-colors">{t("footer.terms")}</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
