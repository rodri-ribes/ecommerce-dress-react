import React, { useEffect, useState } from "react";
import style from "./ShoppingCart.module.scss";

//------ Imports
import { Link, useLocation, useNavigate } from "react-router-dom";
import emptyCart from '../../assets/images/cart.png' 

//------ Functions
import deleteFromCart from "../../functions/deleteFromCart";
import totalCart from "../../functions/totalCart";

//------ hooks
import useMutationUser from "../../hooks/user/useMutationUser";
import { useQueryClient } from "@tanstack/react-query";
import stockCounter from "../../pages/Dashboard/sub-pages/ManageProducts/functions/stockCounter";

export default function ShoppingCart({ setOptions }) {
  const queryClient = useQueryClient();
  const { updateUserMutation, user } = useMutationUser();
  let navigate = useNavigate();
  let location = useLocation();

  const [productNotAvilable, setProductNotAvilable] = useState({});

  useEffect(() => {
    if (user) {
      stockCounter(user?.cart, setProductNotAvilable);
    }

    function closeModal(e) {
      if (e.target.id !== "shoppingCart") {
        setOptions((prev) => ({ ...prev, shoppingCart: false }));
      }
    }

    window.addEventListener("click", closeModal);
    return () => window.removeEventListener("click", closeModal);
  }, [user]);

  const notAvilable = (id) => {
    return {
      opacity: `${productNotAvilable[id] === 0 ? ".2" : "1"}`,
    };
  };

  return (
    <div className={style.container} id="shoppingCart">
      {user?.cart?.length > 0 ? (
        <>
          <div className={style.container__products}>
            {user?.cart?.length > 0 &&
              user?.cart?.map((p) => {
                return (
                  <div
                    className={style.container__products__card}
                    id="shoppingCart"
                    key={p?._id}>
                    {productNotAvilable[p?._id] === 0 && (
                      <div className={style.container__products__card__warning}>
                        <p>NO HAY STOCK DEL PRODUCTO</p>
                        <button
                          className={
                            style.container__products__card__warning_drop
                          }
                          onClick={() =>
                            deleteFromCart(
                              user,
                              location,
                              navigate,
                              p?._id,
                              updateUserMutation
                            )
                          }>
                          Eliminar
                        </button>
                      </div>
                    )}
                    <img
                      src={p?.images[0]?.link}
                      alt={p?.title}
                      style={notAvilable(p?._id)}
                    />
                    <div
                      className={style.container__products__card__content}
                      style={notAvilable(p?._id)}>
                      <h3>{p?.title}</h3>
                      <div
                        className={
                          style.container__products__card__content__price
                        }>
                        <p
                          style={{
                            textDecoration: `${
                              p?.discount > 0 ? "line-through" : "none"
                            }`,
                          }}>
                          $ {Intl.NumberFormat("es-US").format(p?.price)}
                        </p>
                        {p?.discount > 0 && (
                          <b>
                            $ {Intl.NumberFormat("es-US").format(p?.discount)}
                          </b>
                        )}
                      </div>
                    </div>
                    <button
                      style={notAvilable(p?._id)}
                      id="shoppingCart"
                      onClick={() =>
                        deleteFromCart(
                          user,
                          location,
                          navigate,
                          p?._id,
                          updateUserMutation
                        )
                      }>
                      <i id="shoppingCart" className="bi bi-x-lg"></i>
                    </button>
                  </div>
                );
              })}
          </div>
          <div className={style.container__btns}>
            <Link
              to={"/process-purchase"}
              onClick={() => {
                queryClient.setQueryData(["buynow"], false);
              }}>
              Comprar ( $ {Intl.NumberFormat("es-US").format(totalCart(user))} )
            </Link>
          </div>
        </>
      ) : (
        <img className={style.container_emptyCart} src={emptyCart} alt="error" />
      )}
    </div>
  );
}
