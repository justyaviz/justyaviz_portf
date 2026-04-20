import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth, db } from '../firebase';
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
  loginWithPhone: (phone: string) => void;
  logoutAdmin: () => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isEditMode, setEditMode] = useState(false);
  const [siteContent, setSiteContent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [phoneVerified, setPhoneVerified] = useState(localStorage.getItem('admin_phone_verified') === 'true');

  const isAdmin = phoneVerified || (user?.email?.toLowerCase() === 'yahyobektohirjonov0@gmail.com');

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 5000);

    const unsubAuth = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
      clearTimeout(timer);
    });

    const unsubContent = onSnapshot(doc(db, "siteContent", "main"), (d) => {
      if (d.exists()) setSiteContent(d.data());
    }, (err) => {
      console.warn("Content subscription error:", err);
    });

    return () => {
      unsubAuth();
      unsubContent();
      clearTimeout(timer);
    };
  }, []);

  const loginWithPhone = (phone: string) => {
    // Bu yerda haqiqiy Firebase OTP bo'lishi kerak, lekin config o'chirilganligi sababli mock ishlatamiz
    if (phone === "+998931949200") {
      setPhoneVerified(true);
      localStorage.setItem('admin_phone_verified', 'true');
    }
  };

  const logoutAdmin = () => {
    setPhoneVerified(false);
    localStorage.removeItem('admin_phone_verified');
    setUser(null);
  };

  const updateContent = async (key: string, value: string) => {
    if (!isAdmin) return;
    try {
      await setDoc(doc(db, "siteContent", "main"), { [key]: value }, { merge: true });
    } catch (err) {
      console.error("Content update error:", err);
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
      loginWithPhone,
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
