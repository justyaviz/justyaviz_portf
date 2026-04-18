import React, { useState } from 'react';
import { db } from '../lib/firebase';
import { doc, updateDoc, deleteDoc, addDoc, collection } from 'firebase/firestore';
import { Edit2, Trash2, X, Plus, Upload, Link as LinkIcon, Image as ImageIcon, Video as VideoIcon, Play } from 'lucide-react';
import { useAdmin } from './AdminProvider';

interface ProjectEditorProps {
  project?: any;
  onClose?: () => void;
  isAdd?: boolean;
}

// Helper to get YouTube ID
const getYoutubeId = (url: string | undefined) => {
  if (!url || typeof url !== 'string') return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
};

// Helper for image compression
const compressImage = (file: File, maxWidth = 1200, quality = 0.7): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        if (width > maxWidth) {
          height = (maxWidth / width) * height;
          width = maxWidth;
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL('image/jpeg', quality));
      };
      img.onerror = reject;
    };
    reader.onerror = reject;
  });
};

export const ProjectEditor: React.FC<ProjectEditorProps> = ({ project, onClose, isAdd }) => {
  const [formData, setFormData] = useState({
    title: project?.title || "",
    category: project?.category || "",
    image: project?.image || "",
    video: project?.video || "",
    type: project?.type || "Marketing",
    link: project?.link || ""
  });
  const [uploadMode, setUploadMode] = useState<'url' | 'file'>('url');
  const [videoMode, setVideoMode] = useState<'url' | 'file'>('url');
  const [isCompressing, setIsCompressing] = useState(false);
  const { isAdmin } = useAdmin();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>, field: 'image' | 'video') => {
    const file = e.target.files?.[0];
    if (file) {
      if (field === 'image') {
        try {
          setIsCompressing(true);
          const compressed = await compressImage(file);
          setFormData(prev => ({ ...prev, image: compressed }));
        } catch (err) {
          alert("Rasmni siqishda xatolik yuz berdi");
        } finally {
          setIsCompressing(false);
        }
      } else {
        const limit = 5 * 1024 * 1024; // 5MB for video
        if (file.size > limit) {
          alert(`Video hajmi juda katta. Iltimos, URL dan foydalaning.`);
          return;
        }
        const reader = new FileReader();
        reader.onloadend = () => {
          setFormData(prev => ({ ...prev, video: reader.result as string }));
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const handleSave = async () => {
    if (!isAdmin) return;
    try {
      if (isAdd || !project?.id) {
        await addDoc(collection(db, "projects"), { ...formData, order: Date.now() });
      } else {
        await updateDoc(doc(db, "projects", project.id), formData);
      }
      onClose?.();
    } catch (err: any) {
      console.error("Firebase saqlashda xatolik:", err);
      alert("Xatolik: " + (err.message || err));
    }
  };

  const isYoutube = getYoutubeId(formData.video);

  return (
    <div className="fixed inset-0 z-[300] bg-black/80 backdrop-blur-md flex items-center justify-center p-6">
      <div className="w-full max-w-xl glass p-10 rounded-[3rem] space-y-8 relative max-h-[90vh] overflow-y-auto custom-scrollbar">
        <button onClick={onClose} className="absolute top-8 right-8 text-white/40 hover:text-white transition-opacity">
          <X size={24} />
        </button>
        <h3 className="text-3xl font-display font-black italic">{isAdd ? "Yangi loyiha" : "Loyihani tahrirlash"}</h3>
        
        <div className="grid grid-cols-1 gap-6">
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-white/40 ml-4">Sarlavha</label>
            <input 
              value={formData.title}
              onChange={e => setFormData(prev => ({...prev, title: e.target.value}))}
              className="w-full bg-black/40 border border-white/5 rounded-2xl p-4 outline-none focus:border-accent" 
              placeholder="Masalan: Honor X9c Obzor"
            />
          </div>

          <div className="space-y-4">
            <label className="text-[10px] font-bold uppercase tracking-widest text-white/40 ml-4">Muqova rasmi (Thumbnail)</label>
            <div className="flex items-center gap-4 ml-4">
               <button 
                 onClick={() => setUploadMode('url')}
                 className={`text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 transition-colors ${uploadMode === 'url' ? 'text-accent' : 'text-white/20'}`}
               >
                 <LinkIcon size={12} /> URL
               </button>
               <button 
                 onClick={() => setUploadMode('file')}
                 className={`text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 transition-colors ${uploadMode === 'file' ? 'text-accent' : 'text-white/20'}`}
               >
                 <Upload size={12} /> Fayl
               </button>
            </div>

            {(uploadMode === 'file' && isCompressing) && (
              <div className="text-center p-4">
                 <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-2" />
                 <p className="text-[10px] font-bold uppercase tracking-widest text-accent">Rasm optimallashmoqda...</p>
              </div>
            )}

            {uploadMode === 'url' ? (
              <input 
                value={formData.image}
                onChange={e => setFormData(prev => ({...prev, image: e.target.value}))}
                className="w-full bg-black/40 border border-white/5 rounded-2xl p-4 outline-none focus:border-accent" 
                placeholder="Rasm URL manzili"
              />
            ) : (
              <div className="relative group">
                <input 
                  type="file" 
                  onChange={e => handleFileChange(e, 'image')}
                  accept="image/*"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                />
                <div className="w-full bg-black/40 border border-white/5 border-dashed rounded-2xl p-8 flex flex-col items-center justify-center gap-3 text-white/20 group-hover:text-white group-hover:border-white/30 transition-all">
                   <ImageIcon size={32} />
                   <span className="text-xs font-bold uppercase tracking-widest">Rasm tanlang</span>
                </div>
              </div>
            )}
          </div>

          <div className="space-y-4">
            <label className="text-[10px] font-bold uppercase tracking-widest text-white/40 ml-4">Video kontent (Ixtiyoriy)</label>
            <div className="flex items-center gap-4 ml-4">
               <button 
                 onClick={() => setVideoMode('url')}
                 className={`text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 transition-colors ${videoMode === 'url' ? 'text-accent' : 'text-white/20'}`}
               >
                 <LinkIcon size={12} /> Video URL
               </button>
               <button 
                 onClick={() => setVideoMode('file')}
                 className={`text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 transition-colors ${videoMode === 'file' ? 'text-accent' : 'text-white/20'}`}
               >
                 <Upload size={12} /> Video Fayl
               </button>
            </div>

            {videoMode === 'url' ? (
              <input 
                value={formData.video}
                onChange={e => setFormData(prev => ({...prev, video: e.target.value}))}
                className="w-full bg-black/40 border border-white/5 rounded-2xl p-4 outline-none focus:border-accent" 
                placeholder="Video URL (Direct link yoki YouTube)"
              />
            ) : (
              <div className="relative group">
                <input 
                  type="file" 
                  onChange={e => handleFileChange(e, 'video')}
                  accept="video/*"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                />
                <div className="w-full bg-black/40 border border-white/5 border-dashed rounded-2xl p-8 flex flex-col items-center justify-center gap-3 text-white/20 group-hover:text-white group-hover:border-white/30 transition-all">
                   <VideoIcon size={32} />
                   <span className="text-xs font-bold uppercase tracking-widest">Video tanlang</span>
                </div>
              </div>
            )}
            
            {formData.video && (
              <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/10 mt-2 bg-black/40">
                 {isYoutube ? (
                   <div className="w-full h-full flex flex-col items-center justify-center gap-4 text-white/20">
                      <Play size={48} className="text-red-600" />
                      <div className="text-center">
                        <p className="text-xs font-bold uppercase tracking-widest">YouTube Video aniqlandi</p>
                        <p className="text-[10px] opacity-50 mt-1">Preview mavjud emas, lekin saytda ko'rinadi.</p>
                      </div>
                   </div>
                 ) : (
                   <video src={formData.video} className="w-full h-full object-cover" controls />
                 )}
                 <div className="absolute top-2 right-2 px-2 py-1 bg-black/60 backdrop-blur-md rounded-md text-[8px] font-bold uppercase text-white/40">Preview</div>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-white/40 ml-4">Turi</label>
            <select 
              value={formData.type}
              onChange={e => setFormData({...formData, type: e.target.value})}
              className="w-full bg-black/40 border border-white/5 rounded-2xl p-4 outline-none focus:border-accent appearance-none cursor-pointer"
            >
              <option value="Marketing">Marketing (Vertical)</option>
              <option value="YouTube">YouTube (16:9 Landscape)</option>
              <option value="Web site">Web site</option>
              <option value="CRM">CRM</option>
              <option value="Infografik">Infografik</option>
              <option value="Banner">Banner</option>
            </select>
          </div>
        </div>

        <button onClick={handleSave} className="btn-primary-site w-full py-5 text-sm uppercase font-black tracking-widest">
          Lohiyani saqlash
        </button>
      </div>
    </div>
  );
};

export const ProjectControls: React.FC<{ project: any }> = ({ project }) => {
  const { isEditMode, isAdmin } = useAdmin();
  const [isEditing, setIsEditing] = useState(false);

  if (!isEditMode || !isAdmin) return null;

  const handleDelete = async () => {
    if (!project.id) {
       alert("Bu namunaviy loyiha. Uni o'chirib bo'lmaydi. Birinchi haqiqiy loyihangizni qo'shishingiz bilan barcha namunalar o'zi yo'qolib ketadi.");
       return;
    }
    if (confirm("Loyihani o'chirmoqchimisiz?")) {
      await deleteDoc(doc(db, "projects", project.id));
    }
  };

  return (
    <>
      <div className="absolute top-4 right-4 flex gap-2 z-50">
        <button 
          onClick={(e) => { e.stopPropagation(); setIsEditing(true); }}
          className="p-3 bg-white text-black rounded-xl hover:scale-110 transition-transform shadow-xl"
        >
          <Edit2 size={16} />
        </button>
        <button 
          onClick={(e) => { e.stopPropagation(); handleDelete(); }}
          className="p-3 bg-red-600 text-white rounded-xl hover:scale-110 transition-transform shadow-xl"
        >
          <Trash2 size={16} />
        </button>
      </div>
      {isEditing && <ProjectEditor project={project} onClose={() => setIsEditing(false)} />}
    </>
  );
};

export const AddProjectBtn: React.FC = () => {
  const { isEditMode, isAdmin } = useAdmin();
  const [isAdding, setIsAdding] = useState(false);

  if (!isEditMode || !isAdmin) return null;

  return (
    <>
      <button 
        onClick={() => setIsAdding(true)}
        className="w-full py-10 border-2 border-dashed border-white/10 rounded-[3rem] flex flex-col items-center justify-center gap-4 text-white/20 hover:text-white hover:border-white/30 transition-all group"
      >
        <div className="w-16 h-16 rounded-full border border-current flex items-center justify-center group-hover:scale-110 transition-transform">
          <Plus size={32} />
        </div>
        <span className="text-xs font-bold uppercase tracking-widest">Yangi loyiha qo'shish</span>
      </button>
      {isAdding && <ProjectEditor isAdd onClose={() => setIsAdding(false)} />}
    </>
  );
};
