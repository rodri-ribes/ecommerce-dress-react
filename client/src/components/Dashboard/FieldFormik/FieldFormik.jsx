import React from "react";
import { Field, ErrorMessage } from "formik";
export default function FieldFormik({
  style,
  as,
  type,
  name,
  placeholder,
  errors,
}) {
  return (
    <div className={style.container__form__section__group}>
      <div className={style.container__form__section__group__price}>
        {name === "price" && <p>$</p>}
        <Field
          className={`${style.container__form__section__group_input_default}
                    ${
                      name === "price"
                        ? style.container__form__section__group_input
                        : name === "content" &&
                          style.container__form__section__group_textarea
                    }`}
          type={type}
          id={name}
          name={name}
          placeholder={placeholder}
          as={as}
        />
      </div>
      <ErrorMessage
        name={name}
        component={() => (
          <p className={style.container__form__section__group_error}>
            {errors[name]}
          </p>
        )}
      />
    </div>
  );
}
