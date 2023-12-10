import React, { useEffect } from "react";
import style from "./Menu.module.scss";

export default function Menu({ children, setMenu, styleMenu }) {
  useEffect(() => {
    function closeMenu(e) {
      if (e.target.id !== "menu") {
        setMenu((prev) => ({ ...prev, menu: false }));
      }
    }
    window.addEventListener("click", closeMenu);
    return () => window.removeEventListener("click", closeMenu);
  }, [setMenu]);

  return (
    <div className={style.container} id="menu" style={{ top: styleMenu?.top, right: styleMenu?.right, width: styleMenu?.width }}>
      {children}
    </div>
  );
}
