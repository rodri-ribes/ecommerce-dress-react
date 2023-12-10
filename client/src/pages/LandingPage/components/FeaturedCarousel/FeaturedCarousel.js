import React from "react";
import style from "./FeaturedCarousel.module.scss";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, A11y } from "swiper/modules";

import "swiper/scss";
import "swiper/scss/navigation";
import "swiper/scss/pagination";
import "swiper/scss/autoplay";

import "./FeaturedCarousel.scss";

export default function FeaturedCarousel() {
  let listImages = [
    {
      name: "Nike",
      path: require(`../../../../assets/images/landingpage/1.jpg`),
    },
    {
      name: "Nike",
      path: require(`../../../../assets/images/landingpage/2.jpg`),
    },
    {
      name: "Nike",
      path: require(`../../../../assets/images/landingpage/3.jpg`),
    },
  ];

  return (
    <Swiper
      className={style.container}
      modules={[Navigation, Pagination, A11y, Autoplay]}
      spaceBetween={0}
      slidesPerView={1}
      navigation={false}
      pagination={true}
      scrollbar={{ draggable: true }}
      autoplay={{
        delay: 4000,
        disableOnInteraction: true,
      }}>
      {listImages?.map((p, i) => {
        return (
          <SwiperSlide key={i}>
            <img src={p.path} alt={i} />

            {/* <div className={style.container__wrapper}>
              <div className={style.container__wrapper__content}>
                <h3>{p.title}</h3>
                <p>{p.description}</p>
                <button>ORDER NOW</button>
              </div>
              <div className={style.container__wrapper__img}>
              </div>
            </div> */}
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}
