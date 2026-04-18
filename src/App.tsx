import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import { useState, useEffect } from "react";
import { AdminProvider } from "./components/AdminProvider";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Branding from "./pages/Branding";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";
import AI from "./pages/AI";
import Admin from "./pages/Admin";

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      <AdminProvider>
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div 
              key="preloader"
              initial={{ opacity: 1 }}
              exit={{ 
                opacity: 0, 
                scale: 1.1,
                filter: "blur(20px)",
                transition: { duration: 0.8, ease: "easeInOut" } 
              }}
              className="fixed inset-0 z-[200] bg-[#000] flex items-center justify-center overflow-hidden"
            >
               <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="flex flex-col items-center gap-4"
              >
                <div className="text-5xl font-satoshi font-black tracking-tighter">
                  JUST <span className="text-white/20">YAVIZ</span>
                </div>
                <div className="w-12 h-[1px] bg-white/20 relative overflow-hidden">
                   <motion.div 
                    initial={{ x: "-100%" }}
                    animate={{ x: "100%" }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 bg-white"
                   />
                </div>
              </motion.div>
              
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-white/[0.02] blur-[100px] rounded-full" />
            </motion.div>
          ) : (
            <Layout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/old-home" element={<Home />} />
                <Route path="/branding" element={<Branding />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/ai" element={<AI />} />
                <Route path="/admin" element={<Admin />} />
              </Routes>
            </Layout>
          )}
        </AnimatePresence>
      </AdminProvider>
    </Router>
  );
}
