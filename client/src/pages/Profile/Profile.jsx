import React from "react";
import style from "./Profile.module.scss";

//------ Imports

import { NavLink, Outlet } from "react-router-dom";
import { activeMenu } from "../../constants/const";

const Profile = () => {
  return (
    <div className={style.container}>
      <div className={style.container__panel}>
        <NavLink
          to="/profile/settings"
          className={style.container__panel_group}
          style={({ isActive }) => (isActive ? activeMenu : undefined)}>
          <i className="bi bi-person-lines-fill"></i>
          <p className={style.container__panel_group_link}>PERFIL</p>
        </NavLink>
        <NavLink
          to="/profile/favorites"
          className={style.container__panel_group}
          style={({ isActive }) => (isActive ? activeMenu : undefined)}>
          <i className="bi bi-heart"></i>
          <p className={style.container__panel_group_link}>FAVORITOS</p>
        </NavLink>
        <NavLink
          to="/profile/shopping"
          className={style.container__panel_group}
          style={({ isActive }) => (isActive ? activeMenu : undefined)}>
          <i className="bi bi-bag"></i>
          <p className={style.container__panel_group_link}>COMPRAS</p>
        </NavLink>
      </div>
      <div className={style.container__outlet}>
        <Outlet />
      </div>
    </div>
  );
};

export default Profile;
