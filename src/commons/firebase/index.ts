// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
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
