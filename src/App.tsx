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
              exit={{ opacity: 0, transition: { duration: 0.5 } }}
              className="fixed inset-0 z-[200] bg-[#000] flex items-center justify-center"
            >
               <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-2xl font-display font-black tracking-tighter"
              >
                JUST <span className="text-white/20">YAVIZ</span>
              </motion.div>
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
