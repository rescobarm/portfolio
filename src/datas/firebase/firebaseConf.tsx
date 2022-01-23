
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const firebaseApp = initializeApp({
    apiKey: 'AIzaSyBDnm9msbssTDEIKgqO9Gqp5CnAlmoKMws',
    authDomain: 'fb-maadre-db.firebaseapp.com',
    projectId: 'fb-maadre-db'
  });
export const db = getFirestore();