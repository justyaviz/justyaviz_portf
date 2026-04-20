import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import { useState, useEffect } from "react";
import { AdminProvider } from "./components/AdminProvider";
import { AppProvider } from "./context/AppContext";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Branding from "./pages/Branding";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";
import AI from "./pages/AI";
import Bio from "./pages/Bio";
import Admin from "./pages/Admin";
import Blog from "./pages/Blog";
import ProjectDetail from "./pages/ProjectDetail";
import ClientPortal from "./pages/ClientPortal";
import NotFound from "./pages/NotFound";
import AnalyticsTracker from "./components/AnalyticsTracker";
import FloatingContact from "./components/FloatingContact";

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      <AnalyticsTracker />
      <AppProvider>
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
              className="fixed inset-0 z-[200] bg-[var(--bg-primary)] flex items-center justify-center overflow-hidden"
            >
               <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="flex flex-col items-center gap-8"
              >
                <div className="ui-loader">
                  <div></div>
                  <div></div>
                </div>
                <div className="text-xl font-satoshi font-black tracking-tighter text-[var(--text-primary)]">
                  JUST <span className="text-[var(--text-secondary)] opacity-50">YAVIZ</span>
                </div>
              </motion.div>
              
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[var(--accent)]/[0.05] blur-[100px] rounded-full" />
            </motion.div>
          ) : (
            <>
              <Layout>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/old-home" element={<Home />} />
                  <Route path="/branding" element={<Branding />} />
                  <Route path="/projects" element={<Projects />} />
                  <Route path="/project/:id" element={<ProjectDetail />} />
                  <Route path="/client-portal" element={<ClientPortal />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/blog" element={<Blog />} />
                  <Route path="/ai" element={<AI />} />
                  <Route path="/bio" element={<Bio />} />
                  <Route path="/admin" element={<Admin />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Layout>
              <FloatingContact />
            </>
          )}
        </AnimatePresence>
        </AdminProvider>
      </AppProvider>
    </Router>
  );
}
