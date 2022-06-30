// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import * as firebase from "firebase/app";
import 'firebase/firestore';
import 'firebase/storage';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCk-7oMvivFqNd7Xg2w2ccobh6J78ANMwc",
  authDomain: "bioutycall-6a71e.firebaseapp.com",
  projectId: "bioutycall-6a71e",
  storageBucket: "bioutycall-6a71e.appspot.com",
  messagingSenderId: "322009058902",
  appId: "1:322009058902:web:3278c543c5396ce901b5f7",
  measurementId: "G-NV34T7YGP6"
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
export default firebaseApp


//firebase deploy --only hosting:manager-bioutycall