import React from "react";
import style from "./FeaturedImagesCarousel.module.scss";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, A11y } from "swiper/modules";

import "swiper/scss";
import "swiper/scss/navigation";
import "swiper/scss/pagination";
import "swiper/scss/autoplay";

// import "./CarouselHome.scss";

export default function FeaturedImagesCarousel({ images, delay }) {

  return (
    <Swiper
      className={style.container}
      modules={[Navigation, Pagination, A11y, Autoplay]}
      spaceBetween={0}
      slidesPerView={1}
      navigation={false}
      pagination={false}
      scrollbar={{ draggable: true }}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
        
      }}
      >
      {images?.map((p, i) => {
        return (
          <SwiperSlide
          key={i}>
            <img src={p} alt={i} />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}
