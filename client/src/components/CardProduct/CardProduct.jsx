import React from "react";
import style from "./CardProduct.module.scss";
import Rating from "@mui/material/Rating";
import { useNavigate } from "react-router-dom";
import useMutationUser from "../../hooks/user/useMutationUser";
import showProduct from "../../functions/showProduct";

export default function CardProduct({
  title,
  price,
  offer,
  discount,
  img,
  rating,
  id,
  idConfig,
}) {
  const { user, updateUserMutation } = useMutationUser();

  let navigate = useNavigate();

  const favorite = () => {
    updateUserMutation.mutate({ favorite: id });
  };

  return (
    <li className={style.container} title={title}>
      <div className={style.container__image}>
        {offer > 0 && (
          <p className={style.container__image_offer}>-{offer}% OFF</p>
        )}
        <img
          src={img}
          alt={title}
          onClick={() => showProduct(navigate, idConfig)}
        />
        <div className={style.container__image__heart}>
          <i
            className={`${
              user?.favorites?.find((f) => f?._id === id)
                ? "bi bi-heart-fill"
                : "bi bi-heart"
            }`}
            onClick={() => favorite()}></i>
        </div>
        {/* <div className={style.container__image_rating}>
          <Rating name="read-only" value={rating} readOnly />
        </div> */}
      </div>
      <div className={style.container__content}>
        <h3 onClick={() => showProduct(navigate, idConfig)}>
          {title?.slice(0, 17)} {title?.length > 17 && "..."}
        </h3>
        <div className={style.container__content__price}>
          <p
            style={{
              textDecoration: `${discount > 0 ? "line-through" : "none"}`,
            }}>
            $ {Intl.NumberFormat("es-US").format(price)}
          </p>
          {discount > 0 && (
            <b>$ {Intl.NumberFormat("es-US").format(discount)}</b>
          )}
        </div>
      </div>
    </li>
  );
}
