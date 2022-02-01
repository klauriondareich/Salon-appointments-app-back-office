// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import * as firebase from "firebase/app";
import 'firebase/firestore';
import 'firebase/storage';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyA6SdpsUu_Xum2TXxpdjAJueTchKqOYqUA",
  authDomain: "baber-test.firebaseapp.com",
  projectId: "baber-test",
  storageBucket: "baber-test.appspot.com",
  messagingSenderId: "300507373279",
  appId: "1:300507373279:web:2841e872e7feb54e11936a",
  measurementId: "G-PVHEM95NKZ"
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
export default firebaseApp