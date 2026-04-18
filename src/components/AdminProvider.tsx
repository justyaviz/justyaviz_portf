import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth, db } from '../lib/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';

interface AdminContextType {
  user: User | null;
  isAdmin: boolean;
  isEditMode: boolean;
  setEditMode: (val: boolean) => void;
  siteContent: any;
  updateContent: (key: string, value: string) => Promise<void>;
  loading: boolean;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isEditMode, setEditMode] = useState(false);
  const [siteContent, setSiteContent] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const isAdmin = user?.email === 'yahyobektohirjonov0@gmail.com';

  useEffect(() => {
    const unsubAuth = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });

    const unsubContent = onSnapshot(doc(db, "siteContent", "main"), (d) => {
      if (d.exists()) setSiteContent(d.data());
    });

    return () => {
      unsubAuth();
      unsubContent();
    };
  }, []);

  const updateContent = async (key: string, value: string) => {
    if (!isAdmin) return;
    try {
      await setDoc(doc(db, "siteContent", "main"), { [key]: value }, { merge: true });
    } catch (err) {
      console.error("Content update error:", err);
    }
  };

  return (
    <AdminContext.Provider value={{ user, isAdmin, isEditMode, setEditMode, siteContent, updateContent, loading }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};
