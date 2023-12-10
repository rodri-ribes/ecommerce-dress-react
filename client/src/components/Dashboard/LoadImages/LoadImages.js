import React from "react";
import style from "./LoadImages.module.scss";
import Compressor from "compressorjs";
import { v4 } from "uuid";

export default function LoadImages({ images, setFormik, setImagesToDelete }) {
  const deleteImage = (img) => {
    if (img?.link) {
      setImagesToDelete((prev) => [...prev, img]);
    }
    let arr = images?.filter((p) => p?.name !== img?.name);
    setFormik((prev) => ({ ...prev, images: arr }));
  };

  const loadImages = (e) => {
    let imgs = Object.values(e.target.files);

    for (const img of imgs) {
      new Compressor(img, {
        quality: 0.6,
        async success(result) {
          setFormik((prev) => ({
            ...prev,
            images: [...prev.images, result],
          }));
        },
        error(err) {
          console.log(err.message);
        },
      });
    }
  };

  return (
    <div className={style.container}>
      <div className={style.container__button}>
        <i className="bi bi-upload"></i>
        <p>{images?.length > 0 ? "IMAGENES CARGADAS" : "CARGAR IMAGENES"}</p>
        <input
          className={style.container__button_input}
          type="file"
          accept=".jpg, .png"
          multiple
          title={images?.length > 0 ? "IMAGENES CARGADAS" : "CARGAR IMAGENES"}
          onChange={(e) => loadImages(e)}
        />
      </div>
      <div className={style.container__list}>
        {images?.map((p) => {
          return (
            <div key={v4()} className={style.container__list_item}>
              <i className="bi bi-x-circle" onClick={() => deleteImage(p)}></i>
              <img
                src={
                  p?.link
                    ? p?.link
                    : typeof p === "object"
                    ? URL.createObjectURL(p)
                    : ""
                }
                alt={p?.name}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
