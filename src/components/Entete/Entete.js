import { NavLink } from "react-router-dom";
import "./Entete.css";
import { AppContext } from "../App/App";
import { useContext } from "react";

function Entete(props) {
  const context = useContext(AppContext);
  //const elUser = useRef();
  //console.log(props.estLog);
  return (
    <header className="entete">
      <NavLink to="/">
        <img src={`img/logo/devFlix.webp`} />
      </NavLink>
      <nav>
        <NavLink className="NavLink" to="Films">
          Movie
        </NavLink>
        <NavLink className="NavLink" to="Films">
          Subscribe
        </NavLink>
        {context.isLogged == true ? (
          <NavLink className="NavLink" to="Admin">
            <button>Logout</button>
          </NavLink>
        ) : (
          <form onSubmit={props.handleLogin}>
            <input tyoe="text" name="courriel" placeholder="Email"></input>
            <input
              tyoe="password"
              name="mdp"
              placeholder="Mot de passe"
            ></input>
            <button>Login</button>
          </form>
        )}
      </nav>
    </header>
  );
}

export default Entete;
