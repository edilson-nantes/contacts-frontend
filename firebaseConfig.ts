// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBn__5aJ3635SxoRGDNJOxVcbChkDYQH9c",
  authDomain: "contacts-app-20e9f.firebaseapp.com",
  projectId: "contacts-app-20e9f",
  storageBucket: "contacts-app-20e9f.firebasestorage.app",
  messagingSenderId: "375759361348",
  appId: "1:375759361348:web:4383573cb774b0af493311"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);