import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import { Toaster } from 'sonner';
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
import PageTransition from "./components/PageTransition";
import ScrollProgress from "./components/ScrollProgress";
import AIChatbot from "./components/AIChatbot";

function AnimatedRoutes() {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <motion.div key={location.pathname} className="w-full">
        <Routes location={location}>
          <Route path="/" element={<PageTransition><Home /></PageTransition>} />
          <Route path="/old-home" element={<PageTransition><Home /></PageTransition>} />
          <Route path="/branding" element={<PageTransition><Branding /></PageTransition>} />
          <Route path="/projects" element={<PageTransition><Projects /></PageTransition>} />
          <Route path="/project/:id" element={<PageTransition><ProjectDetail /></PageTransition>} />
          <Route path="/client-portal" element={<PageTransition><ClientPortal /></PageTransition>} />
          <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
          <Route path="/blog" element={<PageTransition><Blog /></PageTransition>} />
          <Route path="/ai" element={<PageTransition><AI /></PageTransition>} />
          <Route path="/bio" element={<PageTransition><Bio /></PageTransition>} />
          <Route path="/admin" element={<PageTransition><Admin /></PageTransition>} />
          <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <Router>
      <ScrollProgress />
      <Toaster 
        position="top-center" 
        toastOptions={{
          style: {
            background: 'var(--glass-bg)',
            color: 'var(--text-primary)',
            border: '1px solid var(--border-primary)',
            backdropFilter: 'blur(16px)',
          },
          className: 'class-toast-glass font-satoshi shadow-xl',
        }} 
      />
      <AnalyticsTracker />
      <AppProvider>
        <AdminProvider>
          <>
            <Layout>
              <AnimatedRoutes />
            </Layout>
            <FloatingContact />
            <AIChatbot />
          </>
        </AdminProvider>
      </AppProvider>
    </Router>
  );
}
