import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Entete from "../Entete/Entete";
import "./App.css";
import Film from "../ChaqueFilm/Film";
import Accueil from "../Accueil/Accueil";
import Films from "../Films/Films";
import Admin from "../Admin/Admin";
import { useState } from "react";

export const AppContext = React.createContext();

function App() {
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
      <Router>
        <Entete handleLogin={login} />
        <Routes>
          <Route path="/" element={<Accueil />}></Route>
          <Route path="/films" element={<Films />}></Route>
          <Route path="/films/:id" element={<Film />} />

          <Route
            path="/admin"
            element={usager.estLog ? <Admin /> : <Navigate to="/" />}
          />
        </Routes>
      </Router>
    </AppContext.Provider>
  );
}

export default App;
