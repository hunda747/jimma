import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';
import 'firebase/compat/firestore';

//import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-app.js";

const firebaseConfig = {
  apiKey: "AIzaSyBQ4z-b83m0CG3aZfUoP8lA5dcu_jQivAY",
  authDomain: "jimma-36404.firebaseapp.com",
  databaseURL: "https://jimma-36404-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "jimma-36404",
  storageBucket: "jimma-36404.appspot.com",
  messagingSenderId: "273456066478",
  appId: "1:273456066478:web:008ee1887990a46fd1a23f",
  measurementId: "G-4LY68PQN88"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const projectStorage = firebase.storage();
const projectFirestore = firebase.firestore();
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export { projectStorage, projectFirestore, timestamp };
