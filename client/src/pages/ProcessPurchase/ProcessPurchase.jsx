import React, { useEffect, useState } from "react";
import style from "./ProcessPurchase.module.scss";

//------ Imports
import { FormControl, InputLabel } from "@mui/material";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { Link, useNavigate } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";

//------ Components
import ModalAlert from "../../components/ModalAlert/ModalAlert";
import CardProductPurchasing from "./components/CardProductPurchasing/CardProductPurchasing";
import Spinner from "../../components/Spinner/Spinner";
//------ functions
import totalCart from "../../functions/totalCart";
import stockCounter from "../Dashboard/sub-pages/ManageProducts/functions/stockCounter";
import { continueShopping } from "./functions/continueShopping";
import { getPurchases } from "../../services/user";

//------ hooks
import useSetting from "../../hooks/useSetting";

export default function ProcessPurchase() {
  const queryClient = useQueryClient();
  let buynow = queryClient.getQueryData(["buynow"]);
  let user = queryClient.getQueryData(["user"]);
  let navigate = useNavigate();

  const userPurchasesQuery = useQuery(["userPurchases"], 
    async () => getPurchases(user?._id)
  , {
  refetchOnWindowFocus: false,
  enabled: !queryClient.getQueryData(["userPurchases"]),
  });


  const { setting } = useSetting();

  const { address, location, province } = setting?.store_address;

  //donde se cargara el talle, color y cantidad de cada producto
  const [productFeatures, setProductFeatures] = useState({});

  //para saber si hay stock en el producto
  const [productNotAvilable, setProductNotAvilable] = useState({});

  //metodo de pago y envio
  const [options, setOptions] = useState({
    paymentMethod: "",
    shipment: "",
  });

  const methods = ["Efectivo", "Mercado Pago", "Tarjeta"];

  //state modal
  const [modal, setModal] = useState({ view: "", text: "" });

  useEffect(() => {
    //si el usuario quita un producto, se quita tambien el obj productFeatures
    //se guarda en el local storage si el usuario lo quito desde el modal del carrito
    let save_id = window.localStorage.getItem("drop-product");
    if (save_id) {
      delete productFeatures[save_id];
      window.localStorage.removeItem("drop-product");
    }
    if (user) {
      //para saber si hay stock en el producto
      stockCounter(user?.cart, setProductNotAvilable);
      //para prevenir que el usuario siga sin cargar los datos.
      user?.cart?.forEach((p) => {
        setProductFeatures((prev) => ({
          ...prev,
          [p._id]: {
            waist: "",
            color: "",
            amount: 1,
          },
        }));
      });
    }
    window.scrollTo(0, 0);

    if (!buynow && user?.cart?.length === 0) {
      navigate("/");
    }

  }, [user]);

  const handleOnChange = (e) => {
    if (e.target.name === "shipment" && options.paymentMethod === "Efectivo") {
      setOptions((prev) => ({ ...prev, paymentMethod: "" }));
    }
    setOptions((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return !buynow && user?.cart?.length === 0 ? (
    <Spinner />
  ) : (
    <div className={style.container}>
      <div className={style.container__products}>
        {buynow ? (
          <CardProductPurchasing
            key={buynow?._id}
            image={buynow?.images[0]?.link}
            title={buynow?.title}
            price={buynow?.price}
            discount={buynow?.discount}
            offer={buynow?.offer}
            sizeAndStock={buynow?.sizeAndStock}
            idConfig={buynow?.idConfig}
            id={buynow?._id}
            productNotAvilable={productNotAvilable}
            buynow={{
              waist: buynow.waist,
              color: buynow.color,
              amount: buynow.amount,
            }}
          />
        ) : (
          user?.cart?.map((p) => {
            return (
              <CardProductPurchasing
                key={p?._id}
                image={p?.images[0]?.link}
                title={p?.title}
                price={p?.price}
                discount={p?.discount}
                offer={p?.offer}
                sizeAndStock={p?.sizeAndStock}
                idConfig={p?.idConfig}
                id={p?._id}
                setProductFeatures={setProductFeatures}
                productFeatures={productFeatures}
                productNotAvilable={productNotAvilable}
              />
            );
          })
        )}
      </div>
      <div className={style.container__panel}>
        <h3>Resumen de compra</h3>
        <hr />
        <div className={style.container__panel__group}>
          <p> {buynow ? `Producto` : `Productos (${user?.cart?.length})`}</p>
          <p>
            ${" "}
            {Intl.NumberFormat("es-US").format(
              totalCart(user, buynow, productFeatures)
            )}
          </p>
        </div>
        <div className={style.container__panel__inputs}>
          <div className={style.container__panel__inputs__group}>
            {user?.domicile?.address ? (
              <>
                <input
                  type="radio"
                  name="shipment"
                  value={"Envio"}
                  onChange={handleOnChange}
                />
                <p>Enviar a {user?.domicile?.address}</p>
              </>
            ) : (
              <Link to="/profile/settings">CARGAR DOMICILIO</Link>
            )}
          </div>
          {setting?.local_active !== "false" && (
            <div className={style.container__panel__inputs__group}>
              <input
                type="radio"
                name="shipment"
                value={"Retiro en el local"}
                onChange={handleOnChange}
              />
              <p>Retiro en el local</p>
            </div>
          )}
          {options.shipment === "Retiro en el local" && (
            <i>Direccíon {address + ", " + location + ", " + province}</i>
          )}
        </div>
        {options.shipment === "Envio" && (
          <>
            <div
              className={`${style.container__panel__group} ${style.container__panel__shipment}`}>
              <p>Envio: </p>
              {totalCart(user, buynow, productFeatures) >=
              setting?.free_min_amount ? (
                <p>Gratis</p>
              ) : (
                <p>
                  $ {Intl.NumberFormat("es-US").format(setting?.shipping_price)}
                </p>
              )}
            </div>
            {totalCart(user, buynow, productFeatures) <
              setting?.free_min_amount && (
              <i>
                Envio GRATIS, apartir de una compra de ${" "}
                {Intl.NumberFormat("es-US").format(setting?.free_min_amount)}
              </i>
            )}
          </>
        )}

        <div
          className={`${style.container__panel__group} ${style.container__panel__total}`}>
          <p>TOTAL:</p>
          <p>
            ${" "}
            {Intl.NumberFormat("es-US").format(
              totalCart(user, buynow, productFeatures) <
                setting?.free_min_amount && options.shipment.includes("Envio")
                ? totalCart(user, buynow, productFeatures) +
                    setting.shipping_price
                : totalCart(user, buynow, productFeatures)
            )}
          </p>
        </div>
        <FormControl
          variant="outlined"
          className={style.container__panel__select}>
          <InputLabel id="demo-simple-select-outlined-label">
            Metodo de Pago
          </InputLabel>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={options.paymentMethod}
            name="paymentMethod"
            onChange={handleOnChange}
            label="Metodo de Pago">
            {methods
              ?.filter(
                (p) =>
                  (p.includes("Efectivo") &&
                    options.shipment.includes("Retiro")) ||
                  !p.includes("Efectivo")
              )
              .map((f, i) => (
                <MenuItem key={i} value={f}>
                  {f}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
        <button
          onClick={() =>
            continueShopping(
              totalCart,
              user,
              buynow,
              productFeatures,
              options,
              navigate,
              setModal,
              setting,
              userPurchasesQuery
            )
          }
          disabled={!options.paymentMethod || !options.shipment}>
          Continuar Compra
        </button>
      </div>

      {modal.view && <ModalAlert modal={modal} setModal={setModal} />}
    </div>
  );
}
