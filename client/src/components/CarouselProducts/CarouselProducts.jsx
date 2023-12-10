import React from "react";
import style from "./CarouselProducts.module.scss";
import CardProduct from "../CardProduct/CardProduct";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, A11y } from "swiper/modules";

import "swiper/scss";
import "swiper/scss/navigation";
import "swiper/scss/pagination";
import "swiper/scss/autoplay";

// import "./CarouselHome.scss";

export default function CarouselProducts({ products, perView }) {
  return (
    <Swiper
      className={style.container}
      modules={[Navigation, Pagination, A11y, Autoplay]}
      spaceBetween={15}
      slidesPerView={perView}
      navigation={true}
      pagination={false}
      scrollbar={{ draggable: true }}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      breakpoints={{
        "@0.00": {
          slidesPerView: 2,
          spaceBetween: 8,
        },
        "@0.50": {
          slidesPerView: 2,
          spaceBetween: 8,
        },
        "@1.00": {
          slidesPerView: 2,
          spaceBetween: 8,
        },
        "@1.25": {
          slidesPerView: 3,
          spaceBetween: 8,
        },
        "@1.50": {
          slidesPerView: 4,
          spaceBetween: 8,
        },
        "@1.75": {
          slidesPerView: 4.5,
          spaceBetween: 15,
        },
      }}
      
      >
      {products &&
        products
          ?.filter((p) => p.show)
          .map((p, i) => {
            return (
              <SwiperSlide key={i}>
                <CardProduct
                  id={p?._id}
                  idConfig={p?.idConfig}
                  title={p?.title}
                  price={p?.price}
                  offer={p?.offer}
                  rating={p?.rating}
                  discount={p?.discount}
                  img={p?.images[0]?.link}
                />
              </SwiperSlide>
            );
          })}
    </Swiper>
  );
}
