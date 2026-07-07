// Import the Firebase functions we need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC8mfVNXMg0NT1QklxfZpzcAppN0plT00Q",
  authDomain: "terrathread-store-b4116.firebaseapp.com",
  projectId: "terrathread-store-b4116",
  storageBucket: "terrathread-store-b4116.firebasestorage.app",
  messagingSenderId: "159245559943",
  appId: "1:159245559943:web:6acf7c34fd7fccc1c47022",
  measurementId: "G-5ED35F236X",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Authentication (for login/signup)
export const auth = getAuth(app);

// Initialize Firestore Database (for orders, cart, reviews, etc.)
export const db = getFirestore(app);

export default app;