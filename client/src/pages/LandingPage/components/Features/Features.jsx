import React from "react";
import style from "./Features.module.scss";
import useSetting from '../../../../hooks/useSetting'
export default function Features() {

  const {setting} = useSetting()
  return (
    <div className={style.container}>
      <div className={style.container__card}>
        <div className={style.container__card__icon}>
          <i className="bi bi-truck"></i>
        </div>
        <div className={style.container__card__content}>
          <h3>Envio Gratis</h3>
          <p>Apartir de una orden de $ {Intl.NumberFormat("us-US").format(setting?.free_min_amount)}</p>
        </div>
      </div>
      <div className={style.container__card}>
        <div className={style.container__card__icon}>
          <i className="bi bi-shield-check"></i>
        </div>

        <div className={style.container__card__content}>
          <h3>Pagos Seguros</h3>
          <p>Tus datos estan protegidos</p>
        </div>
      </div>
      <div className={style.container__card}>
        <div className={style.container__card__icon}>
          <i className="bi bi-box-seam"></i>
        </div>
        <div className={style.container__card__content}>
          <h3>Devoluciones en 14 días</h3>
          <p>Compra con confianza</p>
        </div>
      </div>
    </div>
  );
}
