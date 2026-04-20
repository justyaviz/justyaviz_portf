import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Calendar, Clock, User, Mail, Send, ChevronRight, CheckCircle, Target, Brain, Rocket } from "lucide-react";
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useAppContext } from "../context/AppContext";

export const BookingSystem = () => {
  const { t } = useAppContext();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    date: "",
    time: "",
    service: "SMM Strategy"
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const services = [
    { name: "SMM Strategy", icon: <Target size={18} />, desc: "Tizimli o‘sish rejasi" },
    { name: "Product Development", icon: <Rocket size={18} />, desc: "IT va Web loyihalar" },
    { name: "Consultation", icon: <Brain size={18} />, desc: "Ekspert maslahati" }
  ];

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      await addDoc(collection(db, "bookings"), {
        ...formData,
        status: "pending",
        createdAt: serverTimestamp()
      });
      setIsSuccess(true);
    } catch (error) {
      console.error("Booking Error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-20 md:py-40 px-6 bg-[var(--text-primary)]/[0.02]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <div className="space-y-10">
           <div className="space-y-4">
              <span className="text-accent text-[10px] font-black uppercase tracking-[0.5em]">{t("booking.badge") || "Consultation"}</span>
              <h2 className="text-4xl md:text-7xl font-black tracking-tighter italic uppercase leading-[0.9]">
                 Discovery <br /> Call Band Qiling
              </h2>
           </div>
           <p className="text-[var(--text-secondary)] text-lg md:text-xl font-medium italic leading-relaxed">
              Biznesingizni keyingi bosqichga olib chiqish uchun 15 daqiqalik bepul tanishuv suhbati. Biz siz uchun eng to‘g‘ri strategiyani belgilaymiz.
           </p>
           
           <div className="space-y-6">
              {services.map((s, i) => (
                <div 
                  key={i} 
                  onClick={() => setFormData({...formData, service: s.name})}
                  className={`p-6 rounded-[2rem] border transition-all cursor-pointer flex items-center justify-between group ${
                    formData.service === s.name ? 'bg-accent text-white border-accent' : 'bg-[var(--bg-primary)] border-[var(--border-primary)] hover:border-accent/40'
                  }`}
                >
                   <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${formData.service === s.name ? 'bg-white/20' : 'bg-accent/10 text-accent'}`}>
                         {s.icon}
                      </div>
                      <div>
                         <h4 className="font-black italic uppercase tracking-tighter text-sm">{s.name}</h4>
                         <p className={`text-[10px] font-bold uppercase tracking-widest ${formData.service === s.name ? 'text-white/60' : 'text-[var(--text-secondary)]'}`}>{s.desc}</p>
                      </div>
                   </div>
                   {formData.service === s.name && <CheckCircle size={20} />}
                </div>
              ))}
           </div>
        </div>

        <div className="relative">
           <div className="glass p-8 md:p-12 rounded-[3.5rem] border-[var(--border-primary)] shadow-3xl space-y-8 relative z-10 backdrop-blur-3xl">
              <AnimatePresence mode="wait">
                 {!isSuccess ? (
                   <motion.div 
                     key="form"
                     initial={{ opacity: 0, x: 20 }}
                     animate={{ opacity: 1, x: 0 }}
                     exit={{ opacity: 0, x: -20 }}
                     className="space-y-8"
                   >
                      <div className="flex gap-2">
                         {[1, 2].map(i => (
                           <div key={i} className={`h-1 flex-1 rounded-full ${step >= i ? 'bg-accent' : 'bg-[var(--border-primary)]'}`} />
                         ))}
                      </div>

                      {step === 1 ? (
                        <div className="space-y-6">
                           <div className="space-y-2">
                              <label className="text-[10px] font-black uppercase tracking-widest ml-2 text-[var(--text-secondary)]">To‘liq ism</label>
                              <div className="relative">
                                 <input 
                                   type="text" 
                                   value={formData.name}
                                   onChange={(e) => setFormData({...formData, name: e.target.value})}
                                   className="w-full bg-[var(--text-primary)]/5 border border-[var(--border-primary)] rounded-[1.5rem] px-6 py-4 text-sm font-medium focus:border-accent outline-none pl-12" 
                                   placeholder="Yahyobek..."
                                 />
                                 <User className="absolute left-4 top-1/2 -translate-y-1/2 text-accent" size={18} />
                              </div>
                           </div>
                           <div className="space-y-2">
                              <label className="text-[10px] font-black uppercase tracking-widest ml-2 text-[var(--text-secondary)]">Email manzil</label>
                              <div className="relative">
                                 <input 
                                   type="email" 
                                   value={formData.email}
                                   onChange={(e) => setFormData({...formData, email: e.target.value})}
                                   className="w-full bg-[var(--text-primary)]/5 border border-[var(--border-primary)] rounded-[1.5rem] px-6 py-4 text-sm font-medium focus:border-accent outline-none pl-12" 
                                   placeholder="example@mail.com"
                                 />
                                 <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-accent" size={18} />
                              </div>
                           </div>
                           <button 
                             onClick={() => step < 2 && setStep(2)}
                             disabled={!formData.name || !formData.email}
                             className="w-full ui-btn-galaxy py-4 rounded-full flex items-center justify-center gap-2 group h-14"
                           >
                              <div className="ui-btn-galaxy-inner px-8 justify-center gap-2 w-full">
                                 Keyingi qadam <ChevronRight size={18} />
                              </div>
                           </button>
                        </div>
                      ) : (
                        <div className="space-y-6">
                           <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                 <label className="text-[10px] font-black uppercase tracking-widest ml-2 text-[var(--text-secondary)]">Sana</label>
                                 <input 
                                   type="date" 
                                   onChange={(e) => setFormData({...formData, date: e.target.value})}
                                   className="w-full bg-[var(--text-primary)]/5 border border-[var(--border-primary)] rounded-[1.5rem] px-6 py-4 text-sm font-medium focus:border-accent outline-none" 
                                 />
                              </div>
                              <div className="space-y-2">
                                 <label className="text-[10px] font-black uppercase tracking-widest ml-2 text-[var(--text-secondary)]">Vaqt</label>
                                 <input 
                                   type="time" 
                                   onChange={(e) => setFormData({...formData, time: e.target.value})}
                                   className="w-full bg-[var(--text-primary)]/5 border border-[var(--border-primary)] rounded-[1.5rem] px-6 py-4 text-sm font-medium focus:border-accent outline-none" 
                                 />
                              </div>
                           </div>
                           <div className="flex gap-4">
                              <button 
                                onClick={() => setStep(1)}
                                className="px-6 py-4 border border-[var(--border-primary)] rounded-[1.5rem] text-sm font-bold uppercase tracking-widest hover:bg-[var(--text-primary)]/5"
                              >
                                Orqaga
                              </button>
                              <button 
                                onClick={handleSubmit}
                                disabled={isSubmitting || !formData.date || !formData.time}
                                className="flex-1 ui-btn-galaxy h-14"
                              >
                                 <div className="ui-btn-galaxy-inner px-8 justify-center gap-2 w-full">
                                    {isSubmitting ? "YUBORILMOQDA..." : "BAND QILISH"} <Send size={18} />
                                 </div>
                              </button>
                           </div>
                        </div>
                      )}
                   </motion.div>
                 ) : (
                   <motion.div 
                     key="success"
                     initial={{ opacity: 0, scale: 0.9 }}
                     animate={{ opacity: 1, scale: 1 }}
                     className="text-center py-20 space-y-6"
                   >
                      <div className="w-24 h-24 bg-accent text-white rounded-[2rem] flex items-center justify-center mx-auto shadow-[0_20px_40px_rgba(var(--accent-rgb),0.3)]">
                         <CheckCircle size={48} />
                      </div>
                      <div className="space-y-2">
                         <h3 className="text-3xl font-black italic uppercase tracking-tighter">Suhbat Band Qilindi!</h3>
                         <p className="text-[var(--text-secondary)] font-medium text-sm">
                            Tez orada siz bilan bog'lanamiz va uchrashuv manzilini yuboramiz.
                         </p>
                      </div>
                      <button 
                         onClick={() => { setIsSuccess(false); setStep(1); }}
                         className="text-accent font-black uppercase tracking-widest text-[10px] hover:underline"
                      >
                         Yangi band qilish
                      </button>
                   </motion.div>
                 )}
              </AnimatePresence>
           </div>
           
           <div className="absolute -top-10 -left-10 w-40 h-40 bg-accent/20 blur-3xl rounded-full" />
        </div>
      </div>
    </section>
  );
};
