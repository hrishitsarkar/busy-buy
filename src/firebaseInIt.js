// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB7U51o6KtPCEG4qmmfCK9gJWUT7kCxC-Q",
  authDomain: "busy-buy-b8809.firebaseapp.com",
  projectId: "busy-buy-b8809",
  storageBucket: "busy-buy-b8809.appspot.com",
  messagingSenderId: "310829331274",
  appId: "1:310829331274:web:63f453a65a48aba4bb07b3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
