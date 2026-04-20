import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { doc, setDoc, increment, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

export default function AnalyticsTracker() {
  const location = useLocation();

  useEffect(() => {
    const trackEvent = async () => {
      try {
        const today = new Date().toISOString().split('T')[0];
        const dateRef = doc(db, 'analytics', today);
        
        let shouldIncrementVisitor = false;
        if (!sessionStorage.getItem('visited')) {
          sessionStorage.setItem('visited', 'true');
          shouldIncrementVisitor = true;
        }

        const dateSnap = await getDoc(dateRef);
        
        if (!dateSnap.exists()) {
           await setDoc(dateRef, {
             date: today,
             visitors: 1,
             pageviews: 1,
             updatedAt: new Date().toISOString()
           });
        } else {
           await setDoc(dateRef, {
             visitors: shouldIncrementVisitor ? increment(1) : increment(0),
             pageviews: increment(1),
             updatedAt: new Date().toISOString()
           }, { merge: true });
        }
      } catch (err) {
        console.error("Analytics error", err);
      }
    };

    trackEvent();
  }, [location.pathname]);

  return null;
}
