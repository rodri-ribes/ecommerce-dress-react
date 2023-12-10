import React from "react";
import useNotification from "../../hooks/useNotification";
import style from "./Notification.module.scss";

const Notification = ({ status, title, text }) => {
  let { deleteNotification } = useNotification();
  return (
    <div className={style.container}>
      <div
        className={style.container__icon}
        style={{
          backgroundColor: `${status ? "#D5F5CD" : "#F5CCD1"}`,
          height: "100%",
        }}>
        <i
          className={
            status ? "bi bi-check-circle" : "bi bi-exclamation-triangle"
          }
          style={{
            color: `${status ? "green" : "red"}`,
          }}></i>
      </div>
      <div className={style.container__text}>
        <b>{title}</b>
        <p>{text}</p>
      </div>
      <button onClick={deleteNotification} className={style.container_button}>
        <i className="bi bi-x-lg"></i>
      </button>
    </div>
  );
};

export default Notification;
