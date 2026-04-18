import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { getFirestore, collection, addDoc, updateDoc, deleteDoc, doc, getDocs, getDoc, query, orderBy, onSnapshot } from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
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
