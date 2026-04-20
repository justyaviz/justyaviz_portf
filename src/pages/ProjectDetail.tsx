import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { motion } from 'motion/react';
import { ArrowLeft, ExternalLink, Play, CheckCircle2 } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { Logo } from '../components/Logo';

const defaultProjects = [
  { id: "dummy1", title: "Magic City", category: "Marketing", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxwrLEewH9Kw14lXc8nVXi2bIPilJXbDS1zg&s", type: "Marketing", problem: "Magic City O'zbekistonning eng yirik shijoatli obyekti bo'lsa-da, tashrif buyuruvchilarning barchasi haqiqiy imkoniyatlaridan xabardor emas edi. Bizga organik va keng qamrovli social media ishtiroki kerak edi.", solution: "Brendning yangi yuzi sifatida dinamik SMM strategiyasi tuzildi, kreativ videolar olindi va maqsadli auditoriyani jalb qilish uchun qiziqarli o'yinlar, konkurslar va yuqori sifatli 'Premium Vizuallar' ishlab chiqildi.", result: "Ijtimoiy tarmoqlardagi obunachilar soni va organik reach 4X barobar oshdi. Tashrif buyuruvchilar soni stabil va brand sodiqligi yuksak darajaga chiqdi." },
  { id: "dummy2", title: "Sundecor", category: "Marketing", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLfkcYEjWfYZIpWvZ7fLMcCVxfVZQcXAZ3RQ&s", type: "Marketing", problem: "Tashqi bozorlarga e'lon qilish va keng ko'lamda tanilish uchun Premium imaj yetishmayotgan edi.", solution: "Minimalistik rebrending, hashamatga urg'u beruvchi sifatli videolar hamda dizaynlashtirilgan katalog yaratildi.", result: "Prestige auditoriyaning qiziqishi oshdi va conversion rate B2B doirasida keskin o'sish ko'rsatdi." },
  { id: "dummy3", title: "Ilm Chashmalari", category: "SMM", image: "https://static4.tgstat.ru/channels/_0/58/5874f696205edf0c7aa55152da39921a.jpg", type: "Marketing", problem: "Katta ma'lumotlar bor bo'lishiga qaramay, ularni kuzatuvchiga to'g'ri va tushunarli tarzda yetkazib berish bo'yicha platforma yo'q edi.", solution: "Oddiy, yengil hamda foydali ma'lumotlarga asoslangan mikro-kontent (Reels) strategiyasi, shuningdek postlarni interaktiv formatda uzatish tizimi qurildi.", result: "Auditoriya faolligi (ER) o'sdi va doimiy o'qitish platformasi orqali ishonchli imidj yaratildi." },
  { id: "dummy4", title: "e-one stores", category: "Web site", image: "https://taplink.st/a/5/1/6/f/99552c.jpg?1", type: "Web site", link: "https://e-one.uz", problem: "E-commerce doirasida xaridorning saytdan mahsulot xarid qilishdagi qiyinchiliklari va noqulay UI/UX holati sabab savdolar past edi.", solution: "UX lab va A/B testlar orqali foydalanuvchilar harakati (User Journey) noldan yaratildi va tezkor ishlovchi frontend (React/Next.js) yaratildi.", result: "Tashlab ketilgan savatchalar (Abandoned Cart) 30% ga kamaydi, xarid jarayoni osonlashdi." },
  { id: "dummy5", title: "aloo shop", category: "Yandex Maps / Marketing", image: "https://proud-cyan-whxxiapwah.edgeone.app/8586B6B0-80CD-45D5-8121-D8BB132DDF0B.jpeg", type: "Marketing", link: "https://yandex.uz/maps/org/180263652317/", problem: "Bozorda ko'plab do'konlar bo'lishiga qaramasdan mijozlar topish va xaritada navigatsiyalash noqulay edi.", solution: "Yandex Maps tizimiga mukammal integratsiyalangan katalog, do'kon ko'rinishi, filiallari qo'shildi va Google SEO orqali hududiy marketing qilindi.", result: "Faqat Yandexni o'zidan oyiga minglab yangi potensial xaridorlar oqimi paydo bo'ldi." },
  { id: "dummy6", title: "Yengil Taxi", category: "CRM", image: "https://assets.nicepagecdn.com/bc13c16f/6522583/images/Untitled-1.png", type: "CRM", problem: "Haydovchilar bilan mijozlar orasidagi logistika jarayonlarini monitoring qilish muammo edi.", solution: "Custom CRM tizimi yaratilib, buyurtmalar, to'lovlar hamda haydovchilar bahosi bitta admin panelda yig'ildi.", result: "Operatorlarga bo'lgan yuk 50% gacha kamaydi va buyurtmani qabul qilib olish vaqti yashinsimon tezlikka chiqdi." },
  { id: "dummy7", title: "Yengil Mijoz", category: "Marketing", image: "https://play-lh.googleusercontent.com/7hUsDaIdSaYwgWXQosQZGuOpQ8RLhp8Iw-bSKzNIxocMqw5l-2ZysdbGdyllKkQIOw", type: "Marketing", problem: "Foydalanuvchilarni ilovani ko'proq yuklab olishga(Install) tushirish uchun reklama yetishmasligi sezilardi.", solution: "Performance Marketing yo'nalishida 5 xil konvertatsiya bo'ladigan takliflar asosida App Installs kampaniyalari ishga tushirildi.", result: "CPA(Harajat/mijoz) optimallashtirildi va 10 000+ yangi organik va aktiv mijozlar app orqali xarid qilishni boshladi." },
];

const ProjectDetail = () => {
  const { id } = useParams();
  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { t, theme } = useAppContext();

  useEffect(() => {
    const fetchProject = async () => {
      if (!id) return;
      setLoading(true);
      
      const isDummy = defaultProjects.find(p => p.id === id);
      if (isDummy) {
        setProject({
          ...isDummy,
          createdAt: new Date().toISOString()
        });
        setLoading(false);
        return;
      }

      try {
        const docRef = doc(db, 'projects', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProject({ id: docSnap.id, ...docSnap.data() });
        }
      } catch (e) {
        console.error(e);
      }
      setLoading(false);
    };
    fetchProject();
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-[#050505]">
       <div className="ui-loader"><div></div><div></div></div>
    </div>
  );

  if (!project) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#050505] text-white">
       <h1 className="text-4xl font-black mb-4">{t("projects.empty")}</h1>
       <Link to="/projects" className="text-accent underline">{t("projects.detail.back")}</Link>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#050505] text-white pb-24">
      {/* Hero */}
      <div className="relative h-[60vh] overflow-hidden">
        <img 
          src={project.image} 
          alt={project.title} 
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover opacity-40 scale-105" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent" />
        <div className="absolute inset-0 flex items-end">
          <div className="container mx-auto px-6 pb-20">
             <Link to="/projects" className="inline-flex items-center gap-2 text-white/40 hover:text-white mb-8 transition-colors">
               <ArrowLeft size={20} /> {t("projects.detail.back")}
             </Link>
             <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-6xl md:text-8xl font-black uppercase italic tracking-tighter leading-none mb-4"
             >
               {project.title}
             </motion.h1>
             <p className="text-lg text-accent font-black uppercase tracking-[0.3em]">{project.category}</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 mt-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-16">
          {/* Problem, Solution, Result */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             <motion.div 
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               className="p-10 bg-white/[0.03] border border-white/10 rounded-[2.5rem] space-y-6 relative group overflow-hidden"
             >
                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Logo className="w-20 h-20" />
                </div>
                <div className="w-12 h-12 bg-red-500/10 rounded-2xl flex items-center justify-center text-red-500">
                  <CheckCircle2 size={24} className="rotate-180" />
                </div>
                <div className="space-y-4">
                  <p className="text-[10px] font-black uppercase text-red-500 tracking-[0.3em]">{t("projects.detail.problem")}</p>
                  <p className="text-[15px] text-white/70 leading-relaxed font-hanken">{project.problem || 'Mijoz oldida turgan qiyinchiliklar va asosiy maqsadlar.'}</p>
                </div>
             </motion.div>

             <motion.div 
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: 0.1 }}
               className="p-10 bg-accent/5 border border-accent/20 rounded-[2.5rem] space-y-6 relative group overflow-hidden"
             >
                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Logo className="w-20 h-20" />
                </div>
                <div className="w-12 h-12 bg-accent/20 rounded-2xl flex items-center justify-center text-accent">
                  <CheckCircle2 size={24} />
                </div>
                <div className="space-y-4">
                  <p className="text-[10px] font-black uppercase text-accent tracking-[0.3em]">{t("projects.detail.solution")}</p>
                  <p className="text-[15px] text-white/70 leading-relaxed font-hanken">{project.solution || 'Biz tomonimizdan ishlab chiqilgan strategiya va amalga oshirilgan ishlar.'}</p>
                </div>
             </motion.div>

             <motion.div 
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: 0.2 }}
               className="p-10 bg-green-500/5 border border-green-500/20 rounded-[2.5rem] space-y-6 relative group border-t-4 border-t-green-500 overflow-hidden"
             >
                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Logo className="w-20 h-20" />
                </div>
                <div className="w-12 h-12 bg-green-500/20 rounded-2xl flex items-center justify-center text-green-500">
                  <CheckCircle2 size={24} />
                </div>
                <div className="space-y-4">
                  <p className="text-[10px] font-black uppercase text-green-500 tracking-[0.3em]">{t("projects.detail.result")}</p>
                  <p className="text-[15px] text-white/70 leading-relaxed font-hanken font-bold">{project.result || 'Loyiha yakunida erishilgan ko\'rsatkichlar va yakuniy xulosa.'}</p>
                </div>
             </motion.div>
          </div>

          {/* Links & Video */}
          <div className="flex flex-wrap gap-4">
            {project.link && (
               <a 
                href={project.link} 
                target="_blank" 
                rel="noreferrer"
                className="px-8 py-5 bg-white text-black font-black uppercase text-[10px] tracking-widest rounded-full flex items-center gap-2 hover:bg-accent hover:text-white transition-all"
               >
                 {t("projects.detail.view_live")} <ExternalLink size={14} />
               </a>
            )}
            {project.video && (
               <a 
                href={project.video} 
                target="_blank" 
                rel="noreferrer"
                className="px-8 py-5 bg-accent text-white font-black uppercase text-[10px] tracking-widest rounded-full flex items-center gap-2 hover:bg-white hover:text-black transition-all"
               >
                 {t("projects.detail.view_video")} <Play size={14} fill="currentColor" />
               </a>
            )}
          </div>

          {/* Gallery */}
          <div className="space-y-8">
             <h3 className="text-3xl font-black uppercase italic italic tracking-tighter">{t("projects.detail.gallery")}</h3>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="aspect-video bg-white/5 rounded-3xl overflow-hidden border border-white/5">
                   <img src={project.image} alt="Gallery 1" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
                {project.gallery && project.gallery.map((img: string, i: number) => (
                  <div key={i} className="aspect-video bg-white/5 rounded-3xl overflow-hidden border border-white/5">
                    <img src={img} alt={`Gallery ${i}`} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                ))}
             </div>
          </div>
        </div>

        {/* Sidebar info */}
        <div className="lg:col-span-1">
           <div className="sticky top-32 p-8 bg-white/[0.02] border border-white/5 rounded-[2.5rem] space-y-8">
              <div>
                 <p className="text-[10px] font-black uppercase text-white/20 tracking-widest mb-2">{t("projects.detail.client")}</p>
                 <p className="font-black text-xl uppercase italic">Loyihador hamkor</p>
              </div>
              <div className="h-[1px] bg-white/5" />
              <div>
                 <p className="text-[10px] font-black uppercase text-white/20 tracking-widest mb-2">{t("projects.detail.date")}</p>
                 <p className="font-black text-xl uppercase italic">{new Date(project.createdAt).toLocaleDateString()}</p>
              </div>
              <div className="h-[1px] bg-white/5" />
              <div>
                 <p className="text-[10px] font-black uppercase text-white/20 tracking-widest mb-2">{t("projects.detail.category")}</p>
                 <p className="font-black text-xl uppercase italic">{project.type}</p>
              </div>
              <div className="pt-4">
                 <button className="w-full py-5 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all">
                    {t("projects.detail.similar")}
                 </button>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
