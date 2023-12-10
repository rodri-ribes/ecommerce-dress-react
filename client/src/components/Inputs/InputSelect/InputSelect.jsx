import React from "react";
import { FormControl, InputLabel } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import handleOnChange from "../../../functions/handleOnChange";
import style from "./InputSelect.module.scss";

export default function InputSelect({
  filter,
  setFilter,
  arr,
  title,
  name,
}) {

  return (
    <FormControl
      variant="outlined"
      className={style.container}
      >
      <InputLabel id="demo-simple-select-outlined-label">{title}</InputLabel>
      <Select
        labelId="demo-simple-select-outlined-label"
        id="demo-simple-select-outlined"
        value={filter[name]}
        onChange={(e) => handleOnChange(setFilter, e)}
        label={title}
        name={name}
        style={{ height: "100%", width: "100%" }}>
        <MenuItem value="">
          <em>No Filtrar</em>
        </MenuItem>
        {arr?.map((f, i) => (
          <MenuItem key={i} value={f}>
            {f}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
