// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getFirestore} from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCsQdk24P8BBRIV676iwZqpQJsnuOAiY4o",
  authDomain: "expense-tracker-fda60.firebaseapp.com",
  projectId: "expense-tracker-fda60",
  storageBucket: "expense-tracker-fda60.appspot.com",
  messagingSenderId: "250057478691",
  appId: "1:250057478691:web:707cf5d2fc37c67c26d796"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db =  getFirestore(app)