// Import the functions you need from the SDKs you need
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyB4en7IbRPqDWgeRYSZ3TXemzBJCLIYHUI",
  authDomain: "fir-study-9ff19.firebaseapp.com",
  projectId: "fir-study-9ff19",
  storageBucket: "fir-study-9ff19.appspot.com",
  messagingSenderId: "735589317290",
  appId: "1:735589317290:web:094a321dc31b69b7146ed3",
  measurementId: "G-XKK0BTCFZG",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
