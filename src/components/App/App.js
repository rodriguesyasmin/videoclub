import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Entete from "../Entete/Entete";
import "./App.css";
import Accueil from "../Accueil/Accueil";
import Films from "../Films/Films";
import TuileFilm from "../TuileFilm/TuileFilm";

function App() {
  return (
    <Router>
      <Entete />
      <Routes>
        <Route path="/" element={<Accueil />}></Route>
        <Route path="/films" element={<Films />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
