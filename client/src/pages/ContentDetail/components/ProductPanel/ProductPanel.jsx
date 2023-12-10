import React from "react";
import style from "./ProductPanel.module.scss";
import { useNavigate } from "react-router-dom";

//------ Components

//------ Functions
import addToCart from "../../functions/addToCart";
import buynow from "../../functions/buynow";
import FeatureSelectors from "../../../../components/FeatureSelectors/FeatureSelectors";
import iHavefreeShipping from "../../../../functions/iHaveFreeShipping";

export default function ProductPanel({
  product,
  setOptions,
  options,
  productFeatures,
  setProductFeatures,
  queryClient,
  setModal,
  user,
  updateUserMutation,
  setting,
}) {
  let navigate = useNavigate();
  return (
    <div className={style.container}>
      <p className={style.container_sold}>{product?.sold} Ventas</p>
      <h3>{product.title}</h3>
      <button className={style.container_btnfav} onClick={() => updateUserMutation.mutate({favorite: product._id})}>
          <i
            className={`${
              user?.favorites?.find((f) => f?._id === product._id)
                ? "bi bi-heart-fill"
                : "bi bi-heart"
            }`}
            ></i>
          </button>
      <div className={style.container__price}>
        <b
          className={`${style.container__price_price} ${
            product.discount > 0 &&
            style.container__price_discount
          }`}
        >
          $ {Intl.NumberFormat("es-US").format(product.price)}
        </b>
        {product.discount > 0 && (
          <b className={style.container__price_price}>
            $ {Intl.NumberFormat("es-US").format(product.discount)}
            <small>{product.offer}% OFF</small>
          </b>
        )}
      </div>
      <div className={style.container__shipment}>
          <p>{iHavefreeShipping(user, product, setting)}</p>
      </div>
      
      {
        product.content && 
        <button 
        className={style.container_btnDescription}
        onClick={() => setOptions(prev => ({...prev, showDescription: !prev.showDescription}))}>
          {options.showDescription ? "Ocultar Descripcion" : "Ver Descripcion"}
        </button>
      }
      {
        options.showDescription &&
        <div className={style.container__description}>
          <p>{product.content}</p>
        </div>
      }
      

      {options.thereIsStock ? (
        <div className={style.container__thereIsStock}>
          <p>NO HAY STOCK DISPONIBLE.</p>
        </div>
      )  : (
        !options.showDescription && <FeatureSelectors
          value={productFeatures}
          setValue={setProductFeatures}
          product={product}
        />
      )}
      <div className={style.container__buttons}>
        <button
          disabled={options.thereIsStock}
          onClick={() =>
            buynow(
              navigate,
              { ...product, ...productFeatures },
              productFeatures,
              setModal,
              queryClient,
              user
            )
          }
          className={style.container__buttons_buynow}
        >
          COMPRAR AHORA
        </button>
        <button
          className={style.container__buttons_addToCart}
          disabled={options.thereIsStock}
          onClick={() =>
            addToCart(
              user,
              product?._id,
              setModal,
              navigate,
              options.loadedProduct,
              setOptions,
              updateUserMutation,
              queryClient
            )
          }
        >
          {options.loadedProduct ? "QUITAR DEL CARRITO" : "AGREGAR AL CARRITO"}
        </button>
      </div>
    </div>
  );
}
