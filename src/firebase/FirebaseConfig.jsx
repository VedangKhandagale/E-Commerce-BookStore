// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
import {getAuth} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCK3QuDVPjzVhNXCI0Vs10SKdFjrvsoRMc",
  authDomain: "myfirstapp-24260.firebaseapp.com",
  projectId: "myfirstapp-24260",
  storageBucket: "myfirstapp-24260.appspot.com",
  messagingSenderId: "381793160903",
  appId: "1:381793160903:web:0b0b1701af4476127a78e2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const fireDB = getFirestore(app);
const auth = getAuth(app);

export {fireDB,auth} 