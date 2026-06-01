// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAHfvNq4vsjKRBprDY5CmbaWd4zzNz6nS8",
  authDomain: "webchaturos.firebaseapp.com",
  projectId: "webchaturos",
  storageBucket: "webchaturos.firebasestorage.app",
  messagingSenderId: "236744714444",
  appId: "1:236744714444:web:125d63e2337d4eed593a69",
  measurementId: "G-32GDKDVX3P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
