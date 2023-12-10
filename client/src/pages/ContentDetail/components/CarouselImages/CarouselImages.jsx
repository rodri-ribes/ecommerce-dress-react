import React from "react";
import style from "./CarouselImages.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, A11y } from "swiper/modules";

import "swiper/scss";
import "swiper/scss/navigation";
import "swiper/scss/pagination";
import "swiper/scss/autoplay";

// import "./CarouselHome.scss";

export default function CarouselImages({ images }) {
  return (
    <Swiper
      className={style.container}
      modules={[Navigation, Pagination, A11y, Autoplay]}
      spaceBetween={10}
      slidesPerView={1}
      navigation={true}
      pagination={false}
      scrollbar={{ draggable: true }}
      autoplay={false}
      breakpoints={{
        "@0.00": {
          slidesPerView: 1,
          spaceBetween: 0,
        },
        // "@0.50": {
        //   slidesPerView: 1.25,
        //   spaceBetween: 8,
        // },
        // "@1.00": {
        //   slidesPerView: 2,
        //   spaceBetween: 8,
        // },
        // "@1.25": {
        //   slidesPerView: 3,
        //   spaceBetween: 8,
        // },
        // "@1.50": {
        //   slidesPerView: 4,
        //   spaceBetween: 8,
        // },
        // "@1.75": {
        //   slidesPerView: 8,
        //   spaceBetween: 8,
        // },
      }}
      
      >
      {images?.map((p, i) => {
            return (
              <SwiperSlide key={i}>
                <img
                  src={p.link}
                  alt={p.name}
                />
              </SwiperSlide>
            );
          })}
    </Swiper>
  );
}
