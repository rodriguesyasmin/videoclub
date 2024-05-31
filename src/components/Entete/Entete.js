import { NavLink } from "react-router-dom";
import "./Entete.css";
import { AppContext } from "../App/App";
import { useContext } from "react";

function Entete(props) {
  const context = useContext(AppContext);

  return (
    <header className="entete">
      <NavLink to="/">
        <img src={`/img/logo/devFlix.webp`} />
      </NavLink>
      <nav>
        <NavLink className="NavLink" to="Films">
          Films
        </NavLink>
        <NavLink className="NavLink" to="Films">
          S'inscrire
        </NavLink>
        {context.isLogged == true ? (
          <NavLink className="NavLink" to="Admin">
            <button onClick={props.handleLogout}>Logout</button>
          </NavLink>
        ) : (
          <form onSubmit={props.handleLogin}>
            <input tyoe="text" name="courriel" placeholder="Email"></input>
            <input
              tyoe="password"
              name="mdp"
              placeholder="Mot de passe"
            ></input>
            <button>Se connecter</button>
          </form>
        )}
      </nav>
    </header>
  );
}

export default Entete;
