import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Entete from "../Entete/Entete";
import "./App.css";
import Film from "../ChaqueFilm/Film";
import Accueil from "../Accueil/Accueil";
import Films from "../Films/Films";
import Admin from "../Admin/Admin";
import { useState } from "react";

export const AppContext = React.createContext();

function App() {
  const location = useLocation();
  const [usager, setUsager] = useState({ estLog: false, usager: "" });

  function login(e) {
    e.preventDefault();
    console.log(e.target.user.value);
    let usager = e.target.user.value;
    if (usager == "admin") {
      setUsager((prevUsager) => ({
        ...prevUsager,
        estLog: true,
        usager: usager,
      }));

      e.target.reset();
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
