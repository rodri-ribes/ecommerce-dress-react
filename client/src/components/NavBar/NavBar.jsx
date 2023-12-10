import React, { useState } from "react";
import style from "./NavBar.module.scss";
//------ Imports
import { Link } from "react-router-dom";

//------ Components
import ShoppingCart from "../ShoppingCart/ShoppingCart";
import Menu from "../Menu/Menu";
import Search from "../Search/Search";

//------ Functions
import { menuUser } from "./links";

//------ Hooks
import useQueryUser from "../../hooks/user/useQueryUser";

//------ Contants
import { NAME_OF_THE_PAGE } from "../../constants/const";
import useSetting from "../../hooks/useSetting";
import { useQueryClient } from "@tanstack/react-query";

export default function NavBar() {
  const { setting } = useSetting();

  const queryClient = useQueryClient()

  const [options, setOptions] = useState({
    mobile: false,
    search: false,
    shoppingCart: false,
    menu: false,
  });

  const { user } = useQueryUser();

  const handleClick = (name, value) => {
    if (name === "search") {
      setOptions((prev) => ({
        ...prev,
        [name]: !value,
        mobile: false,
      }));
    } else {
      setOptions((prev) => ({
        ...prev,
        [name]: !value,
      }));
    }
  };

  const linkFilter = (user) => {
    return (x) => {
      return (
        (user && (user.rol === x.rol || x.rol === "user")) ||
        (!user && x.rol === "guest")
      );
    };
  };

  const signOff = () => {
    window.localStorage.removeItem("user")
    queryClient.setQueryData(["user"], false)
  }

  return (
    <nav className={style.container}>
      <div className={style.container__wrapper}>
        <button
          className={`${style.container__wrapper_mobile} ${
            options.search && style.container__wrapper_searchActive
          }`}
          name="mobile"
          value={options.mobile}
          onClick={() => handleClick("mobile", options.mobile)}>
          <i className={`${options?.mobile ? "bi bi-x-lg" : "bi bi-list"}`}></i>
        </button>
        <Link
          to="/"
          className={`${style.container__wrapper_logo} ${
            options.search && style.container__wrapper_searchActive
          }`}>
          {setting ? setting.name_of_the_page : NAME_OF_THE_PAGE}
        </Link>

        <ul
          className={style.container__wrapper__menu}
          style={{ left: `${options.mobile ? "0" : "-100%"}` }}>
          <li>
            <Link  onClick={() => handleClick("mobile", options.mobile)} to={"/products"}>PRODUCTOS</Link>
          </li>
          <li>
            <Link  onClick={() => handleClick("mobile", options.mobile)} to={"/products?gender=hombre"}>HOMBRES</Link>
          </li>
          <li>
            <Link  onClick={() => handleClick("mobile", options.mobile)} to={"/products?gender=mujer"}>MUJERES</Link>
          </li>
          <li>
            <Link  onClick={() => handleClick("mobile", options.mobile)} to={"/contact"}>CONTACTO</Link>
          </li>
        </ul>
        {options.search && (
          <div className={style.container__wrapper__search}>
            <Search />
          </div>
        )}
        <div className={style.container__wrapper__items}>
          <button onClick={() => handleClick("search", options.search)}>
            <i
              className={`${
                options?.search ? "bi bi-x-lg" : "bi bi-search"
              }`}></i>
          </button>
          <button id="menu" onClick={() => handleClick("menu", options.menu)}>
            <i id="menu" className="bi bi-person"></i>
          </button>
          <button
            id="shoppingCart"
            onClick={() => handleClick("shoppingCart", options.shoppingCart)}>
            <i id="shoppingCart" className="bi bi-bag"></i>
            {user && user?.cart?.length > 0 && <p>{user?.cart?.length}</p>}
          </button>
        </div>
        {options.menu && (
          <Menu
            setMenu={setOptions}
            styleMenu={window.matchMedia('(max-width: 768px)') ? { right: "3rem", top: "10vh", width: "auto" } :  { right: "5rem", top: "4.5rem", width: "auto" } }>
            {menuUser.filter(linkFilter(user)).map((l, i) => (
              <Link key={i} to={`/${l.link}`} onClick={() => l.name === "CERRAR SESIÓN" && signOff()}>
                <i className={l.icon}></i>
                {l.name}
              </Link>
            ))}
          </Menu>
        )}
        {options.shoppingCart && <ShoppingCart setOptions={setOptions} />}
      </div>
    </nav>
  );
}
