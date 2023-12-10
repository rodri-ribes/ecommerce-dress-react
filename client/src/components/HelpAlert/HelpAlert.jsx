import React from "react";
import style from "./HelpAlert.module.scss";

export default function HelpAlert({ title, text }) {
  return (
    <div className={style.container}>
      <header className={style.container__header}>
        <i className="bi bi-info-circle-fill"></i>
        <h4>{title}</h4>
      </header>
      <p className={style.container_text}>{text}</p>
    </div>
  );
}
