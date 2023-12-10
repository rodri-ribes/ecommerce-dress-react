import React, { useState } from "react";
import style from "./ExtendedInformation.module.scss";

//------ Components
import ProductList from "../ProductsList/ProductsList";
import InputDate from "../../Inputs/InputDate/InputDate";
//------ Functions
import { whatsapp } from "../../../functions/whatsapp";

//------ Hooks
import useMutationCustomer from "../../../hooks/customer/useMutationCustomer";
import Button from "../../Inputs/Button/Button";

export default function ExtendedInformation({ customer, setMenu }) {
  const [options, setOptions] = useState({});

  const { updateCustomerMutation } = useMutationCustomer();

  const modifyObj = (attribute, value) => {
    setMenu((prev) => ({
      ...prev,
      obj: {
        ...prev.obj,
        [attribute]: value,
      },
    }));
  };

  const postponeShipping = (updateCustomerMutation) => {
    if(options.date){
      let date = options?.date?.split("-");
  
      let text = `El envío se pospuso para el día ${date[2]}/${date[1]}/${date[0]}`;
  
      let status = {
        text,
        style: false,
      };
      updateCustomerMutation.mutate({
        id: customer._id,
        status,
      });
      modifyObj("status", status);

    }
  };

  const notification = (customer, updateCustomerMutation, status) => {
    updateCustomerMutation.mutate({
      id: customer._id,
      status,
    });

    modifyObj("status", status);
  };

  return (
    <div className={style.container}>
      <div className={style.container__left}>
        <header>
          <h3>
            Cliente: {customer?.user?.firstname} {customer?.user?.lastname}
          </h3>
        </header>
        <ul className={style.container__left__content}>
          <li>
            <b>Fecha:</b>
            <p>{customer?.date}</p>
          </li>
          <li>
            <b>Estado:</b>
            <p style={{ color: `${customer.status.style ? "green" : "red"}` }}>
              {customer?.status?.text}
            </p>
          </li>
          <li>
            <b>Metodo de Pago:</b>
            <p>{customer?.paymentMethod}</p>
          </li>
          <li>
            <b>Total:</b>
            <p>$ {Intl.NumberFormat("us-US").format(customer?.total)}</p>
          </li>
          {
            customer?.paymentMethod !== "Efectivo" &&
            <li>
              <b>Comprobante:</b>
              {customer?.proofOfPayment ? (
                <a
                  href={customer?.proofOfPayment?.link}
                  target="_blank"
                  rel="noreferrer">
                  Ver
                </a>
              ) : (
                <button
                className={style.btn_Whatsapp}
                onClick={() =>
                  whatsapp(customer.user, "necesito el comprobante de pago.")
                }>
                Solicitar <i className="bi bi-whatsapp"></i>
              </button>
              )}
            </li>
          }
          <li>
            <b>Forma de Entrega:</b>
            <p>{customer?.shipment}</p>
          </li>
        </ul>
        <b>Notificar al cliente:</b>
        {customer.status.text === "Verificando comprobante..." && (
          <p>
            Una vez que verifiques el pago, los productos elegidos se
            descontarán del stock disponible.
          </p>
        )}
        <div className={style.container__left__buttons}>
          {customer.status.text === "Verificando comprobante..." ? (
            <Button
              type="button"
              title={"Pago Verificado"}
              action={() =>
                notification(customer, updateCustomerMutation, {
                  text:
                    customer.shipment === "Envio"
                      ? "Preparando pedido..."
                      : "Esperando al cliente...",
                  style: false,
                })
              }
              isLoading={updateCustomerMutation.isLoading}
              disabled={updateCustomerMutation.isLoading}
              stylebtn={"v2"}
              icon="check"
              extent={{ width: "30%", heigth: "40px" }}
            />
          ) : (
            (customer.status.text === "Preparando pedido..." ||
              customer.status.text.includes("pospuso") ||
              customer.status.text === "Esperando al cliente...") && (
              <Button
                type="button"
                title={
                  customer.shipment === "Envio"
                    ? "Compra despachada"
                    : "Compra entregada"
                }
                action={() =>
                  notification(customer, updateCustomerMutation, {
                    text:
                      customer.shipment === "Envio"
                        ? customer?.products?.length > 1
                          ? "Productos enviados."
                          : "Producto enviado."
                        : "Compra entregada",
                    style: true,
                  })
                }
                isLoading={updateCustomerMutation.isLoading}
                disabled={updateCustomerMutation.isLoading}
                stylebtn={"v2"}
                icon="truck"
                extent={{ width: "auto", heigth: "40px" }}
              />
            )
          )}
          <Button
            type="button"
            title="WhatsApp"
            action={() => whatsapp(customer?.user)}
            isLoading={false}
            disabled={false}
            stylebtn={"v2"}
            icon="whatsapp"
            extent={{ width: "30%", heigth: "40px" }}
          />
        </div>
        {!customer.status.style &&
            customer?.paymentMethod !== "Efectivo" &&
          customer.status.text !== "Verificando comprobante..." && (
            <>
              <b>Posponer el envio:</b>
              <div className={style.container__left__options}>
                <InputDate setState={setOptions} min={true} />
                <Button
                  type="button"
                  title={"Notificar"}
                  action={() => postponeShipping(updateCustomerMutation)}
                  isLoading={updateCustomerMutation.isLoading}
                  disabled={updateCustomerMutation.isLoading}
                  stylebtn={"v2"}
                  icon="bell"
                  extent={{ width: "40%", height: "45px" }}
                />
              </div>
            </>
          )}
      </div>
      <div className={style.container__right}>
        <ProductList products={customer?.products} />
      </div>
    </div>
  );
}
