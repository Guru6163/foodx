import { getFirestore } from "firebase/firestore"
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBuR0SHBBnZ1EQGA_IhsqB7oFwDJ1Hfqik",
  authDomain: "foodx-739e7.firebaseapp.com",
  projectId: "foodx-739e7",
  storageBucket: "foodx-739e7.appspot.com",
  messagingSenderId: "197114508924",
  appId: "1:197114508924:web:a4940a110ee02d7c217bf9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db  = getFirestore(app)