import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { 
  Search, 
  ArrowRight, 
  Clock, 
  Calendar, 
  Tag, 
  ChevronRight,
  TrendingUp,
  Newspaper
} from "lucide-react";
import { Link } from "react-router-dom";
import { db } from "../firebase";
import { collection, onSnapshot, query, orderBy, where } from "firebase/firestore";
import { useAppContext } from "../context/AppContext";

export default function Blog() {
  const { t } = useAppContext();
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const q = query(
      collection(db, "blogPosts"), 
      where("published", "==", true),
      orderBy("createdAt", "desc")
    );
    
    const unsub = onSnapshot(q, (snapshot) => {
      setPosts(snapshot.docs.map(d => ({ id: d.id, ...d.data() })));
      setLoading(false);
    });
    return unsub;
  }, []);

  const filteredPosts = posts.filter(p => 
    p.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.excerpt?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] py-20 px-6">
      <div className="max-w-7xl mx-auto space-y-20">
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-8">
           <div className="space-y-4">
              <span className="text-accent text-[10px] font-black uppercase tracking-[0.5em]">{t("blog.badge") || "Insights & Knowledge"}</span>
              <h1 className="text-5xl md:text-8xl font-black tracking-tighter italic uppercase leading-none">
                 Marketolog <br /> <span className="text-accent">Kundaligi</span>
              </h1>
           </div>
           <div className="relative w-full md:w-96">
              <input 
                type="text" 
                placeholder="Maqola qidirish..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-[var(--text-primary)]/5 border border-[var(--border-primary)] rounded-full px-8 py-5 text-sm font-medium focus:border-accent focus:outline-none pl-14 shadow-lg"
              />
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-accent" size={20} />
           </div>
        </header>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-96 rounded-[3rem] bg-[var(--text-primary)]/5 animate-pulse" />
            ))}
          </div>
        ) : filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
             {filteredPosts.map((post, i) => (
                <motion.article 
                   key={post.id}
                   initial={{ opacity: 0, y: 20 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true }}
                   transition={{ delay: i * 0.1 }}
                   className="group relative flex flex-col h-full bg-[var(--bg-primary)] border border-[var(--border-primary)] rounded-[3rem] overflow-hidden hover:border-accent/40 hover:shadow-2xl transition-all"
                >
                   <Link to={`/blog/${post.slug || post.id}`} className="absolute inset-0 z-20" />
                   
                   <div className="relative aspect-[16/10] overflow-hidden">
                      {post.image ? (
                        <img 
                          src={post.image} 
                          alt={post.title} 
                          className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000"
                        />
                      ) : (
                        <div className="w-full h-full bg-accent text-white flex items-center justify-center">
                           <Newspaper size={48} />
                        </div>
                      )}
                      <div className="absolute top-6 left-6 px-4 py-2 bg-black/60 backdrop-blur-md border border-white/10 rounded-full flex items-center gap-2">
                         <Tag size={12} className="text-accent" />
                         <span className="text-[10px] font-black uppercase tracking-widest text-white">{post.category || "Marketing"}</span>
                      </div>
                   </div>

                   <div className="p-10 flex-1 flex flex-col space-y-4">
                      <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-[var(--text-secondary)] opacity-60">
                         <div className="flex items-center gap-1">
                            <Calendar size={12} />
                            {post.createdAt ? new Date(post.createdAt.toDate()).toLocaleDateString() : 'Yaqinda'}
                         </div>
                         <div className="flex items-center gap-1">
                            <Clock size={12} />
                            {post.readingTime || '5 min'} o'qish
                         </div>
                      </div>
                      
                      <h2 className="text-2xl font-black tracking-tight uppercase italic group-hover:text-accent transition-colors leading-tight">
                         {post.title}
                      </h2>
                      
                      <p className="text-sm text-[var(--text-secondary)] font-medium leading-relaxed opacity-80 line-clamp-3">
                         {post.excerpt}
                      </p>

                      <div className="pt-6 mt-auto border-t border-[var(--border-primary)] flex items-center justify-between">
                         <span className="text-[11px] font-black uppercase tracking-widest text-accent flex items-center gap-2 group-hover:gap-4 transition-all">
                            O‘qish <ArrowRight size={14} />
                         </span>
                         <div className="w-8 h-8 rounded-full border border-[var(--border-primary)] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <ChevronRight size={14} className="text-[var(--text-secondary)]" />
                         </div>
                      </div>
                   </div>
                </motion.article>
             ))}
          </div>
        ) : (
          <div className="text-center py-40 space-y-6">
             <div className="w-20 h-20 bg-accent/10 text-accent rounded-3xl flex items-center justify-center mx-auto">
                <TrendingUp size={32} />
             </div>
             <div className="space-y-2">
                <h3 className="text-2xl font-black italic uppercase tracking-tighter">Maqolalar Topilmadi</h3>
                <p className="text-[var(--text-secondary)] font-bold text-sm tracking-widest uppercase">Qidiring yoki keyinroq keling.</p>
             </div>
          </div>
        )}
      </div>
    </div>
  );
}
