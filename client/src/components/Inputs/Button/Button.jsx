import React from "react";
import style from "./Button.module.scss";

export default function Button({
  type,
  title,
  disabled,
  action,
  isLoading,
  extent,
  danger,
  stylebtn,
  icon,
}) {
  return (
    <button
      type={type}
      // style={{
      //   width: extent?.width ? extent?.width : "100%",
      //   height: extent?.height ? extent?.height : "100%",
      // }}
      className={`
      ${style.container} 
      ${danger && style.container_danger}
      ${stylebtn ? style.container_v2 : style.container_v1}
      `}
      disabled={disabled}
      onClick={action}>
      {isLoading ? (
        <div className={style.lds_ellipsis}>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      ) : (
        <>
          {title + " "}
          {icon && <i className={`bi bi-${icon}`}></i>}
        </>
      )}
    </button>
  );
}
