// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
const firebaseConfig = {
  apiKey: import.meta.env.VITE_REACT_APP_FIREBASE_APIKEY,
  authDomain: import.meta.env.VITE_REACT_APP_FIREBASE_AUTHDOMAIN,
  projectId: import.meta.env.VITE_REACT_APP_FIREBASE_PROJECTID,
  storageBucket: import.meta.env.VITE_REACT_APP_FIREBASE_STORAGEBUCKET,
  messagingSenderId: import.meta.env.VITE_REACT_APP_FIREBASE_MESSAGINGSENDERID,
  appId: import.meta.env.VITE_REACT_APP_FIREBASE_APPID,
  measurementId: import.meta.env.VITE_REACT_APP_FIREBASE_MEASUREMENTS,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
