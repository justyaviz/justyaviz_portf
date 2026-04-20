import React from 'react';
import { motion } from 'motion/react';
import { Play, Star, MessageSquareQuote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    client: "REVAVA CEO",
    role: "Strategic Partner",
    video: "https://assets.mixkit.co/videos/preview/mixkit-working-on-a-laptop-4245-preview.mp4",
    quote: "Yahyobekning strategik yondashuvi bizning brendimizni yangi darajaga kiritdi."
  },
  {
    id: 2,
    client: "Alloo Panel",
    role: "Marketing Director",
    video: "https://assets.mixkit.co/videos/preview/mixkit-software-developer-working-on-his-laptop-31448-preview.mp4",
    quote: "2.4M views organik ravishda - bu biz kutgandan ham ko'proq natija."
  },
  {
    id: 3,
    client: "SunDecor",
    role: "Founder",
    video: "https://assets.mixkit.co/videos/preview/mixkit-man-working-on-his-laptop-3081-preview.mp4",
    quote: "Tizimli marketing nima ekanligini endi tushundik. Rahmat!"
  }
];

export default function VideoTestimonials() {
  return (
    <section className="py-20 md:py-40 px-6 snap-section">
      <div className="max-w-7xl mx-auto space-y-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
           <div className="space-y-6">
              <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-accent">SUCCESS STORIES</span>
              <h2 className="text-4xl md:text-8xl font-display font-medium tracking-tighter uppercase italic leading-[0.85]">
                 Verified <br/> <span className="text-accent underline decoration-white/10">Authority</span>
              </h2>
           </div>
           <p className="text-[var(--text-secondary)] max-w-sm font-medium leading-relaxed italic">
              Bizning natijalarimiz - bu shunchaki raqamlar emas, balki real insonlarning muvaffaqiyatlari.
           </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
           {testimonials.map((t, i) => (
             <motion.div 
               key={i}
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: i * 0.1 }}
               className="group relative h-[500px] rounded-[3rem] overflow-hidden border border-white/5 cursor-pointer"
             >
                <video 
                  src={t.video} 
                  autoPlay 
                  loop 
                  muted 
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover opacity-60 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                   <div className="w-16 h-16 bg-white/20 backdrop-blur-xl border border-white/20 rounded-full flex items-center justify-center animate-pulse">
                      <Play className="text-white fill-white" size={24} />
                   </div>
                </div>

                <div className="absolute bottom-10 left-10 right-10 space-y-4">
                   <div className="flex gap-1 text-accent">
                      {[1, 2, 3, 4, 5].map(s => <Star key={s} size={12} fill="currentColor" />)}
                   </div>
                   <div className="space-y-1">
                      <h4 className="text-xl font-display font-bold uppercase italic tracking-tight">{t.client}</h4>
                      <p className="text-[10px] font-black uppercase tracking-widest opacity-40">{t.role}</p>
                   </div>
                   <p className="text-xs font-medium leading-relaxed opacity-0 group-hover:opacity-80 transition-all duration-500 translate-y-4 group-hover:translate-y-0 italic">
                      "{t.quote}"
                   </p>
                </div>
             </motion.div>
           ))}
        </div>
      </div>
    </section>
  );
}
