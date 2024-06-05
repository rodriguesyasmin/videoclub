import { useContext } from "react";
import { AppContext } from "../App/App";
import { Outlet, Navigate } from "react-router-dom";

const PrivateRoute = () => {
  const contexte = useContext(AppContext);
  if (contexte.isLogged) {
    return <Outlet />;
  } else {
    return <Navigate to="/"></Navigate>;
  }
};
export default PrivateRoute;
