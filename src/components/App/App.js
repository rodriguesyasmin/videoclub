import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Entete from "../Entete/Entete";
import "./App.css";
import Film from "../ChaqueFilm/Film";
import Accueil from "../Accueil/Accueil";
import Films from "../Films/Films";

function App() {
  return (
    <Router>
      <Entete />
      <Routes>
        <Route path="/" element={<Accueil />}></Route>
        <Route path="/films" element={<Films />}></Route>
        <Route path="/films/:id" element={<Film />} />
      </Routes>
    </Router>
  );
}

export default App;
