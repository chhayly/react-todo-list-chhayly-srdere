// Initialize Cloud Firestore through Firebase
import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"

const firebaseApp = initializeApp({
    apiKey: "AIzaSyCLnS0xMNUFKCh1h7OKNbTV-S4BrhrIaPc",
    authDomain: "todo-list-4c75e.firebaseapp.com",
    projectId: "todo-list-4c75e",
    storageBucket: "todo-list-4c75e.appspot.com",
    messagingSenderId: "1000536309629",
    appId: "1:1000536309629:web:f87c89f442b34c03bb5614",
    measurementId: "G-SQ86X2T1FJ"
  });

  const db = getFirestore();


export default db;