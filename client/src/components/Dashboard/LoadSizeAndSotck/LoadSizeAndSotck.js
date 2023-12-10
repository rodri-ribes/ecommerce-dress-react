import React from "react";
import upperCase from "../../../functions/upperCase";
import deleteStock from "../functions/deleteStock";
import style from "./LoadSizeAndStock.module.scss";
import { v4 } from "uuid";
import loadStock from "../functions/loadStock";

export default function LoadSizeAndStock({
  listStock,
  setListStock,
  setFormik,
}) {
  return (
    <div className={style.container}>
      <div className={style.container__form}>
        <input
          className={style.container__form_input}
          type="text"
          placeholder="Talle"
          onChange={(e) =>
            setListStock((prev) => ({
              ...prev,
              waist: e?.target?.value,
            }))
          }
          value={listStock?.waist}
        />
        <input
          className={style.container__form_input_color}
          type="color"
          placeholder="Color"
          onChange={(e) => {
            // console.log(e);
            setListStock((prev) => ({
              ...prev,
              color: e?.target?.value,
            }));
          }}
          value={listStock?.color}
        />
        <input
          className={style.container__form_input}
          type="number"
          placeholder="Cantidad"
          onChange={(e) =>
            setListStock((prev) => ({
              ...prev,
              stock: e?.target?.value,
            }))
          }
          value={listStock?.stock}
        />
        <button
          type="button"
          onClick={(e) =>
            loadStock(e, listStock, setListStock, upperCase, setFormik)
          }
          disabled={
            listStock?.color?.length <= 0 ||
            listStock?.waist?.length <= 0 ||
            listStock?.stock?.length <= 0
          }>
          CARGAR
        </button>
      </div>
      <div
        style={{
          display: `${listStock?.lista?.length > 0 ? "flex" : "none"}`,
        }}
        className={style.container__list}>
        {[...listStock?.lista]?.reverse()?.map((s) => {
          return (
            <div className={style.container__list__item} key={v4()}>
              <i
                className="bi bi-x-circle"
                onClick={() =>
                  deleteStock(listStock, setListStock, s?.waist, setFormik)
                }></i>
              <b>Talle: {s?.waist}</b>
              <div className={style.container__list__item__listColorAndCant}>
                {s?.list?.map((l) => {
                  return (
                    <div
                      key={v4()}
                      className={
                        style.container__list__item__listColorAndCant_item
                      }>
                      <div
                        className={
                          style.container__list__item__listColorAndCant_item_color
                        }>
                        <p>Color: </p>
                        <div style={{ backgroundColor: l?.color }}></div>
                      </div>
                      <p>Cantidad: {l?.stock}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
