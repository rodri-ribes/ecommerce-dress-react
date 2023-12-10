import React, { useState } from "react";
import style from "./ListImages.module.scss";

export default function ListImages({ showImage, product, setShowImage }) {
  const [zoom, setZoom] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const image = e.currentTarget;
    const { left, top, width, height } = image.getBoundingClientRect();
    const x = (e.pageX - left) / width;
    const y = (e.pageY - top) / height;

    setPosition({ x, y });
    setZoom(true);
  };

  const handleMouseLeave = () => {
    setZoom(false);
  };

  return (
    <div className={style.container}>
      <div
        className={style.container__viewImage}
        style={
          product?.images?.length > 1 ? { height: "80%" } : { height: "100%" }
        }>
        <img
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          src={showImage}
          alt={product?.title}
          className={zoom ? style.zoomed : ""}
          style={{
            transformOrigin: `${position.x * 100}% ${position.y * 100}%`,
          }}
        />
      </div>
      {product?.images?.length > 1 && (
        <ul
          style={
            product?.images?.length > 1 ? { height: "19%" } : { height: "0%" }
          }
          className={style.container__list}>
          {product?.images?.map((p, i) => {
            return (
              <li key={i}>
                <img
                  style={{
                    opacity: `${showImage === p?.link ? "1" : ".5"}`,
                  }}
                  src={p?.link}
                  alt={p?.name}
                  onClick={() => setShowImage(p?.link)}
                />
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
