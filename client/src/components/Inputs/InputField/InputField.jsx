import React from "react";
import style from "./InputField.module.scss";
import { TextField } from "@mui/material";
import handleOnChange from "../../../functions/handleOnChange";

export default function InputField({ filter, name, title, setFilter }) {

  return (
    <TextField
      id="outlined-number"
      label={title}
      type="number"
      value={filter[name]}
      onChange={(e) => handleOnChange(setFilter, e)}
      name={name}
      className={style.container}
      InputLabelProps={{
        shrink: true,
      }}
    />
  );
}
