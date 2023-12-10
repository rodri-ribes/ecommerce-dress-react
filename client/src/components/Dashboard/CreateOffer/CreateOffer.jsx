import React, { useState } from "react";
import style from "./CreateOffer.module.scss";

//------ Imports
import { FormControl, InputLabel } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

//------ functions
import { listOffer } from "../../../functions/clothingProperties";
import useMutationProduct from "../../../hooks/product/useMutationProduct";

export default function CreateOffer({ product, setMenu }) {
  const [offer, setOffer] = useState(product?.offer > 0 ? product?.offer : "");

  const { updateProductMutation } = useMutationProduct();

  const createOffer = (action) => {
    if (action === "create") {
      updateProductMutation.mutate({
        idConfig: product?.idConfig,
        discount: Math.round(product?.price - (product?.price * offer) / 100),
        offer: offer,
      });
    } else {
      updateProductMutation.mutate({
        idConfig: product?.idConfig,
        discount: 0,
        offer: 0,
      });
    }

    setMenu({
      menu: false,
      action: "",
      obj: false,
      modal: false,
    });
  };

  return (
    <div className={style.container}>
      <div className={style.container__selects}>
        <FormControl
          variant="outlined"
          className={style.container__selects_input}>
          <InputLabel id="demo-simple-select-outlined-label">
            Elegi una oferta
          </InputLabel>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={offer}
            onChange={(e) => setOffer(e.target.value)}
            label="Elegi una oferta"
            style={{ maxHeight: "60px" }}>
            {listOffer?.map((f, i) => (
              <MenuItem key={i} value={f}>
                - {f} % OFF
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <div className={style.container__selects__buttons}>
          <button
            onClick={() => createOffer("create")}
            className={style.container__selects__buttons_create}>
            Crear Oferta
          </button>
          {product?.discount > 0 && (
            <button
              onClick={() => createOffer("remove")}
              className={style.container__selects__buttons_delete}>
              Quitar Oferta
            </button>
          )}
        </div>
      </div>
      <div className={style.container__data}>
        <img src={product?.images[0]?.link} alt={product?.title} />
        <div className={style.container__data__info}>
          <h3>{product?.title}</h3>
          <p
            style={{
              textDecoration: `${offer < 1 ? "none" : "line-through"}`,
            }}>
            $ {Intl.NumberFormat("us-US").format(product?.price)}
          </p>
          {offer > 0 && (
            <b>
              ${" "}
              {Intl.NumberFormat("us-US").format(
                product?.price - (product?.price * offer) / 100
              )}
            </b>
          )}
        </div>
      </div>
    </div>
  );
}
