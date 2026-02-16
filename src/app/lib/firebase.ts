import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDQAw4V_PFBODwbY3JuypbblaIcR_WpwYM",
  authDomain: "smartpharma-pos.firebaseapp.com",
  projectId: "smartpharma-pos",
  storageBucket: "smartpharma-pos.firebasestorage.app",
  messagingSenderId: "796983227852",
  appId: "1:796983227852:web:61e4e19928ad2618275969",
  measurementId: "G-MS3VLWKX38"
};



const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
