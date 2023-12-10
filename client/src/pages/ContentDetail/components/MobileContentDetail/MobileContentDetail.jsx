import React from "react";
import style from "./MobileContentDetail.module.scss";
import CarouselImages from "../CarouselImages/CarouselImages";
import iHavefreeShipping from "../../../../functions/iHaveFreeShipping";
import FeatureSelectors from "../../../../components/FeatureSelectors/FeatureSelectors";
import { useNavigate } from "react-router-dom";
import addToCart from "../../functions/addToCart";
import buynow from "../../functions/buynow";

export default function MobileContentDetail({
  product,
  user,
  setting,
  productFeatures,
  setProductFeatures,
  setModal,
  queryClient,
  options,
  setOptions,
  updateUserMutation,
}) {
  const navigate = useNavigate();

  return (
    <div className={style.container}>
      <div className={style.container__wrapper}>
        <header className={style.container__wrapper__header}>
          <p>{product?.sold} Vendidos</p>
          <h1>{product?.title}</h1>
          <button onClick={() => updateUserMutation.mutate({favorite: product._id})}>
          <i
            className={`${
              user?.favorites?.find((f) => f?._id === product._id)
                ? "bi bi-heart-fill"
                : "bi bi-heart"
            }`}
            ></i>
          </button>
        </header>
        <main className={style.container__wrapper__content}>
          <div className={style.container__wrapper__content__images}>
            <CarouselImages images={product?.images} />
          </div>
          <div className={style.container__wrapper__content__data}>
            <div className={style.container__wrapper__content__data__price}>
              <b
                className={`${style.container__wrapper__content__data__price_price} ${
                  product.discount > 0 &&
                  style.container__wrapper__content__data__price_discount
                }`}
              >
                $ {Intl.NumberFormat("es-US").format(product.price)}
              </b>
              {product.discount > 0 && (
                <b className={style.container__wrapper__content__data__price_price}>
                  $ {Intl.NumberFormat("es-US").format(product.discount)}
                  <small>{product.offer}% OFF</small>
                </b>
              )}
            </div>
            <div className={style.container__wrapper__content__data__shipment}>
              <p>{iHavefreeShipping(user, product, setting)}</p>
            </div>
            <div className={style.container__wrapper__content__data__selector}>
              <FeatureSelectors
                value={productFeatures}
                setValue={setProductFeatures}
                product={product}
              />
            </div>
            <div className={style.container__wrapper__content__data__buttons}>
              <button
                disabled={options.thereIsStock}
                onClick={() =>
                  buynow(
                    navigate,
                    { ...product, ...productFeatures },
                    productFeatures,
                    setModal,
                    queryClient
                  )
                }
                className={style.container__wrapper__buttons_buynow}
              >
                COMPRAR AHORA
              </button>
              <button
                className={style.container__wrapper__buttons_addToCart}
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
                {options.loadedProduct
                  ? "QUITAR DEL CARRITO"
                  : "AGREGAR AL CARRITO"}
              </button>
            </div>
          </div>
        </main>
      </div>
      {
        product?.content &&
      <div className={style.container__description}>
        <p>{product?.content}</p>
      </div>
      }
    </div>
  );
}
