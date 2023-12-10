import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRouteUserIsLoggedIn = ({ user, children, action }) => {
  // let buynow = useSelector((state) => state.data.buynow);
  // let location = useLocation();

  if (action === "user_exists") {
    // para rutas como perfil, favoritos, compras
    if (user) return children;
    else return <Navigate to="/" />;
  } else if (action === "no_user_exists") {
    // para rutas como iniciar sesión o registrarse
    if (!user) return children;
    else return <Navigate to="/" />;
  }
  //  else if (userExists === "process-purchase") {
  //   // ruta con acceso si tiene productos o agrego a comprar ahora
  //   if (user?.cart?.length > 0 || buynow) return children;
  //   else return <Navigate to="/" />;
  // } else if (userExists === "finalize-purchase") {
  //   // ruta para finalizar compra.
  //   if (
  //     user?.cart?.length > 0 ||
  //     buynow ||
  //     location.pathname.includes("success") ||
  //     location.pathname.includes("failure")
  //   ) {
  //     return children;
  //   } else return <Navigate to="/" />;
  // }
};

export default ProtectedRouteUserIsLoggedIn;
