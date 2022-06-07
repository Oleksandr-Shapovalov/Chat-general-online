import React, { createContext } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { initializeApp } from "firebase/app";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { ThemeProvider, createTheme } from "@mui/material/styles";
const theme = createTheme({
  palette: {
    primary: {
      main: "#880e4f",
    },
    secondary: {
      main: "#121858",
    },
    thirdly: {
      main: "#fcfcfc",
    },
  },
});
firebase.initializeApp({
  apiKey: "AIzaSyAG1KToYf9ZrQXU7cdb7mum33EWldOXXiM",
  authDomain: "chat-react-df642.firebaseapp.com",
  projectId: "chat-react-df642",
  storageBucket: "chat-react-df642.appspot.com",
  messagingSenderId: "72983637275",
  appId: "1:72983637275:web:c3d31685372bdfe86ff7be",
  measurementId: "G-CCG83W5YE4",
});

export const Context = createContext(null);

const auth = firebase.auth();
const firestore = firebase.firestore();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ThemeProvider theme={theme}>
    <Context.Provider value={{ firebase, auth, firestore }}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Context.Provider>
  </ThemeProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
