// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAy8DtBUS7tIDzK2CG0PZETDJ9BDYQolUc",
  authDomain: "busy-buy-2.firebaseapp.com",
  projectId: "busy-buy-2",
  storageBucket: "busy-buy-2.appspot.com",
  messagingSenderId: "686727958074",
  appId: "1:686727958074:web:26d33c65505c461983af03"
};

// Initialize Firebase
 const app = initializeApp(firebaseConfig);
 export const db = getFirestore(app);