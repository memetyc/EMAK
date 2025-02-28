import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyBcP-y3Mb-JAbVJTKFefRF0sfxh-bAOWM4",
  authDomain: "emak-f7a12.firebaseapp.com",
  projectId: "emak-f7a12",
  storageBucket: "emak-f7a12.firebasestorage.app",
  messagingSenderId: "763613491688",
  appId: "1:763613491688:web:7e1df67ad0bc578da9f45d"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app); 