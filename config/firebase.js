// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBF2ABbh8ZLwXYYvilefNOiIa6PUNGsqpw",
  authDomain: "manager-ddef2.firebaseapp.com",
  projectId: "manager-ddef2",
  storageBucket: "manager-ddef2.appspot.com",
  messagingSenderId: "931298457694",
  appId: "1:931298457694:web:87e5dc063edfb5a1761ccf",
  measurementId: "G-QJSEF1DLKP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)