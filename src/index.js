import React from "react";
import ReactDOM from "react-dom";
import "./styles/reset.css";
import "./styles/style.css";
import App from "./components/App";
import "./firebase-config";

// todo: add app icon reference 
// <a target="_blank" href="https://icons8.com/icon/vtuTBirydxIH/app">App</a> icon by <a target="_blank" href="https://icons8.com">Icons8</a>
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
