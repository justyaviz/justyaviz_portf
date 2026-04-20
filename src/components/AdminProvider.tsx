import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth, db } from '../firebase';
import { onAuthStateChanged, User, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { doc, onSnapshot, setDoc, serverTimestamp } from 'firebase/firestore';

interface AdminContextType {
  user: User | null;
  isAdmin: boolean;
  isEditMode: boolean;
  setEditMode: (val: boolean) => void;
  siteContent: any;
  updateContent: (key: string, value: string) => Promise<void>;
  loading: boolean;
  loginWithGoogle: () => Promise<void>;
  logoutAdmin: () => Promise<void>;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

const ADMIN_EMAILS = ['yahyobektohirjonov0@gmail.com'];

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isEditMode, setEditMode] = useState(localStorage.getItem('admin_edit_mode') === 'true');
  const [siteContent, setSiteContent] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const isAdmin = !!user && (ADMIN_EMAILS.includes(user.email?.toLowerCase() || ''));

  useEffect(() => {
    localStorage.setItem('admin_edit_mode', isEditMode.toString());
  }, [isEditMode]);

  useEffect(() => {
    const unsubAuth = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    }, (err) => {
      console.error("Auth state error:", err);
      setLoading(false);
    });

    const unsubContent = onSnapshot(doc(db, "siteContent", "main"), (d) => {
      if (d.exists()) setSiteContent(d.data());
      else setSiteContent({});
    }, (err) => {
      console.warn("Content subscription error:", err);
    });

    return () => {
      unsubAuth();
      unsubContent();
    };
  }, []);

  const loginWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (err) {
      console.error("Login error:", err);
      alert("Login xatosi: " + (err instanceof Error ? err.message : String(err)));
    }
  };

  const logoutAdmin = async () => {
    try {
      await signOut(auth);
      setEditMode(false);
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  const updateContent = async (key: string, value: string) => {
    if (!isAdmin) {
      alert("Siz admin emassiz yoki tizimga kirmagansiz!");
      return;
    }
    try {
      await setDoc(doc(db, "siteContent", "main"), { 
        [key]: value,
        updatedAt: serverTimestamp()
      }, { merge: true });
    } catch (err) {
      console.error("Content update error:", err);
      alert("Saqlashda xato: " + (err instanceof Error ? err.message : String(err)));
    }
  };

  return (
    <AdminContext.Provider value={{ 
      user, 
      isAdmin, 
      isEditMode, 
      setEditMode, 
      siteContent, 
      updateContent, 
      loading,
      loginWithGoogle,
      logoutAdmin
    }}>
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
