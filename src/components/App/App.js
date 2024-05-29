import React, { useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Entete from "../Entete/Entete";
import "./App.css";
import Film from "../ChaqueFilm/Film";
import Accueil from "../Accueil/Accueil";
import Films from "../Films/Films";
import Admin from "../Admin/Admin";
import { useState } from "react";
import { jwtDecode } from "jwt-decode";

export const AppContext = React.createContext();

function App() {
  let appState = "DEV";
  let apiUrl = "https://four1f-tp1-rodriguesyasmin.onrender.com/";
  if (appState === "DEV") {
    apiUrl = "http://localhost:5501/";
  }

  const location = useLocation();
  const [usager, setUsager] = useState({ estLog: false, usager: {} });

  useEffect(() => {
    const estValide = jetonValide();

    const userData = {
      isLogged: estValide,
      usager: {},
    };

    setUsager(userData);
  }, []);

  async function login(e) {
    e.preventDefault();
    const form = e.target;

    const body = {
      courriel: form.courriel.value,
      mdp: form.mdp.value,
    };

    const data = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    };

    const reponse = await fetch(`${apiUrl}api/utilisateurs/connexion`, data);
    const token = await reponse.json();
    if (reponse.status === 200) {
      const userData = {
        isLogged: true,
        usager: {},
      };

      setUsager(userData);
      localStorage.setItem("api-token", token);
    } else {
      localStorage.removeItemItem("api-film-token", token);
    }
  }

  function jetonValide() {
    try {
      const token = localStorage.getItem("api-film-token");
      const decoded = jwtDecode(token);
      // On vérifie si le token est toujours valide
      if (token && Date.now() < decoded.exp * 1000) {
        return true;
      } else {
        // Si le token est expiré, on le supprime du local storage
        localStorage.removeItem("api-film-token");
        return false;
      }
    } catch (error) {
      return false;
    }
  }

  return (
    <AppContext.Provider value={usager}>
      <Entete handleLogin={login} />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.key}>
          <Route path="/" element={<Accueil />}></Route>
          <Route path="/films" element={<Films />}></Route>
          <Route path="/films/:id" element={<Film />} />
          <Route
            path="/admin"
            element={usager.estLog ? <Admin /> : <Navigate to="/" />}
          />
        </Routes>
      </AnimatePresence>
    </AppContext.Provider>
  );
}

export default App;
