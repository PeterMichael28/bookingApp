import { getApp, initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCtCBSmgj_1pbMQUSQwma61bHMyffoGbDQ",
  authDomain: "bookingapp-f2a95.firebaseapp.com",
  projectId: "bookingapp-f2a95",
  storageBucket: "bookingapp-f2a95.appspot.com",
  messagingSenderId: "892640110435",
  appId: "1:892640110435:web:00fb83d2cd63d84f521556",
  measurementId: "G-GTDCVH42KZ"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore();

export {auth,db};