import React, { useState } from "react";
import style from "./Dashboard.module.scss";

//------ Imports

import { NavLink, Outlet } from "react-router-dom";
import { activeMenu } from "../../constants/const";

//------ react icons

const Link = ({ hidePane, setHidePane, url, icon, text }) => {

  const closePanel = () => {
    if(window.matchMedia('(max-width: 768px)')){
      setHidePane(true)
    }
  }

  return (
    <NavLink
      to={url}
      onClick={() => closePanel()}
      className={style.container__panel_group}
      style={({ isActive }) => (isActive ? activeMenu : undefined)}>
      <i
        className={`bi bi-${icon} ${
          hidePane
            ? style.container__panel_group__icon__hideTrue
            : style.container__panel_group__icon__hideFalse
        }`}></i>
      <p
        className={`${style.container__panel_group_link} ${
          hidePane
            ? style.container__panel_group_link_hideTrue
            : style.container__panel_group_link_hideFalse
        }`}>
        {text}
      </p>
    </NavLink>
  );
};

export default function Dashboard() {
  const [hidePane, setHidePane] = useState(false);

  return (
    <div className={style.container}>
      <div
        className={`${style.container__panel} ${
          hidePane
            ? style.container__panel__hideTrue
            : style.container__panel__hideFalse
        }`}>
        <button
          onClick={() => setHidePane((prev) => !prev)}
          className={style.container__panel_btnHide}>
          <i
            className={"bi bi-arrow-right-circle"}
            style={{
              transform: `${hidePane ? "rotateY(0)" : "rotateY(180deg)"}`,
            }}></i>
        </button>

        <Link
        setHidePane={setHidePane}
          hidePane={hidePane}
          url={"/"}
          icon={"arrow-left-square"}
          text="SALIR"
        />
        <Link
        setHidePane={setHidePane}

          hidePane={hidePane}
          url={"/dashboard/manage-products"}
          icon={"list-ul"}
          text="ADMINISTRAR PRODUCTOS"
        />
        <Link
        setHidePane={setHidePane}

          hidePane={hidePane}
          url={"/dashboard/add-product"}
          icon={"plus-square"}
          text="AGREGAR PRODUCTO"
        />
        <Link
        setHidePane={setHidePane}

          hidePane={hidePane}
          url={"/dashboard/customers"}
          icon={"people"}
          text="CLIENTES"
        />
        <Link
        setHidePane={setHidePane}

          hidePane={hidePane}
          url={"/dashboard/mails"}
          icon={"envelope"}
          text="CORREO"
        />
        <Link
        setHidePane={setHidePane}

          hidePane={hidePane}
          url={"/dashboard/cash-register"}
          icon={"wallet2"}
          text="CAJA"
        />
        <Link
        setHidePane={setHidePane}

          hidePane={hidePane}
          url={"/dashboard/settings"}
          icon={"gear"}
          text="CONFIGURACIÓN"
        />
      </div>
      <div
        className={`${style.container__outlet} ${
          hidePane
            ? style.container__outlet__hideTrue
            : style.container__outlet__hideFalse
        }`}>
        <Outlet />
      </div>
    </div>
  );
}
