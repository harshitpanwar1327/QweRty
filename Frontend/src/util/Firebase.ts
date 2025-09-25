import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBVjBcK13yuqmA8BAt9jEdxUM1TC_hHXNU",
  authDomain: "qwerty-365eb.firebaseapp.com",
  projectId: "qwerty-365eb",
  storageBucket: "qwerty-365eb.firebasestorage.app",
  messagingSenderId: "310417823587",
  appId: "1:310417823587:web:1107d8a0269afe33c36556"
};

const app = initializeApp(firebaseConfig);
export const auth=getAuth(app);