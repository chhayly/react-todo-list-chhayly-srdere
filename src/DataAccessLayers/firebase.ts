// Initialize Cloud Firestore through Firebase
import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getDatabase } from "firebase/database"


initializeApp({
  apiKey: "AIzaSyDOzqfnUAGVC42n0MoKvSDbceJiI1Ni0jA",
  authDomain: "todo-v2-5b628.firebaseapp.com",
  databaseURL: "https://todo-v2-5b628-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "todo-v2-5b628",
  storageBucket: "todo-v2-5b628.appspot.com",
  messagingSenderId: "1043867628995",
  appId: "1:1043867628995:web:aec184070af313fabc7976",
  measurementId: "G-LC5BPFLJBL"
  });

  const db = getFirestore();

  const dbRT = getDatabase();


export {db ,dbRT} ;