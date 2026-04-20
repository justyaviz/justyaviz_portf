import { motion, AnimatePresence } from "motion/react";
import React, { useState } from "react";
import { 
  Send, 
  ArrowRight, 
  ArrowLeft,
  Instagram, 
  Youtube, 
  Github, 
  Mail,
  Phone,
  MapPin,
  ChevronDown,
  Megaphone,
  Palette,
  Rocket,
  CheckCircle2
} from "lucide-react";
import { EditableText } from "../components/EditableText";
import { useAppContext } from "../context/AppContext";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import { toast } from "sonner";
import confetti from "canvas-confetti";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, ease: "easeOut" }
};

const slideUp = {
  initial: { opacity: 0, x: 50 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -50 },
  transition: { duration: 0.4, type: "spring" }
};

export default function Contact() {
  const { t, theme } = useAppContext();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({ 
    name: "", 
    email: "", 
    content: "",
    service: "",
    budget: ""
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const fireConfetti = () => {
    const end = Date.now() + 2 * 1000;
    const colors = ['#2f49e0', '#3a56e4', '#ffffff'];

    (function frame() {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }());
  };

  const handleNext = () => {
    if (step === 1 && !formData.service) {
      toast.error("Iltimos, xizmat turini tanlang!");
      return;
    }
    if (step === 2 && !formData.budget) {
      toast.error("Byudjet oralig'ini tanlang!");
      return;
    }
    setStep(prev => prev + 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      toast.error("Barcha majburiy maydonlarni to'ldiring!");
      return;
    }
    setStatus("loading");
    try {
      await addDoc(collection(db, "bookings"), {
        ...formData,
        status: "pending",
        projectName: formData.service + " loyihasi",
        clientEmail: formData.email,
        progress: 0,
        createdAt: new Date().toISOString()
      });
      setStatus("success");
      fireConfetti();
      toast.success("Ajoyib! Loyiha talabnomasi muvaffaqiyatli qabul qilindi. Siz bilan tez orada bog'lanamiz!");
    } catch (err) {
      setStatus("error");
      toast.error("Xatolik yuz berdi. Iltimos qayta urinib ko'ring.");
    }
  };

  const services = [
    { id: "SMM / Social Media", icon: <Megaphone size={24}/>, title: "SMM & Marketing", desc: "Instagram, TikTok, Target" },
    { id: "Branding / Dizayn", icon: <Palette size={24}/>, title: "Branding & Dizayn", desc: "Logo, Brandbook, UI/UX" },
    { id: "Web Sayt", icon: <Rocket size={24}/>, title: "Web Dasturlash", desc: "Landing, E-commerce, Portallar" }
  ];

  const budgets = [
    "<$500 (Kichik biznes)",
    "$500 - $1,000 (O'sish)",
    "$1,000 - $3,000 (Professional)",
    "$3,000+ (Katta korporativ loyiha)"
  ];

  return (
    <div className="pt-40 pb-20 px-6">
      <div className="max-w-7xl mx-auto space-y-24">
        {/* HEADER SECTION */}
        <div className="text-center space-y-8">
           <motion.h1 
             initial={{ opacity: 0, y: 30 }}
             animate={{ opacity: 1, y: 0 }}
             className="text-6xl md:text-8xl font-display font-black tracking-tighter leading-[0.9] max-w-5xl mx-auto"
           >
             <EditableText contentKey="contactTitle" defaultText={t("contact.hero.title")} as="span" />
           </motion.h1>
           <motion.p 
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ delay: 0.2 }}
             className="text-[var(--text-secondary)] max-w-2xl mx-auto font-medium text-lg leading-relaxed"
           >
             Noyob loyihangizni boshlash uchun bizga qisqacha ma'lumot qoldiring. Tizim avtomatik siz uchun portal ochadi.
           </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* MULTI-STEP FORM COLUMN */}
          <motion.div 
            {...fadeIn}
            className="lg:col-span-8 glass p-8 md:p-14 rounded-[3.5rem] border-[var(--border-primary)] space-y-8 shadow-xl relative overflow-hidden"
          >
            {/* PROGRESS BAR */}
            {status !== "success" && (
              <div className="absolute top-0 left-0 w-full h-1.5 bg-[var(--border-primary)]">
                <motion.div 
                  className="h-full bg-accent"
                  initial={{ width: "33%" }}
                  animate={{ width: `${(step / 3) * 100}%` }}
                />
              </div>
            )}

            {/* STATUS SUCCESS */}
            {status === "success" ? (
              <div className="py-20 text-center space-y-8 flex flex-col items-center">
                 <div className="w-24 h-24 bg-accent/10 rounded-full flex items-center justify-center text-accent ring-8 ring-accent/5">
                    <CheckCircle2 size={40} />
                 </div>
                 <div className="space-y-4">
                    <h2 className="text-4xl font-black italic tracking-tighter uppercase text-[var(--text-primary)]">Qabul qilindi!</h2>
                    <p className="text-[var(--text-secondary)]">
                      Loyiha ro'yxatga olindi. Ma'lumotlaringiz asosida mijoz portali orqali statusni kuzatishingiz mumkin.
                    </p>
                 </div>
                 <button onClick={() => window.location.href='/client-portal'} className="ui-btn-shine mt-4">
                    Mijozlar portaliga o'tish
                 </button>
              </div>
            ) : (
              <div className="min-h-[400px]">
                <div className="mb-10 space-y-2">
                   <p className="text-[10px] font-black uppercase text-accent tracking-[0.2em]">QADAM 0{step}/03</p>
                   <h3 className="text-2xl md:text-3xl font-bold font-satoshi">
                     {step === 1 && "Qaysi yo'nalish bo'yicha xizmat kerak?"}
                     {step === 2 && "Budjetingiz qancha?"}
                     {step === 3 && "Kontakt ma'lumotlaringiz"}
                   </h3>
                </div>

                <AnimatePresence mode="wait">
                  {step === 1 && (
                    <motion.div key="step1" {...slideUp} className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {services.map((s) => (
                        <div 
                          key={s.id} 
                          onClick={() => setFormData({...formData, service: s.id})}
                          className={`p-6 rounded-3xl border-2 cursor-pointer transition-all hover:-translate-y-2 
                            ${formData.service === s.id ? 'border-accent bg-accent/5' : 'border-[var(--border-primary)] bg-[var(--glass-bg)] hover:border-accent/40'}
                          `}
                        >
                           <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 
                             ${formData.service === s.id ? 'bg-accent text-white' : 'bg-accent/10 text-accent'}
                           `}>
                              {s.icon}
                           </div>
                           <h4 className="font-bold text-lg mb-2">{s.title}</h4>
                           <p className="text-xs text-[var(--text-secondary)] opacity-80">{s.desc}</p>
                           {formData.service === s.id && (
                             <div className="mt-4 flex justify-end text-accent"><CheckCircle2 size={20}/></div>
                           )}
                        </div>
                      ))}
                    </motion.div>
                  )}

                  {step === 2 && (
                    <motion.div key="step2" {...slideUp} className="space-y-4">
                      {budgets.map((b) => (
                        <div 
                          key={b}
                          onClick={() => setFormData({...formData, budget: b})}
                          className={`p-6 rounded-2xl border-2 cursor-pointer transition-all flex items-center justify-between
                            ${formData.budget === b ? 'border-accent bg-accent/5' : 'border-[var(--border-primary)] bg-[var(--glass-bg)] hover:border-accent/40'}
                          `}
                        >
                           <span className="font-medium font-dm-sans">{b}</span>
                           <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center
                             ${formData.budget === b ? 'border-accent bg-accent' : 'border-[var(--border-primary)]'}
                           `}>
                             {formData.budget === b && <div className="w-2 h-2 bg-white rounded-full" />}
                           </div>
                        </div>
                      ))}
                    </motion.div>
                  )}

                  {step === 3 && (
                    <motion.form key="step3" {...slideUp} onSubmit={handleSubmit} className="space-y-8">
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          <div className="space-y-4">
                             <label className="text-[11px] font-black uppercase tracking-widest text-[var(--text-primary)] ml-2">Ismingiz*</label>
                             <div className="ui-input-glow rounded-2xl">
                               <input type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required className="w-full bg-transparent p-6 outline-none text-[var(--text-primary)] placeholder:text-[var(--text-secondary)]/30 rounded-2xl" placeholder="Masalan: Azizbek" />
                             </div>
                          </div>
                          <div className="space-y-4">
                             <label className="text-[11px] font-black uppercase tracking-widest text-[var(--text-primary)] ml-2">Email yoki Telefon*</label>
                             <div className="ui-input-glow rounded-2xl">
                               <input type="text" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} required className="w-full bg-transparent p-6 outline-none text-[var(--text-primary)] placeholder:text-[var(--text-secondary)]/30 rounded-2xl" placeholder="Tizimga kirish uchun kerak" />
                             </div>
                          </div>
                       </div>
                       <div className="space-y-4">
                          <label className="text-[11px] font-black uppercase tracking-widest text-[var(--text-primary)] ml-2">Qo'shimcha izoh (ixtiyoriy)</label>
                          <div className="ui-input-glow rounded-3xl">
                            <textarea value={formData.content} onChange={e => setFormData({...formData, content: e.target.value})} rows={3} className="w-full bg-transparent p-6 outline-none resize-none text-[var(--text-primary)] placeholder:text-[var(--text-secondary)]/30 rounded-3xl" placeholder="Sayt, dizayn yoki raqobatchilar bo'yicha izoh..." />
                          </div>
                       </div>
                    </motion.form>
                  )}
                </AnimatePresence>

                {/* CONTROLS */}
                <div className="mt-12 pt-8 border-t border-[var(--border-primary)] flex items-center justify-between">
                   {step > 1 ? (
                     <button onClick={() => setStep(step - 1)} className="p-4 border border-[var(--border-primary)] rounded-full hover:bg-[var(--text-primary)] hover:text-[var(--bg-primary)] transition-colors">
                        <ArrowLeft size={20} />
                     </button>
                   ) : <div/>}

                   {step < 3 ? (
                     <button onClick={handleNext} className="ui-btn-galaxy">
                       <div className="ui-btn-galaxy-inner px-12 py-4 uppercase text-xs tracking-widest w-full justify-center">
                         Keyingisi <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform ml-2" />
                       </div>
                     </button>
                   ) : (
                     <button onClick={handleSubmit} disabled={status === "loading"} className="ui-btn-galaxy">
                       <div className="ui-btn-galaxy-inner px-12 py-4 uppercase text-xs tracking-widest w-full justify-center">
                         {status === "loading" ? "Yuborilmoqda..." : "Yuborish & Loyihani Boshlash"} <Send size={18} className="ml-2" />
                       </div>
                     </button>
                   )}
                </div>
              </div>
            )}
          </motion.div>

          {/* SIDEBAR COLUMN */}
          <div className="lg:col-span-4 space-y-6">
             <motion.div 
               {...fadeIn}
               transition={{ delay: 0.1 }}
               className="glass p-8 rounded-[2.5rem] border-[var(--border-primary)] space-y-6 group hover:bg-accent/5 transition-all shadow-sm"
             >
                <div className="flex items-center justify-between">
                   <div className="flex items-center gap-3">
                      <Mail size={18} className="text-accent" />
                      <span className="text-xs font-black uppercase tracking-widest">{t("contact.info.email")}</span>
                   </div>
                   <div className="px-2 py-0.5 bg-accent rounded-md text-[8px] font-black uppercase tracking-widest text-white">24/7</div>
                </div>
                <p className="text-[var(--text-secondary)] font-medium">yahyobektohirjonov0@gmail.com</p>
             </motion.div>

             <motion.div 
               {...fadeIn}
               transition={{ delay: 0.2 }}
               className="glass p-8 rounded-[2.5rem] border-[var(--border-primary)] space-y-6 group hover:bg-accent/5 transition-all shadow-sm"
             >
                <div className="flex items-center gap-3">
                   <Phone size={18} className="text-accent" />
                   <span className="text-xs font-black uppercase tracking-widest">{t("contact.info.phone")}</span>
                </div>
                <p className="text-[var(--text-secondary)] font-medium">+998 93 194 92 00</p>
             </motion.div>

             <motion.div 
               {...fadeIn}
               transition={{ delay: 0.3 }}
               className="glass p-8 rounded-[2.5rem] border-[var(--border-primary)] space-y-6 group hover:bg-accent/5 transition-all shadow-sm"
             >
                <div className="flex items-center justify-between">
                   <div className="flex items-center gap-3">
                      <MapPin size={18} className="text-accent" />
                      <span className="text-xs font-black uppercase tracking-widest">{t("contact.info.address")}</span>
                   </div>
                   <div className="px-2 py-0.5 bg-accent rounded-md text-[8px] font-black uppercase tracking-widest text-white">Remote</div>
                </div>
                <p className="text-[var(--text-secondary)] font-medium font-display translate-y-2">{t("contact.info.address.val")}</p>
             </motion.div>

             <div className="pt-10 space-y-6 px-4">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[var(--text-secondary)] opacity-50">{t("contact.info.social")}</p>
                <div className="flex gap-6">
                   {[
                     { icon: <Instagram size={20} />, url: "https://instagram.com/just_yaviz" },
                     { icon: <Youtube size={20} />, url: "https://youtube.com/@just_yaviz" },
                     { icon: <Github size={20} />, url: "https://github.com/justyaviz" }
                   ].map((social, i) => (
                     <a key={i} href={social.url} target="_blank" className="ui-social-icon">
                       {social.icon}
                     </a>
                   ))}
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
