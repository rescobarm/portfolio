// Import the functions you need from the SDKs you need
/*
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore,  collection, getDocs } from 'firebase/firestore';
*/
// TODO: Add SDKs for Firebase products that you want to use
//import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
// Follow this pattern to import other Firebase services
// import { } from 'firebase/<service>';

// TODO: Replace the following with your app's Firebase project configuration

import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyBDnm9msbssTDEIKgqO9Gqp5CnAlmoKMws",
  authDomain: "fb-maadre-db.firebaseapp.com",
  projectId: "fb-maadre-db",
  storageBucket: "fb-maadre-db.appspot.com",
  messagingSenderId: "537228327753",
  appId: "1:537228327753:web:72973e74f3b284493eb898"
};
const firebaseApp = initializeApp({
  apiKey: 'AIzaSyBDnm9msbssTDEIKgqO9Gqp5CnAlmoKMws',
  authDomain: 'fb-maadre-db.firebaseapp.com',
  projectId: 'fb-maadre-db'
});

const db = getFirestore();
export default db;

/*const app = initializeApp(firebaseConfig);
const db = getFirestore(app);*/

// Get a list of cities from your database
/*
async function getCities(db: any) {
  const citiesCol = collection(db, '_itemUserMenu');
  const citySnapshot = await getDocs(citiesCol);
  const cityList = citySnapshot.docs.map(doc => doc.data());
  return cityList;
}*/
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional


// Initialize Firebase
//const app =  initializeApp(firebaseConfig);
//const db = getFirestore(app);
//const analytics = getAnalytics(app);
//export const todosRef = getCities; //.child("todos")
//export default db;