import React from "react";
import ReactDOM from "react-dom";
import "./styles/reset.css";
import "./styles/style.css";
import App from "./components/App";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBF3sGQoIGzzZBI8nrOEuuXJTZQ3NwIiJA",
  authDomain: "project-hub-1dc00.firebaseapp.com",
  projectId: "project-hub-1dc00",
  storageBucket: "project-hub-1dc00.appspot.com",
  messagingSenderId: "506494056367",
  appId: "1:506494056367:web:34b4a70763d71430dba15a",
};

initializeApp(firebaseConfig);
const db = getFirestore();
const colRef = collection(db, "projects");
getDocs(colRef).then((snapshot) => {
  const projects = snapshot.docs.map((project) => ({
    ...project.data(),
    id: project.id,
  }));
  console.log(projects);
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
