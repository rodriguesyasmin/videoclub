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
        {context.estLog ? (
          <NavLink className="NavLink" to="Admin">
            Admin
          </NavLink>
        ) : (
          ""
        )}

        <NavLink className="NavLink" to="Films">
          Subscribe
        </NavLink>
      </nav>
      <form onSubmit={props.handleLogin}>
        {/* <input
          ref={elUser}
          tyoe="text"
          name="user"
          placeholder="Usager"
        ></input> */}
        <input tyoe="text" name="user" placeholder="Usager"></input>
        <button>Login</button>
      </form>
    </header>
  );
}

export default Entete;
