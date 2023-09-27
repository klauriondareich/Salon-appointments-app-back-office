// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import * as firebase from "firebase/app";
import 'firebase/firestore';
import 'firebase/storage';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "3",
  appId: "",
  measurementId: ""
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
export default firebaseApp


//firebase deploy --only hosting:manager-bioutycall
