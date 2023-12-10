import React from "react";
import useSetting from "../../hooks/useSetting";
import style from "./ErrorAlert.module.scss";

export default function ErrorAlert({ typeError, text }) {
  const { setting } = useSetting();
  return (
    <div className={style.container}>
      <header className={style.container__header}>
        <i className="bi bi-exclamation-circle-fill"></i>
        <h4>Se ha producido un error.</h4>
      </header>
      <p className={style.container_text}>
        {text
          ? text
          : `Por favor, póngase en contacto con el
        ${typeError === "user" ? `administrador` : "desarrollador"} para obtener
        asistencia.`}
      </p>
    </div>
  );
}
