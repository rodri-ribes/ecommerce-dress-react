import React from "react";
import style from "./InputGroup.module.scss";
import { Field, ErrorMessage } from "formik";
export default function InputGroup({
  title,
  name,
  type,
  values,
  options,
  errors,
}) {
  return (
    <div className={style.container}>
      <div className={style.container__data}>
        <b>{title}:</b>
        {options.edit || options.createSetting ? (
          <Field type={type} id={name} name={name} />
        ) : (
          <p>
            {type === "number"
              ? "$ " + Intl.NumberFormat("us-US").format(values[name])
              : values[name] ?
              values[name] :
              <b style={{color: "red"}}>* Requerido</b>
              }
          </p>
        )}
      </div>
      <ErrorMessage
        name={name}
        component={() => (
          <p className={style.container_error}>{errors[name]}</p>
        )}
      />
    </div>
  );
}
