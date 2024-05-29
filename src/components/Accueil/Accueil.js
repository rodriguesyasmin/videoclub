import "./Accueil.css";
import json from "./Accueil.json";
import { NavLink } from "react-router-dom";

function Accueil() {
  return (
  
      <div className="banner">
        <img src={`img/banner.png`} alt="Banner Image" />
        <div className="content">
          <h1> Films illimités </h1>
          {json.map((text, index) => (
            <p className="para" key={index}>
              {text}
            </p>
          ))}

          <div className="button-accueil">
            <NavLink to="Films">Films</NavLink>
          </div>
        </div>
      </div>
 
  );
}

export default Accueil;
