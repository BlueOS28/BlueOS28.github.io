// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBFoemJhxvAf9Oz8t4w4Y83_72Fq9ubDZ4",
  authDomain: "blueos-35a9b.firebaseapp.com",
  projectId: "blueos-35a9b",
  storageBucket: "blueos-35a9b.firebasestorage.app",
  messagingSenderId: "870175657974",
  appId: "1:870175657974:web:3d9ea0952def602300c1d7",
  measurementId: "G-5ZEELF2PHB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
