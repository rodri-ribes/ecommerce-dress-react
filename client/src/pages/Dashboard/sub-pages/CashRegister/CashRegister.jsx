import React, { useEffect, useState } from "react";
import useQueryCustomer from "../../../../hooks/customer/useQueryCustomer";
import style from "./CashRegister.module.scss";

export default function CashRegister() {
  const { getCustomerQuery, reloadCustomer } = useQueryCustomer();

  const [paymentMethod, setPaymentMethod] = useState({
    efectivo: 0,
    mercadoPago: 0,
    tarjeta: 0,
    loaded: false,
  });

  useEffect(() => {
    if (!getCustomerQuery.data) reloadCustomer();

    else if (getCustomerQuery.isSuccess && !paymentMethod.loaded) {
      getCustomerQuery?.data?.forEach((p) => {
        let method =
          p?.paymentMethod === "Mercado Pago"
            ? "mercadoPago"
            : p?.paymentMethod === "Efectivo"
            ? "efectivo"
            : "tarjeta";

        let active =
          p.status.text === "Preparando pedido..." ||
          p.status.text.includes("pospuso") ||
          p.status.text === "Esperando al cliente...";

        if (active) {
          setPaymentMethod((prev) => ({
            ...prev,
            [method]: prev[method] + p?.total,
          }));
        }
      });
      setPaymentMethod((prev) => ({
        ...prev,
        loaded: true,
      }));
    }
  }, [getCustomerQuery.data]);

  return (
    <div className={style.container}>
      <header className={style.container__header}>
        <h2>CAJA:</h2>
      </header>
      <ul className={style.container__customers}>
        {getCustomerQuery?.data?.map((c) => {
          let creditMoney =
            c?.status?.text === "Preparando pedido..." ||
            c?.status?.text?.includes("pospuso") ||
            c?.status?.text === "Esperando al cliente...";
          return (
            <li key={c?._id}>
              <i>
                {c?.user?.firstname} {c?.user?.lastname} ({c?.paymentMethod})
              </i>
              <b
                className={
                  creditMoney ? style.creditedMoney : style.unaccreditedMoney
                }
              >
                $ {Intl.NumberFormat("us-US").format(c?.total)}
                <i
                  className={`bi bi-${creditMoney ? "check2-circle" : "clock"}`}
                ></i>
              </b>
            </li>
          );
        })}
      </ul>
      <footer className={style.container__footer}>
        <h3>SUBTOTAL:</h3>
        <ul>
          <li>
            <i>Efectivo:</i>
            <p>$ {Intl.NumberFormat("us-US").format(paymentMethod.efectivo)}</p>
          </li>
          <li>
            <i>Mercado Pago:</i>
            <p>
              $ {Intl.NumberFormat("us-US").format(paymentMethod.mercadoPago)}
            </p>
          </li>
          <li>
            <i>Tarjeta:</i>
            <p>$ {Intl.NumberFormat("us-US").format(paymentMethod.tarjeta)}</p>
          </li>
          <hr />
          <li>
            <b>TOTAL:</b>
            <p>
              ${" "}
              {Intl.NumberFormat("us-US").format(
                paymentMethod.efectivo +
                  paymentMethod.mercadoPago +
                  paymentMethod.tarjeta
              )}
            </p>
          </li>
        </ul>
      </footer>
    </div>
  );
}
