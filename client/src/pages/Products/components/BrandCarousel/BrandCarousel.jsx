import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, A11y } from "swiper/modules";
import style from "./BrandCarousel.module.scss";

import "swiper/scss";
import "swiper/scss/navigation";
import "swiper/scss/pagination";
import "swiper/scss/autoplay";

import { arrayImages } from "./arrayImages";

export default function BrandCarousel({ products, setFilter }) {
  const [brandFiltering, setbrandFiltering] = useState([]);

  useEffect(() => {
    if (products) {
      products?.forEach((e) => {
        setbrandFiltering((prev) => [...prev, e.brand]);
      });
      setbrandFiltering((prev) => [...new Set(prev)]);
    }
  }, [products]);

  return (
    <Swiper
      className={style.container}
      modules={[Navigation, Pagination, A11y, Autoplay]}
      spaceBetween={20}
      slidesPerView={8}
      navigation={true}
      pagination={false}
      scrollbar={{ draggable: true }}
      autoplay={{
        delay: 3000,
        disableOnInteraction: true,
      }}
      breakpoints={{
        "@0.00": {
          slidesPerView: 4,
          spaceBetween: 8,
        },
        "@0.50": {
          slidesPerView: 4,
          spaceBetween: 8,
        },
        "@1.00": {
          slidesPerView: 5,
          spaceBetween: 8,
        },
        "@1.25": {
          slidesPerView: 5.5,
          spaceBetween: 8,
        },
        "@1.50": {
          slidesPerView: 6,
          spaceBetween: 8,
        },
        "@1.75": {
          slidesPerView: 8,
          spaceBetween: 8,
        },
      }}>
      {brandFiltering?.length > 0 &&
        arrayImages
          ?.filter((p) => brandFiltering.includes(p.name))
          .map((p, i) => {
            return (
              <SwiperSlide key={i}>
                <div
                  className={style.container__card}
                  onClick={() =>
                    setFilter((prev) => ({ ...prev, brand: p?.name }))
                  }>
                  <div className={style.container__card__image}>
                    <img src={p.path} alt={i} />
                  </div>
                  <p>{p.name}</p>
                </div>
              </SwiperSlide>
            );
          })}
    </Swiper>
  );
}
