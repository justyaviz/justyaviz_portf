import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Calendar, Clock, ChevronRight, ChevronLeft, Check, Send } from "lucide-react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase";
import { toast } from "sonner";
import { useAppContext } from "../context/AppContext";

export default function BookingCalendar() {
  const { t, lang } = useAppContext();
  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  
  // Form State
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  // Generate next 14 days (excluding weekends for this demo)
  const generateAvailableDates = () => {
    const dates = [];
    const today = new Date();
    let daysAdded = 0;
    let currDate = new Date(today);

    while (daysAdded < 14) {
      currDate.setDate(currDate.getDate() + 1);
      const day = currDate.getDay();
      // Skip Saturday (6) and Sunday (0)
      if (day !== 0 && day !== 6) {
        dates.push(new Date(currDate));
        daysAdded++;
      }
    }
    return dates;
  };

  const availableDates = generateAvailableDates();
  const timeSlots = ["10:00", "11:30", "13:00", "14:30", "16:00", "17:30"];

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate || !selectedTime || !name || !phone) return;

    setLoading(true);
    try {
      await addDoc(collection(db, "bookings"), {
        date: selectedDate.toISOString(),
        time: selectedTime,
        name,
        email,
        phone,
        status: 'pending',
        createdAt: new Date().toISOString()
      });
      setStep(3); // success screen
      toast.success("Konsultatsiya band qilindi!");
    } catch (err) {
      toast.error("Xatolik yuz berdi. Iltimos qayta urinib ko'ring.");
    } finally {
      setLoading(false);
    }
  };

  const currentMonth = availableDates[0].toLocaleString('default', { month: 'long', year: 'numeric' });

  return (
    <div className="w-full max-w-2xl mx-auto bg-[var(--glass-bg)] border border-[var(--border-primary)] rounded-[2rem] shadow-2xl p-6 md:p-10 font-satoshi backdrop-blur-xl">
      <div className="flex items-center gap-3 mb-8">
         <div className="w-12 h-12 bg-accent/10 text-accent rounded-full flex items-center justify-center">
            <Calendar size={24} />
         </div>
         <div>
            <h2 className="text-2xl font-bold text-[var(--text-primary)] tracking-tight">{t("book.hero.title")}</h2>
            <p className="text-[var(--text-secondary)] font-dm-sans text-sm font-medium">{t("book.hero.desc")}</p>
         </div>
      </div>

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div 
            key="step1"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="space-y-8"
          >
            {/* Step 1: Date & Time */}
            <div>
               <h3 className="font-bold text-lg mb-4 text-[var(--text-primary)]">{t("book.step1")} <span className="text-accent">{currentMonth}</span></h3>
               <div className="grid grid-cols-4 md:grid-cols-7 gap-2">
                 {availableDates.map((date, i) => {
                    const isSelected = selectedDate?.toDateString() === date.toDateString();
                    return (
                      <div 
                        key={i}
                        onClick={() => { setSelectedDate(date); setSelectedTime(null); }}
                        className={`cursor-pointer cursor-hover-target p-3 rounded-xl border text-center transition-all ${isSelected ? 'bg-accent border-accent text-white shadow-lg scale-105' : 'bg-transparent border-[var(--border-primary)] text-[var(--text-primary)] hover:border-accent/40'}`}
                      >
                         <div className="text-[10px] font-bold uppercase opacity-80">{date.toLocaleString('en-us', { weekday: 'short' })}</div>
                         <div className="text-xl font-black mt-1">{date.getDate()}</div>
                      </div>
                    )
                 })}
               </div>
            </div>

            <AnimatePresence>
              {selectedDate && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="space-y-4"
                >
                  <h3 className="font-bold text-lg text-[var(--text-primary)]">2. Vaqtni tanlang:</h3>
                  <div className="grid grid-cols-3 gap-3">
                    {timeSlots.map(time => (
                      <div 
                        key={time}
                        onClick={() => setSelectedTime(time)}
                        className={`cursor-pointer cursor-hover-target p-3 rounded-xl border text-center transition-all flex items-center justify-center gap-2 font-bold ${selectedTime === time ? 'bg-accent/10 border-accent text-accent' : 'border-[var(--border-primary)] text-[var(--text-secondary)] hover:border-[var(--text-primary)] hover:text-[var(--text-primary)]'}`}
                      >
                        <Clock size={16} /> {time}
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <button 
              disabled={!selectedDate || !selectedTime}
              onClick={() => setStep(2)}
              className="w-full py-4 bg-black dark:bg-white text-white dark:text-black font-bold rounded-2xl flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:scale-[1.02] active:scale-95"
            >
              {t("book.btn.next")} <ChevronRight size={18} />
            </button>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
          >
             <button onClick={() => setStep(1)} className="flex items-center gap-1 text-[var(--text-secondary)] text-sm mb-6 hover:text-[var(--text-primary)] transition-colors">
               <ChevronLeft size={16} /> {t("book.btn.back")}
             </button>

             <form onSubmit={handleBooking} className="space-y-5">
               <h3 className="font-bold text-xl text-[var(--text-primary)] mb-2">{t("book.step3.title")}</h3>
               
               <div className="space-y-2">
                 <label className="text-sm font-bold text-[var(--text-secondary)] ml-1">{t("book.form.name.label")}</label>
                 <input 
                   type="text" 
                   required 
                   value={name} 
                   onChange={e => setName(e.target.value)} 
                   className="w-full p-4 bg-transparent border border-[var(--border-primary)] rounded-xl outline-none focus:border-accent transition-colors font-dm-sans ui-input-glow"
                   placeholder="Masalan: Sardor" 
                 />
               </div>

               <div className="space-y-2">
                 <label className="text-sm font-bold text-[var(--text-secondary)] ml-1">{t("book.form.phone.label")}</label>
                 <input 
                   type="tel" 
                   required 
                   value={phone} 
                   onChange={e => setPhone(e.target.value)} 
                   className="w-full p-4 bg-transparent border border-[var(--border-primary)] rounded-xl outline-none focus:border-accent transition-colors font-dm-sans ui-input-glow"
                   placeholder="+998 90 123 45 67" 
                 />
               </div>

               <div className="space-y-2 mb-8">
                 <label className="text-sm font-bold text-[var(--text-secondary)] ml-1">{t("book.form.email.label")}</label>
                 <input 
                   type="email" 
                   value={email} 
                   onChange={e => setEmail(e.target.value)} 
                   className="w-full p-4 bg-transparent border border-[var(--border-primary)] rounded-xl outline-none focus:border-accent transition-colors font-dm-sans ui-input-glow"
                   placeholder="hello@example.com" 
                 />
               </div>

               <div className="p-4 rounded-xl bg-accent/5 border border-accent/20 flex items-start gap-3 mt-4 mb-6">
                 <Calendar className="text-accent shrink-0 mt-0.5" size={18} />
                 <div className="text-sm font-medium text-[var(--text-primary)] font-dm-sans">
                   {t("book.selected_time")} <br/>
                   <strong className="text-accent text-base">{selectedDate?.toLocaleDateString(lang === 'uz' ? 'uz-UZ' : lang === 'ru' ? 'ru-RU' : 'en-US')} {t("book.on_day")} soat {selectedTime} {t("book.at")}</strong>
                 </div>
               </div>

               <button 
                type="submit"
                disabled={loading || !name || !phone}
                className="w-full py-4 bg-accent text-white font-bold rounded-2xl flex items-center justify-center gap-2 disabled:opacity-50 transition-all hover:scale-[1.02] active:scale-95 shadow-[0_15px_30px_rgba(var(--accent-rgb),0.3)]"
               >
                 {loading ? t("book.loading") : <>{t("book.btn.submit")} <Send size={18} /></>}
               </button>
             </form>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-10 space-y-4"
          >
             <div className="w-20 h-20 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
               <Check size={40} strokeWidth={3} />
             </div>
             <h3 className="text-3xl font-black text-[var(--text-primary)]">{t("book.success.title")}</h3>
             <p className="text-[var(--text-secondary)] font-dm-sans">
               {name}, {t("book.success.msg_start")} <strong>{selectedDate?.toLocaleDateString(lang === 'uz' ? 'uz-UZ' : lang === 'ru' ? 'ru-RU' : 'en-US')} {selectedTime}</strong> {t("book.success.msg_end")}
             </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
