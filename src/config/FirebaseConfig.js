// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from 'firebase/firestore'
const firebaseConfig = {
  apiKey: "AIzaSyDh9gj4cYDBc3TnLZ0EI9XHiMyb1Z7n79g",
  authDomain: "had-chat-app.firebaseapp.com",
  projectId: "had-chat-app",
  storageBucket: "had-chat-app.appspot.com",
  messagingSenderId: "2613865723",
  appId: "1:2613865723:web:ce36b1e1fbbc1162fe945e"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore();