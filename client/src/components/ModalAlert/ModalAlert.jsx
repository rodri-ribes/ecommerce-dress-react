import React, { useEffect } from "react";
import style from "./ModalAlert.module.scss";

export default function ModalAlert({ setModal, modal }) {
  useEffect(() => {
    function modal_alert(e) {
      if (e.target.id === "container_modal") {
        setModal((prev) => ({ ...prev, view: false, text: "" }));
      }
    }
    window.addEventListener("click", modal_alert);
    return () => window.removeEventListener("click", modal_alert);
  }, []);

  return (
    <div className={style.container} id="container_modal">
      <div className={style.container__content}>
        <button
          className={style.container__content_btn}
          onClick={() => setModal((prev) => ({ ...prev, view: false }))}>
          <i className="bi bi-x"></i>
        </button>
        <div className={style.container__content__data}>
          <i className="bi bi-exclamation-circle"></i>
          <h3>{modal.text}</h3>
        </div>
      </div>
    </div>
  );
}
