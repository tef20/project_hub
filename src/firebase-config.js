import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBF3sGQoIGzzZBI8nrOEuuXJTZQ3NwIiJA",
  authDomain: "project-hub-1dc00.firebaseapp.com",
  projectId: "project-hub-1dc00",
  storageBucket: "project-hub-1dc00.appspot.com",
  messagingSenderId: "506494056367",
  appId: "1:506494056367:web:34b4a70763d71430dba15a",
};

let instance = null;

function getFirebase() {
  if (instance) return instance;
  instance = initializeApp(firebaseConfig);
  return instance;
}

const app = getFirebase();
export const firestoreDB = getFirestore(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
