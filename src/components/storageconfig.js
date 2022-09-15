import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
 
// Initialize Firebase
const app = initializeApp ({
    apiKey: "AIzaSyBvcOeJbT0Sn6a40Aj2xTfzJRhDt5GnWek",

    authDomain: "verified-profile.firebaseapp.com",
  
    projectId: "verified-profile",
  
    storageBucket: "verified-profile.appspot.com",
  
    messagingSenderId: "811507154375",
  
    appId: "1:811507154375:web:a99a1d71c063273cc96de2",
  
    measurementId: "G-MKT1969NCS",
});
 
// Firebase storage reference
const storage = getStorage(app);
export default storage;