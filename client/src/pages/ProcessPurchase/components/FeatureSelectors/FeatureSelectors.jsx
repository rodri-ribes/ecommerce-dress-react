import React, { useEffect, useState } from "react";
import style from "./FeatureSelectors.module.scss";

import { FormControl, InputLabel } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

const Selector = ({ arr, value, handleOnChange, name, title, id }) => {
  
  return (
    <FormControl variant="outlined" className={`
    ${!value[id]?.waist && style.container__input_waist} ${style.container__input}  `}>
      <InputLabel id="demo-simple-select-outlined-label">{title}</InputLabel>
      <Select
        labelId="demo-simple-select-outlined-label"
        id="demo-simple-select-outlined"
        value={value}
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
            <MenuItem key={i} value={f?.waist}>
              {f.waist}
            </MenuItem>
          ) : name === "color" ? (
            <MenuItem key={i} value={f?.color}>
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

export default function FeatureSelectorsProcessPurchase({ value, setValue, sizeAndStock, id }) {
  const [availableStock, setAvailableStock] = useState([]);

  const handleOnChange = (e) => {
    setValue((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [e.target.name]: e.target.value,
      },
    }));

    if (e.target.name === "waist") {
      setValue((prev) => ({
        ...prev,
        [id]: {
          ...prev[id],
          color: "",
          amount: 1
        },
      }));
    }

    if (e.target.name === "color") {
      setValue((prev) => ({
        ...prev,
        [id]: {
          ...prev[id],
          amount: 1,
        },
      }));
    }
  };

  useEffect(() => {
    if (value[id]?.color && value[id]?.waist) {
      setAvailableStock([]);
      let max = sizeAndStock
        ?.find((f) => f?.waist === value[id]?.waist)
        ?.list?.find((f) => f?.color === value[id]?.color)?.stock;

      for (let i = 1; i < max; i++) {
        setAvailableStock((prev) => [...prev, i]);
      }
      setAvailableStock((prev) => [...prev, max]);
    }else{
      setAvailableStock([]);
    }
  }, [value]);

  return (
    <div className={style.container}>
      <div className={style.container__waistAndColor}>
        <Selector
          arr={sizeAndStock}
          value={value[id]?.waist}
          handleOnChange={handleOnChange}
          name={"waist"}
          title={"Talles"}
          id={id}
        />
        {
          value[id]?.waist &&
          <Selector
          arr={value[id]?.waist ? sizeAndStock?.find((f) => f.waist === value[id].waist)?.list : [""]}
            value={value[id]?.color}
            handleOnChange={handleOnChange}
            name={"color"}
            title={"Colores"}
          />
        }
      </div>
      {
        value[id]?.color &&
        <Selector
          arr={availableStock.length > 0 ? availableStock : [1]}
          value={value[id]?.amount}
          name={"amount"}
          handleOnChange={handleOnChange}
          title={`Cantidad (${sizeAndStock
            ?.find((f) => f?.waist === value[id]?.waist)
            ?.list?.find((f) => f?.color === value[id]?.color)?.stock} Max)`}
        />
      }
    </div>
  );
}
