import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { 
  ArrowLeft, 
  Clock, 
  Calendar, 
  Share2, 
  Tag, 
  ChevronRight,
  TrendingUp,
  Mail,
  User
} from "lucide-react";
import { db } from "../firebase";
import { collection, query, where, getDocs, limit } from "firebase/firestore";
import { useAppContext } from "../context/AppContext";

export default function BlogPostDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { t } = useAppContext();
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      const q = query(collection(db, "blogPosts"), where("slug", "==", slug), limit(1));
      const querySnapshot = await getDocs(q);
      
      if (!querySnapshot.empty) {
        setPost({ id: querySnapshot.docs[0].id, ...querySnapshot.docs[0].data() });
      } else {
        // Try to fetch by ID if slug fails
        // navigate('/blog'); 
      }
      setLoading(false);
    };

    fetchPost();
  }, [slug]);

  if (loading) return (
    <div className="min-h-screen bg-[var(--bg-primary)] flex items-center justify-center">
       <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin" />
    </div>
  );

  if (!post) return (
    <div className="min-h-screen bg-[var(--bg-primary)] flex flex-col items-center justify-center space-y-8">
       <h1 className="text-4xl font-black italic uppercase">Maqola topilmadi</h1>
       <Link to="/blog" className="ui-btn-galaxy px-12 py-5 rounded-full uppercase text-xs tracking-widest">
          Blogga qaytish
       </Link>
    </div>
  );

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] py-20 px-6">
      <div className="max-w-4xl mx-auto space-y-12">
        <Link to="/blog" className="inline-flex items-center gap-3 text-accent font-black uppercase tracking-[0.2em] text-[10px] hover:gap-5 transition-all">
           <ArrowLeft size={16} /> Blogga qaytish
        </Link>

        {/* HERO */}
        <header className="space-y-8">
           <div className="flex items-center gap-4">
              <span className="px-4 py-1 bg-accent text-white text-[10px] font-black uppercase tracking-widest rounded-full">{post.category || "Maqola"}</span>
              <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-[var(--text-secondary)] opacity-60">
                 <div className="flex items-center gap-2">
                    <Calendar size={14} />
                    {post.createdAt ? new Date(post.createdAt.toDate()).toLocaleDateString() : 'Yaqinda'}
                 </div>
                 <div className="flex items-center gap-2">
                    <Clock size={14} />
                    {post.readingTime || '5 min'} o'qish
                 </div>
              </div>
           </div>
           
           <h1 className="text-4xl md:text-7xl font-black tracking-tighter italic uppercase leading-[0.95]">
              {post.title}
           </h1>

           <div className="aspect-[21/9] rounded-[3rem] overflow-hidden border border-[var(--border-primary)] shadow-2xl">
              <img 
                src={post.image || "https://picsum.photos/seed/blog/1920/1080"} 
                alt={post.title} 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
           </div>
        </header>

        {/* CONTENT */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-16">
           <div className="lg:col-span-3 space-y-12 pb-20">
              <div className="prose prose-invert prose-accent max-w-none">
                 <p className="text-xl md:text-2xl font-medium italic text-[var(--text-secondary)] leading-relaxed border-l-4 border-accent pl-8 py-4">
                    {post.excerpt}
                 </p>
                 <div 
                   className="mt-12 text-lg leading-relaxed space-y-6 font-medium text-[var(--text-primary)]/90"
                   dangerouslySetInnerHTML={{ __html: post.content }} 
                 />
              </div>

              {/* Tags */}
              {post.tags && (
                <div className="flex flex-wrap gap-3 pt-12 border-t border-[var(--border-primary)]">
                   {post.tags.map((tag: string, i: number) => (
                     <span key={i} className="px-4 py-2 bg-[var(--text-primary)]/5 rounded-full text-xs font-bold text-accent italic">#{tag}</span>
                   ))}
                </div>
              )}
           </div>

           {/* Sidebar */}
           <aside className="space-y-12">
              <div className="glass p-8 rounded-[2.5rem] border-[var(--border-primary)] space-y-6 sticky top-24">
                 <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-accent mb-4">
                    <img src="https://yt3.googleusercontent.com/7c66P3YnmaqgNiVybbisloEC64VHRMgdHJAifzqvnTsrZvuoWRnNJYsibF9eMtow3umhZeMlrA=s900-c-k-c0x00ffffff-no-rj" alt="Just Yaviz" className="w-full h-full object-cover"  referrerPolicy="no-referrer" />
                 </div>
                 <div className="space-y-1">
                    <h4 className="font-black italic uppercase tracking-tighter text-sm">Yahyobek Tohirjonov</h4>
                    <p className="text-[10px] font-bold text-accent uppercase tracking-widest">Digital Strategist</p>
                 </div>
                 <p className="text-xs text-[var(--text-secondary)] leading-relaxed italic font-medium opacity-70">
                    SMM tizimlari va kontent strategiyasi bo'yicha ekspert. Just Yaviz brendi asoschisi.
                 </p>
                 <div className="pt-6 border-t border-[var(--border-primary)] space-y-4">
                    <button className="w-full flex items-center justify-between text-[11px] font-black uppercase tracking-widest text-accent group">
                       Ulashish <Share2 size={16} className="group-hover:rotate-12 transition-transform" />
                    </button>
                    <Link to="/contact" className="w-full flex items-center justify-between text-[11px] font-black uppercase tracking-widest text-[var(--text-secondary)] opacity-60 hover:opacity-100 transition-opacity">
                       Feedback <Mail size={16} />
                    </Link>
                 </div>
              </div>
           </aside>
        </div>
      </div>
    </div>
  );
}
