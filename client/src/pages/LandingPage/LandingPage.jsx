//------ Imports
import React, { useEffect } from "react";
import style from "./LandingPage.module.scss";
//------ Components

import CardProduct from "../../components/CardProduct/CardProduct";
import FeaturedImagesCarousel from "./components/FeaturedImagesCarousel/FeaturedImagesCarousel";
import FeaturedCarousel from "./components/FeaturedCarousel/FeaturedCarousel";
import Features from "./components/Features/Features";
import Spinner from "../../components/Spinner/Spinner";
import Warning from '../../components/Warning/Warning';

//------ hooks
import useQueryProducts from "../../hooks/product/useQueryProducts";
import { Link } from "react-router-dom";

const CategoryListings = ({ url, images, delay, title }) => {
  return (
    <Link to={url}>
      <FeaturedImagesCarousel images={images} delay={delay} />
      <h3>{title}</h3>
    </Link>
  );
};

export default function LandingPage() {
  let { getProductsQuery } = useQueryProducts();

  let leftTop = [
    "./img/twoSection/left-top/1.jpg",
    "./img/twoSection/left-top/2.jpg",
    "./img/twoSection/left-top/3.jpg",
  ];
  let leftBottom = [
    "./img/twoSection/left-bottom/1.jpg",
    "./img/twoSection/left-bottom/2.jpg",
    "./img/twoSection/left-bottom/3.jpg",
  ];
  let rightTop = [
    "./img/twoSection/right-top/1.jpg",
    "./img/twoSection/right-top/2.jpg",
    "./img/twoSection/right-top/3.jpg",
    "./img/twoSection/right-top/4.jpg",
    "./img/twoSection/right-top/5.jpg",
    "./img/twoSection/right-top/6.jpg",
  ];
  let rightBottom = [
    "./img/twoSection/right-bottom/1.jpg",
    "./img/twoSection/right-bottom/2.jpg",
    "./img/twoSection/right-bottom/3.jpg",
  ];
  return (
    <div className={style.container}>
      <div className={style.container__oneSection}>
        <FeaturedCarousel />
        <Features />
      </div>

      <div className={style.container__twoSection}>
        <div className={style.container__twoSection__left}>
          <div className={style.container__twoSection__left__top}>
            <CategoryListings
              title="Zapatillas"
              images={leftTop}
              delay={3000}
              url={"/products?category=zapatilla"}
            />
          </div>
          <div className={style.container__twoSection__left__bottom}>
            <CategoryListings
              title="Otros"
              images={leftBottom}
              delay={3000}
              url={"/products"}
            />
          </div>
        </div>
        <div className={style.container__twoSection__right}>
          <div className={style.container__twoSection__right__top}>
            <CategoryListings
              title="Buzos"
              images={rightTop}
              delay={3000}
              url={"/products?category=buzo"}
            />
          </div>
          <div className={style.container__twoSection__right__bottom}>
            <CategoryListings
              title="Camperas"
              images={rightBottom}
              delay={3000}
              url={"/products?category=campera"}
            />
          </div>
        </div>
      </div>
      <div className={style.container__threeSection}>
        {/* <div className={style.container__threeSection__filters}>
          <button>ULTIMOS PRODUCTOS</button>
          <button>PRODUCTOS DESTACADOS</button>
          <button>PRODUCTOS EN OFERTA</button>
        </div> */}
        {getProductsQuery.isLoading ? (
          <Spinner />
        ) : (
          getProductsQuery.isError ?
          <Warning title={"Se ha producido un error"} text={"Los productos no se han podido cargar; por favor, inténtelo de nuevo más tarde."}/>
          :
          getProductsQuery.isSuccess && (
            <ul className={style.container__threeSection__products}>
              {getProductsQuery.data
                ?.filter((f) => f.show)
                ?.map((p) => {
                  return (
                    <CardProduct
                      key={p._id}
                      id={p?._id}
                      idConfig={p?.idConfig}
                      title={p?.title}
                      price={p?.price}
                      offer={p?.offer}
                      rating={p?.rating}
                      discount={p?.discount}
                      img={p?.images[0]?.link}
                    />
                  );
                })}
            </ul>
          )
        )}
      </div>
    </div>
  );
}
