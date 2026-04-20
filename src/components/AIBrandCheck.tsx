import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShieldCheck, 
  Search, 
  Activity, 
  Zap, 
  CheckCircle2, 
  AlertCircle,
  BarChart3
} from 'lucide-react';
import { useAudio } from '../hooks/useAudio';

export default function AIBrandCheck() {
  const [input, setInput] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<any>(null);
  const { playClick, playSuccess } = useAudio();

  const handleAnalyze = () => {
    if (!input) return;
    playClick();
    setIsAnalyzing(true);
    
    // Simulate AI analysis
    setTimeout(() => {
      setIsAnalyzing(false);
      setResult({
        score: Math.floor(Math.random() * 30) + 65, // 65-95
        insights: [
          "Visual consistency is above average but needs refinement.",
          "Market positioning shows strong potential in your niche.",
          "Digital presence requires technical SEO optimization."
        ],
        status: 'Optimal'
      });
      playSuccess();
    }, 3000);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-12 py-20 px-6">
      <div className="text-center space-y-6">
        <div className="badge-it mx-auto">
          <Zap size={12} className="text-accent" /> AI ANALYTICS
        </div>
        <h2 className="text-4xl md:text-7xl font-display font-medium tracking-tighter uppercase italic">Brand <span className="text-accent">Health</span> Check</h2>
        <p className="text-[var(--text-secondary)] max-w-xl mx-auto font-medium">Input your brand name or website URL, and our strategic AI engine will diagnose your digital authority in seconds.</p>
      </div>

      <div className="glass p-8 md:p-12 rounded-[4rem] border border-white/5 space-y-8 relative overflow-hidden">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 opacity-20" size={20} />
            <input 
              type="text" 
              placeholder="e.g. justyaviz.uz"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="w-full bg-white/5 border border-white/5 py-6 px-16 rounded-3xl outline-none focus:border-accent transition-all font-medium"
            />
          </div>
          <button 
            disabled={isAnalyzing || !input}
            onClick={handleAnalyze}
            className="ui-btn-galaxy disabled:opacity-50"
          >
            <div className="ui-btn-galaxy-inner px-12 py-6 text-xs font-black uppercase tracking-widest">
              {isAnalyzing ? 'Analyzing...' : 'Diagnose Now'}
            </div>
          </button>
        </div>

        <AnimatePresence>
          {isAnalyzing && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="py-12 space-y-8 text-center"
            >
               <div className="flex justify-center gap-2">
                  {[0, 1, 2].map(i => (
                    <motion.div 
                      key={i}
                      animate={{ scale: [1, 1.5, 1], opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                      className="w-2 h-2 bg-accent rounded-full"
                    />
                  ))}
               </div>
               <p className="text-xs font-black uppercase tracking-[0.3em] opacity-40 animate-pulse">Running Neural Market Audit...</p>
            </motion.div>
          )}

          {result && !isAnalyzing && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-white/5"
            >
               <div className="space-y-6">
                  <div className="flex items-center gap-4">
                     <div className="w-16 h-16 rounded-full border-4 border-accent border-r-transparent flex items-center justify-center animate-spin-slow">
                        <span className="text-2xl font-black italic">{result.score}%</span>
                     </div>
                     <div className="space-y-1">
                        <p className="text-xs font-black uppercase tracking-widest opacity-40">Authority Score</p>
                        <h4 className="text-2xl font-display font-medium uppercase italic text-accent">{result.status}</h4>
                     </div>
                  </div>
                  <div className="space-y-4">
                     {result.insights.map((insight: string, i: number) => (
                       <div key={i} className="flex gap-4 p-4 bg-white/5 rounded-2xl border border-white/5 group hover:border-accent transition-all">
                          <CheckCircle2 className="text-emerald-500 shrink-0" size={18} />
                          <p className="text-sm font-medium leading-relaxed opacity-60 group-hover:opacity-100 transition-opacity">{insight}</p>
                       </div>
                     ))}
                  </div>
               </div>

               <div className="bg-accent text-white p-8 rounded-[3rem] space-y-8 shadow-2xl relative overflow-hidden group">
                  <ShieldCheck size={120} className="absolute -bottom-10 -right-10 opacity-10 group-hover:rotate-12 transition-transform" />
                  <div className="space-y-2 relative z-10">
                     <h5 className="text-3xl font-display font-medium uppercase tracking-tighter leading-[0.9] italic">Ready to <br/> Scale up?</h5>
                     <p className="text-sm font-medium opacity-80 leading-relaxed">Your brand is one strategic loop away from becoming a market authority.</p>
                  </div>
                  <button className="bg-white text-black px-8 py-4 rounded-full text-xs font-black uppercase tracking-widest hover:scale-105 transition-transform relative z-10 shadow-xl">
                     Book Strategy Session
                  </button>
               </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
