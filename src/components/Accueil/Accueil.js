import "./Accueil.css";
import "./Accueil.json";
import { NavLink } from "react-router-dom";

function Accueil() {
  return (
    <body>
      <div className="banner">
        <img src={`img/banner.png`} alt="Banner Image" />
        <div className="content">
          <h1>Unlimited movies, series and more</h1>
          <p> See all films available in the catalog</p>
          <NavLink to="Films">Movies</NavLink>
        </div>
      </div>
    </body>
  );
}

export default Accueil;
