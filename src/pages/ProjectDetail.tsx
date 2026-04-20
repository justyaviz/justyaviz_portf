import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { motion } from 'motion/react';
import { ArrowLeft, ExternalLink, Play, CheckCircle2 } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const ProjectDetail = () => {
  const { id } = useParams();
  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { t, theme } = useAppContext();

  useEffect(() => {
    const fetchProject = async () => {
      if (!id) return;
      setLoading(true);
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             <div className="p-8 bg-white/[0.03] border border-white/5 rounded-3xl space-y-4">
                <p className="text-[10px] font-black uppercase text-accent tracking-[0.2em]">{t("projects.detail.problem")}</p>
                <p className="text-sm text-white/60 leading-relaxed">{project.problem || 'Mijoz oldida turgan qiyinchiliklar va asosiy maqsadlar.'}</p>
             </div>
             <div className="p-8 bg-white/[0.03] border border-white/5 rounded-3xl space-y-4">
                <p className="text-[10px] font-black uppercase text-accent tracking-[0.2em]">{t("projects.detail.solution")}</p>
                <p className="text-sm text-white/60 leading-relaxed">{project.solution || 'Biz tomonimizdan ishlab chiqilgan strategiya va amalga oshirilgan ishlar.'}</p>
             </div>
             <div className="p-8 bg-white/[0.03] border border-white/5 rounded-3xl space-y-4">
                <p className="text-[10px] font-black uppercase text-accent tracking-[0.2em]">{t("projects.detail.result")}</p>
                <p className="text-sm text-white/60 leading-relaxed">{project.result || 'Loyiha yakunida erishilgan ko\'rsatkichlar va yakuniy xulosa.'}</p>
             </div>
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
