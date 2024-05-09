import { NavLink } from "react-router-dom";
import "./Entete.css";

function Entete() {
  return (
    <header className="entete">
      <NavLink to="/">
        <img src={`img/logo/devFlix.webp`} />
      </NavLink>
      <nav>
        <NavLink to="Films">Movie</NavLink>
        <NavLink to="Films">Subscribe</NavLink>
      </nav>
    </header>
  );
}

export default Entete;
