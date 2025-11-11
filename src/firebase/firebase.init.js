// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAVsoCalTQp8-R2f7mur8hSahrWx56Rn-o",
  authDomain: "plate-share-a7f54.firebaseapp.com",
  projectId: "plate-share-a7f54",
  storageBucket: "plate-share-a7f54.firebasestorage.app",
  messagingSenderId: "993196220689",
  appId: "1:993196220689:web:1226cf9297597b5ebb6cb0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);