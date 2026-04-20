import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Calculator, Plus, Minus, ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";

export default function PricingCalculator() {
  const [selectedServices, setSelectedServices] = useState<Record<string, boolean>>({
    smm: false,
    branding: false,
    web: false,
    seo: false,
  });

  const [speed, setSpeed] = useState<"normal" | "fast" | "asap">("normal");

  const services = [
    { id: "smm", name: "SMM & Target", price: 299, desc: "Oylik kontent, target, profil." },
    { id: "branding", name: "Branding & Logo", price: 499, desc: "Logotip, brandbook, vizitka." },
    { id: "web", name: "Web / Landing Page", price: 699, desc: "Sayt yaratish, domen, xosting." },
    { id: "seo", name: "SEO Optimization", price: 199, desc: "Google reytingi va trafik." },
  ];

  const toggleService = (id: string) => {
    setSelectedServices(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const calculateTotal = () => {
    let total = 0;
    services.forEach(s => {
      if (selectedServices[s.id]) total += s.price;
    });

    if (speed === "fast") total = Math.floor(total * 1.25);
    if (speed === "asap") total = Math.floor(total * 1.5);

    return total;
  };

  const totalCost = calculateTotal();

  return (
    <div className="min-h-screen pt-32 pb-24 px-6 relative bg-[var(--bg-primary)]">
      <div className="absolute top-[10%] left-[20%] w-[40vw] h-[40vw] bg-accent/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-4xl mx-auto z-10 relative">
        <div className="mb-12 text-center space-y-4">
          <div className="badge-it mx-auto flex w-fit">
            <Calculator size={12} /> Kalkulyator
          </div>
          <h1 className="text-4xl md:text-5xl font-satoshi font-bold text-[var(--text-primary)]">
            Loyihangiz <span className="text-accent italic">narxini</span> hisoblang.
          </h1>
          <p className="text-[var(--text-secondary)] font-dm-sans max-w-2xl mx-auto">
            Kerakli xizmatlarni tanlang va byudjetingizni taxminiy aniqlab oling.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          
          <div className="md:col-span-2 space-y-8">
            <div className="space-y-4">
              <h3 className="font-satoshi font-bold text-xl">1. Qaysi xizmatlar kerak?</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {services.map((service) => {
                  const isSelected = selectedServices[service.id];
                  return (
                    <div 
                      key={service.id}
                      onClick={() => toggleService(service.id)}
                      className={`cursor-pointer cursor-hover-target p-5 rounded-2xl border transition-all duration-300 ${isSelected ? 'bg-accent/10 border-accent/50 shadow-[0_10px_30px_rgba(var(--accent-rgb),0.1)]' : 'bg-[var(--glass-bg)] border-[var(--border-primary)] hover:border-accent/30 hover:bg-black/5 dark:hover:bg-white/5'}`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center border-2 transition-colors ${isSelected ? 'bg-accent border-accent text-white' : 'border-[var(--border-primary)]'}`}>
                          {isSelected && <CheckCircle2 size={14} strokeWidth={3} />}
                        </div>
                        <span className="font-bold font-satoshi text-lg">${service.price}</span>
                      </div>
                      <h4 className="font-bold text-[var(--text-primary)] font-satoshi">{service.name}</h4>
                      <p className="text-sm text-[var(--text-secondary)] font-dm-sans mt-1">{service.desc}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-satoshi font-bold text-xl">2. Loyiha muddatini tanlang:</h3>
              <div className="flex flex-wrap gap-4">
                {[
                  { id: "normal", label: "Standart Muddat", desc: "Shoshilinch emas" },
                  { id: "fast", label: "Tezroq", desc: "+25% ustama" },
                  { id: "asap", label: "Juda shoshilinch", desc: "+50% ustama" }
                ].map((s) => (
                  <div
                    key={s.id}
                    onClick={() => setSpeed(s.id as any)}
                    className={`flex-1 min-w-[150px] p-4 rounded-2xl border cursor-pointer transition-all cursor-hover-target ${speed === s.id ? 'bg-accent text-white border-accent shadow-xl' : 'bg-[var(--glass-bg)] border-[var(--border-primary)] text-[var(--text-primary)] hover:border-accent/30'}`}
                  >
                     <h5 className="font-bold font-satoshi mb-1">{s.label}</h5>
                     <p className={`text-xs ${speed === s.id ? 'text-white/80' : 'text-[var(--text-secondary)]'}`}>{s.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="md:col-span-1">
             <div className="sticky top-24 p-6 bg-[var(--glass-bg)] border border-[var(--border-primary)] rounded-3xl shadow-2xl space-y-6">
                <div className="flex items-center gap-2 text-accent">
                  <Sparkles size={20} />
                  <h3 className="font-bold font-satoshi text-lg uppercase tracking-wider">Hisobot</h3>
                </div>

                <div className="space-y-3 py-4 border-y border-[var(--border-primary)]">
                  {services.filter(s => selectedServices[s.id]).map(s => (
                    <div key={s.id} className="flex justify-between items-center text-sm font-dm-sans text-[var(--text-secondary)]">
                       <span>{s.name}</span>
                       <span className="font-medium text-[var(--text-primary)]">${s.price}</span>
                    </div>
                  ))}
                  {!Object.values(selectedServices).some(Boolean) && (
                    <div className="text-sm text-[var(--text-secondary)] italic">Hali xizmat tanlanmadi.</div>
                  )}

                  {speed !== "normal" && Object.values(selectedServices).some(Boolean) && (
                     <div className="flex justify-between items-center text-sm font-dm-sans text-accent">
                       <span>Tezlik ustamasi</span>
                       <span className="font-medium">+{speed === 'fast' ? '25' : '50'}%</span>
                    </div>
                  )}
                </div>

                <div>
                   <span className="text-sm text-[var(--text-secondary)] font-medium block mb-1">Taxminiy Narx:</span>
                   <div className="text-4xl md:text-5xl font-black font-satoshi text-[var(--text-primary)]">
                     <AnimatePresence mode="popLayout">
                        <motion.span 
                          key={totalCost}
                          initial={{ opacity: 0, y: -20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 20 }}
                          className="inline-block"
                        >
                          ${totalCost}
                        </motion.span>
                     </AnimatePresence>
                   </div>
                </div>

                <Link to="/contact" className="ui-btn-galaxy w-full !block text-center mt-4">
                   <div className="ui-btn-galaxy-inner justify-center w-full">
                     Loyihani yuborish <ArrowRight size={16} />
                   </div>
                </Link>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
}
