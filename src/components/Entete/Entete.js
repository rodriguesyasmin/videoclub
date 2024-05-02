import { NavLink } from "react-router-dom";
import "./Entete.css";

function Entete() {
  return (
    <header className="entete">
      <NavLink to="/">
        <h1>Videoclub</h1>
      </NavLink>
      <nav>
        <NavLink to="Films">Films</NavLink>
      </nav>
    </header>
  );
}

export default Entete;
