// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from "firebase/auth"
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAR4Rn9KXhNWBJeJyeRUFWJhV8kNNPI7SI",
  authDomain: "the-socialreact.firebaseapp.com",
  projectId: "the-socialreact",
  storageBucket: "the-socialreact.appspot.com",
  messagingSenderId: "363148420628",
  appId: "1:363148420628:web:f33cadf1d4fd6d8aa56901"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)
export const auth = getAuth(app)
export const Provider = new GoogleAuthProvider();