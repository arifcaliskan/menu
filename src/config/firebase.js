
import { initializeApp } from "firebase/app";
import {getStorage} from 'firebase/storage'
import {getFirestore} from 'firebase/firestore'
import {getAuth} from 'firebase/auth'
const firebaseConfig = {
  apiKey: "AIzaSyA7EqnZ6MvSJhNMPE-PrmVqi6F3qkYO0Qc",
  authDomain: "menu-87fcd.firebaseapp.com",
  projectId: "menu-87fcd",
  storageBucket: "menu-87fcd.appspot.com",
  messagingSenderId: "89090900697",
  appId: "1:89090900697:web:0318a97d957ef1537af4c8"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)
export const db = getFirestore(app)
export const auth = getAuth(app)