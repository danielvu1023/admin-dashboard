import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { AuthContextProvider } from "./context/authContext/AuthContext";
import { DarkModeContextProvider } from "./context/darkModeContext";
import { MovieContextProvider } from "./context/movieContext/MovieContext";


ReactDOM.render(
  <React.StrictMode>
    <DarkModeContextProvider>
      <AuthContextProvider>
        <MovieContextProvider>
          <App />
        </MovieContextProvider>
      </AuthContextProvider>
    </DarkModeContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
