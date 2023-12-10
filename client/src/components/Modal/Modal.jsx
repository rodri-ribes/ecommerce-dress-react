import React, { useEffect } from "react";
import style from "./Modal.module.scss";

export default function Modal({ setModal, children }) {
  useEffect(() => {
    function closeModal(e) {
      if (e.target.id === "container_modal") {
        setModal(prev => ({
          ...prev,
          modal: false
        }))
      }
    }
    window.addEventListener("click", closeModal);
    return () => window.removeEventListener("click ", closeModal);
  }, []);

  return (
    <div className={style.container} id="container_modal">
      <div
        className={style.container__content}
        
      >
        <header>
          <button onClick={() =>  setModal(prev => ({
          ...prev,
          modal: false
        }))}>
            <i className="bi bi-x"></i>
          </button>
        </header>
        <main className={style.container__content__data}>{children}</main>
      </div>
    </div>
  );
}
