import React, { useState } from 'react';
import { db } from '../lib/firebase';
import { doc, updateDoc, deleteDoc, addDoc, collection } from 'firebase/firestore';
import { Edit2, Trash2, X, Plus } from 'lucide-react';
import { useAdmin } from './AdminProvider';

interface ProjectEditorProps {
  project?: any;
  onClose?: () => void;
  isAdd?: boolean;
}

export const ProjectEditor: React.FC<ProjectEditorProps> = ({ project, onClose, isAdd }) => {
  const [formData, setFormData] = useState(project || { title: "", category: "", image: "", type: "Marketing" });
  const { isAdmin } = useAdmin();

  const handleSave = async () => {
    if (!isAdmin) return;
    try {
      if (isAdd) {
        await addDoc(collection(db, "projects"), { ...formData, order: Date.now() });
      } else {
        await updateDoc(doc(db, "projects", project.id), formData);
      }
      onClose?.();
    } catch (err) {
      alert("Xatolik: " + err);
    }
  };

  return (
    <div className="fixed inset-0 z-[300] bg-black/80 backdrop-blur-md flex items-center justify-center p-6">
      <div className="w-full max-w-xl glass p-10 rounded-[3rem] space-y-8 relative">
        <button onClick={onClose} className="absolute top-8 right-8 text-white/40 hover:text-white transition-opacity">
          <X size={24} />
        </button>
        <h3 className="text-3xl font-display font-black italic">{isAdd ? "Yangi loyiha" : "Loyihani tahrirlash"}</h3>
        
        <div className="grid grid-cols-1 gap-6">
          <input 
            value={formData.title}
            onChange={e => setFormData({...formData, title: e.target.value})}
            className="w-full bg-black/40 border border-white/5 rounded-2xl p-4 outline-none focus:border-accent" 
            placeholder="Sarlavha"
          />
          <input 
            value={formData.category}
            onChange={e => setFormData({...formData, category: e.target.value})}
            className="w-full bg-black/40 border border-white/5 rounded-2xl p-4 outline-none focus:border-accent" 
            placeholder="Kategoriya (ko'rinishi)"
          />
          <input 
            value={formData.image}
            onChange={e => setFormData({...formData, image: e.target.value})}
            className="w-full bg-black/40 border border-white/5 rounded-2xl p-4 outline-none focus:border-accent" 
            placeholder="Rasm URL"
          />
          <select 
            value={formData.type}
            onChange={e => setFormData({...formData, type: e.target.value})}
            className="w-full bg-black/40 border border-white/5 rounded-2xl p-4 outline-none focus:border-accent"
          >
            <option value="Marketing">Marketing</option>
            <option value="Web site">Web site</option>
            <option value="CRM">CRM</option>
            <option value="Infografik">Infografik</option>
            <option value="Banner">Banner</option>
          </select>
        </div>

        <button onClick={handleSave} className="btn-primary-site w-full py-5 text-sm uppercase">
          Saqlash
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
