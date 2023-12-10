import React, { useEffect, useState } from "react";
import style from "./FeatureSelectors.module.scss";

import { FormControl, InputLabel } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

const Selector = ({ arr, value, setValue, name, title }) => {
  const handleOnChange = (e) => {
    if (name === "waist") {
      setValue((prev) => ({
        ...prev,
        waist: e.target.value,
        color: "",
        amount: 1,
      }));
    } else if (name === "color") {
      setValue((prev) => ({
        ...prev,
        color: e?.target.value,
        amount: 1,
      }));
    }else{
      setValue((prev) => ({
        ...prev,
        amount: e.target.value,
      }));
    }
  };

  return (
    <FormControl variant="outlined" className={`${style.container__input} ${!value.waist && style.container__input_waist}`}>
      <InputLabel id="demo-simple-select-outlined-label">{title}</InputLabel>
      <Select
        labelId="demo-simple-select-outlined-label"
        id="demo-simple-select-outlined"
        value={value[name]}
        onChange={handleOnChange}
        label={title}
        name={name}
      >
        {
          name !== "amount" &&
        <MenuItem value={""}>
          <em>Quitar</em>
        </MenuItem> 
        }
        {arr?.map((f, i) =>
          name === "waist" ? (
            <MenuItem key={i} value={f.waist}>
              {f.waist}
            </MenuItem>
          ) : name === "color" ? (
            <MenuItem key={i} value={f.color}>
              <div
                style={{
                  border: "1px solid black",
                  padding: ".7rem",
                  borderRadius: "5px",
                  background: f.color,
                }}
              ></div>
            </MenuItem>
          ) : (
            <MenuItem key={i} value={f}>
              {f}
            </MenuItem>
          )
        )}
      </Select>
    </FormControl>
  );
};

export default function FeatureSelectors({ value, setValue, product }) {
  const [availableStock, setAvailableStock] = useState([]);

  useEffect(() => {
    if (value.color) {
      setAvailableStock([]);
      let max = product?.sizeAndStock
        ?.find((f) => f?.waist === value?.waist)
        ?.list?.find((f) => f?.color === value?.color)?.stock;

      for (let i = 1; i < max; i++) {
        setAvailableStock((prev) => [...prev, i]);
      }
      setAvailableStock((prev) => [...prev, max]);
    }
  }, [value]);

  return (
    <div className={style.container}>
      <div className={style.container__waistAndColor}>
        <Selector
          arr={product?.sizeAndStock}
          value={value}
          setValue={setValue}
          name={"waist"}
          title={"Talles"}
        />
        {
          value?.waist && 
        <Selector
          arr={product?.sizeAndStock?.find((f) => f.waist === value.waist)?.list}
          value={value}
          setValue={setValue}
          name={"color"}
          title={"Colores"}
        />
        }
      </div>
      {
        value.color &&
        <Selector
          arr={availableStock.length > 0 ? availableStock : [1]}
          value={value}
          setValue={setValue}
          name={"amount"}
          title={`Cantidad (${product?.sizeAndStock
            ?.find((f) => f?.waist === value?.waist)
            ?.list?.find((f) => f?.color === value?.color)?.stock} Max)`}
        />
      }
    </div>
  );
}
