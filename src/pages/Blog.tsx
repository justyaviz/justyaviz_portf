import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { MoveRight } from "lucide-react";

export default function Blog() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, "blogPosts"), orderBy("createdAt", "desc"));
    const unsub = onSnapshot(q, (snapshot) => {
      setBlogs(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    });
    return () => unsub();
  }, []);

  return (
    <div className="pt-32 pb-20 px-6 min-h-screen">
      <div className="max-w-7xl mx-auto space-y-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-accent">Blog & Yangiliklar</span>
          <h1 className="text-5xl md:text-8xl font-satoshi font-medium tracking-tighter text-[var(--text-primary)]">
            So'nggi Maqolalar
          </h1>
        </motion.div>

        {loading ? (
           <div className="flex justify-center py-20">
             <div className="ui-loader">
               <div></div>
               <div></div>
             </div>
           </div>
        ) : blogs.length === 0 ? (
           <div className="py-20 text-center"><p className="text-xl text-[var(--text-secondary)] font-medium">Hozircha maqolalar qo'shilmagan.</p></div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((post, i) => (
              <motion.div 
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="group cursor-pointer ui-magic-card"
              >
                 <div className="flex flex-col h-full bg-[var(--bg-secondary)] border border-[var(--border-primary)] rounded-[2.5rem] overflow-hidden m-px">
                   <div className="aspect-[4/3] overflow-hidden bg-white/5 shrink-0">
                      {post.image ? <img src={post.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={post.title} /> : <div className="w-full h-full bg-accent/10" />}
                   </div>
                   <div className="p-8 space-y-4 flex-1 flex flex-col items-start relative z-10 transition-all">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-secondary)]">
                        {new Date(post.createdAt).toLocaleDateString("en-US", { year: 'numeric', month: 'short', day: 'numeric' })}
                      </p>
                      <h3 className="text-2xl font-bold font-satoshi tracking-tight text-[var(--text-primary)] leading-snug">
                        {post.title}
                      </h3>
                      <p className="text-[15px] font-medium text-[var(--text-secondary)] line-clamp-3">
                        {post.excerpt}
                      </p>
                      <div className="mt-auto pt-4 flex items-center gap-2 text-accent font-bold text-sm uppercase tracking-widest group-hover:gap-4 transition-all">
                         O'qish <MoveRight size={16} />
                      </div>
                   </div>
                 </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
