import React from "react";
import handleOnChange from "../../../functions/handleOnChange";
import style from "./InputSearch.module.scss";

export default function InputSearch({
  filter,
  setFilter,
  name,
  title,
}) {
  return (
    <div
      className={style.container}
      >
      <i className="bi bi-search"></i>
      <input
        placeholder={title}
        name={name}
        onChange={(e) => handleOnChange(setFilter, e)}
        value={filter[name]}
      />
      {filter[name] && filter[name]?.length > 0 && (
        <button
          className={style.container__cross}
          onClick={() => handleOnChange(setFilter, null, "search", "")}>
          <i className={`bi bi-x-lg`}></i>
        </button>
      )}
    </div>
  );
}
