import { useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CarouselProducts from "../../components/CarouselProducts/CarouselProducts";
import totalCart from "../../functions/totalCart";
import style from "./AddToCart.module.scss";
import Spinner from '../../components/Spinner/Spinner'

export default function AddToCart() {
  const queryClient = useQueryClient();
  let navigate = useNavigate()
  const user = queryClient.getQueryData(["user"])
  const products = queryClient.getQueryData(["products"])

  const [product, setProduct] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);

    if (user?.cart?.length > 0) {
      setProduct(user?.cart?.[user.cart.length - 1]);
    }else{
      navigate("/")
    }


  }, [user]);

  return (
    product ?
    <div className={style.container}>
      <div className={style.container__addtocart}>
        <div className={style.container__addtocart__left}>
          <div className={style.container__addtocart__left__image}>
            <img src={product?.images[0]?.link} alt={product?.title} />
            <div className={style.container__addtocart__left__image_icon}>
              <i className="bi bi-check-circle-fill"></i>
            </div>
          </div>
          <div className={style.container__addtocart__left__content}>
            <h3>Agregaste a tu carrito</h3>
            <p>{product?.title}</p>
          </div>
        </div>
        <div className={style.container__addtocart__right}>
          <div className={style.container__addtocart__right__information}>
            <p>{user?.cart?.length} productos en tu carrito:</p>
            <b>$ {Intl.NumberFormat("es-US").format(totalCart(user))}</b>
          </div>
          <div className={style.container__addtocart__right__btns}>
            <Link to="/tocart">Ver Carrito</Link>
            <Link to="/process-purchase">Comprar Carrito</Link>
          </div>
        </div>
      </div>
      <div className={style.container__products}>
        <CarouselProducts products={products} perView={"6"} />
      </div>
    </div>
    :
    <Spinner/>
  );
}
