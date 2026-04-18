import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { getFirestore, collection, addDoc, updateDoc, deleteDoc, doc, getDocs, getDoc, query, orderBy, onSnapshot } from 'firebase/firestore';
// Firebase configuration from environment variables
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app, import.meta.env.VITE_FIREBASE_DATABASE_ID || "(default)");
export const googleProvider = new GoogleAuthProvider();

export const loginWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result;
  } catch (error: any) {
    console.error("Login Error:", error);
    if (error.code === 'auth/popup-blocked') {
      alert("Brauzeringizda 'Popup' (qalqib chiquvchi oyna) bloklangan. Iltimos, unga ruxsat bering.");
    } else if (error.code === 'auth/unauthorized-domain') {
      alert("Hozirgi domen Firebase konsolida ruxsat berilgan domenlar ro'yxatida yo'q.");
    } else {
      alert("Kirishda xatolik: " + error.message);
    }
    throw error;
  }
};
export const logout = () => signOut(auth);

// Helper for Firestore errors
export const handleFirestoreError = (error: any) => {
  console.error("Firestore Error:", error);
  throw error;
};
