import React from "react";
import style from "./ProductsList.module.scss";

export default function ProductsList({ products }) {
  return (
    <ul className={style.container}>
      {products?.map((p) => {
        return (
          <li key={p._id} className={style.container__card}>
            <img src={p?.image} alt={p?.title} />
            <div className={style.container__card__content}>
              <h4>{p.title}</h4>
              <div className={style.container__card__content__price}>
                <p
                  style={{
                    textDecoration: `${
                      p.discount > 0 ? "line-through" : "none"
                    }`,
                  }}>
                  $ {Intl.NumberFormat("es-US").format(p.price)}
                </p>
                {p.discount > 0 && (
                  <b>$ {Intl.NumberFormat("es-US").format(p.discount)}</b>
                )}
              </div>
              <div className={style.container__card__content__features}>
                <p>
                  Talle: <b>{p.waist}</b>
                </p>
                <p>
                  Color: <b style={{ background: p.color }}></b>
                </p>
                <p>
                  Cantidad: <b>{p.amount}</b>
                </p>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
