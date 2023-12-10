import React from "react";
import handleOnChange from "../../../functions/handleOnChange";
import style from "./InputDate.module.scss";

export default function InputDate({ setState, min }) {
  const minDate = () => {
    const date = new Date();
    let data = `${date.getFullYear()}-${date.getMonth() + 1}-${
      date.getDate() < 10 ? "0" + date.getDate() : date.getDate()
    }`;
    return data;
  };

  return (
    <input
      type="date"
      name="date"
      min={min ? minDate() : false}
      onChange={(e) => handleOnChange(setState, e)}
      className={style.input}
    />
  );
}
