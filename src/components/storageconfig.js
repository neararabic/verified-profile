import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from 'firebase/firestore';
import { collection } from "firebase/firestore";
// Initialize Firebase
const firebaseConfig = {

    apiKey: "AIzaSyBvcOeJbT0Sn6a40Aj2xTfzJRhDt5GnWek",
  
    authDomain: "verified-profile.firebaseapp.com",
  
    projectId: "verified-profile",

    databaseURL:"gs://verified-profile.appspot.com",
  
    storageBucket: "verified-profile.appspot.com",
  
    messagingSenderId: "811507154375",
  
    appId: "1:811507154375:web:a99a1d71c063273cc96de2",
  
    measurementId: "G-MKT1969NCS"
  
  };
 

const app = initializeApp(firebaseConfig);

// Firebase storage reference
const storage = getStorage(app);
const db = getFirestore(app);
export const colRef = collection(db, "Profiles");


export default storage;