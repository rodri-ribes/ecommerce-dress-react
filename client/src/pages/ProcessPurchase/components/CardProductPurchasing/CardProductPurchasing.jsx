import React from "react";
import style from "./CardProductPurchasing.module.scss";
//------ Imports
import { useLocation, useNavigate } from "react-router-dom";

//------ Components

//------ Functions
import deleteFromCart from "../../../../functions/deleteFromCart";

//------ hooks
import useMutationUser from "../../../../hooks/user/useMutationUser";
import FeatureSelectors from "../FeatureSelectors/FeatureSelectors";

export default function CardProductPurchasing({
  image,
  title,
  price,
  discount,
  offer,
  sizeAndStock,
  id,
  idConfig,
  productFeatures,
  setProductFeatures,
  productNotAvilable,
  buynow,
}) {
  const location = useLocation();
  const navigate = useNavigate();

  const { updateUserMutation, user } = useMutationUser()

  const notAvilable = {
    opacity: `${productNotAvilable[id] === 0 ? ".2" : "1"}`,
  };

  return (
    <div className={style.container}>
      {productNotAvilable[id] === 0 && !buynow && (
        <div className={style.container__warning}>
          <p>NO HAY STOCK DEL PRODUCTO</p>
          <button
            className={style.container__warning_drop}
            onClick={() =>
              deleteFromCart(
                user,
                location,
                navigate,
                id,
                updateUserMutation,
                productFeatures
              )
            }>
            Eliminar
          </button>
        </div>
      )}
      <div className={style.container__content} style={notAvilable}>
        <img src={image} alt={title} />
        <div className={style.container__content__information}>
          <h3>{title}</h3>
          <div className={style.container__content__information__price}>
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
          {!buynow && (
            <button
              className={style.container__content__information_drop}
              onClick={() =>
                deleteFromCart(
                  user,
                  location,
                  navigate,
                  id,
                  updateUserMutation,
                  productFeatures
                )
              }>
              Eliminar
            </button>
          )}
        </div>
      </div>
      <div className={style.container__selectors} style={notAvilable}>
        {buynow ? (
          <div className={style.container__selectors__features}>
            <p>Talle: {buynow.waist}</p>
            <p>
              Color: <div style={{ backgroundColor: buynow.color }}></div>
            </p>
            <p>Cantidad: {buynow.amount}</p>
          </div>
        ) : (
          productFeatures[id]?.waist !== undefined &&
          <FeatureSelectors
            value={productFeatures}
            setValue={setProductFeatures}
            sizeAndStock={sizeAndStock}
            id={id}
          />
        )}
      </div>
    </div>
  );
}
