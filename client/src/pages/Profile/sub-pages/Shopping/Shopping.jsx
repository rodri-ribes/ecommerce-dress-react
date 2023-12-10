import React, { useState } from "react";
import style from "./Shopping.module.scss";

//------ imports
import { useQuery, useQueryClient } from "@tanstack/react-query";
//------ components

import ProductsList from "../../../../components/Dashboard/ProductsList/ProductsList";
import InputFile from "../../../../components/Inputs/InputFile/InputFile";
import Button from "../../../../components/Inputs/Button/Button";
import Spinner from "../../../../components/Spinner/Spinner";
import ErrorAlert from "../../../../components/ErrorAlert/ErrorAlert";
import Warning from "../../../../components/Warning/Warning";
//------ functions
import { whatsapp } from "../../../../functions/whatsapp";
import { getPurchases } from "../../../../services/user";

//------ hooks
import useQueryUser from "../../../../hooks/user/useQueryUser";
import useMutationCustomer from "../../../../hooks/customer/useMutationCustomer";
import useSetting from "../../../../hooks/useSetting";

export default function Shopping() {
  const { user } = useQueryUser();
  const { setting } = useSetting();
  const [proofOfPayment, setProofOfPayment] = useState(false);
  const { updateCustomerMutation } = useMutationCustomer();

  const queryClient = useQueryClient();

  const { data, isLoading, isFetching,  isError, isSuccess } = useQuery(
    ["userPurchases"],
    async () => getPurchases(user?._id),
    {
      refetchOnWindowFocus: true,
      refetchInterval: 300000,
      enabled: true,
    }
  );

  const [viewPurchase, setViewPurchase] = useState("");

  return (
    <div className={style.container} style={{backgroundColor: `${data?.length === 0 ? "white" : "none"}`}}>
      <ul className={style.container__shopping}>
        {isLoading || isFetching ? (
          <Spinner />
        ) : isError ? (
          <ErrorAlert typeError={"user"} />
        ) : isSuccess && data?.length === 0 ? (
          <Warning
            title={"Se mostrarán aquí las compras realizadas"}
            text={
              "¡ Aprovecha las increíbles ofertas y realiza tu compra hoy mismo !"
            }
          />
        ) : (
          [...data]?.reverse()?.map((p, i) => (
            <li className={style.container__shopping__card} key={p._id}>
              <header>
                <h3
                 onClick={() =>
                  setViewPurchase((prev) => (prev === p._id ? "" : p._id))
                }
                >Compra ({p.date.split(" - ")[1]})</h3>
                <button
                  className={viewPurchase === p?._id && style.btn_animation}
                  onClick={() =>
                    setViewPurchase((prev) => (prev === p._id ? "" : p._id))
                  }
                >
                  <i className={`bi bi-arrow-up-circle`}></i>
                </button>
              </header>
              {viewPurchase === p._id && (
                <main className={style.container__shopping__card__content}>
                  <div
                    className={style.container__shopping__card__content__data}
                  >
                    <ul
                      className={
                        style.container__shopping__card__content__data__list
                      }
                    >
                      <li>
                        <b>Estado:</b>
                        <p
                          style={{
                            color: `${p.status.style ? "green" : "red"}`,
                          }}
                        >
                          {p?.status?.text}
                        </p>
                      </li>
                      <li>
                        <b>Metodo de Pago:</b>
                        <p>{p?.paymentMethod}</p>
                      </li>
                      <li>
                        <b>Total:</b>
                        <p>$ {Intl.NumberFormat("es-US").format(p?.total)}</p>
                      </li>
                      {p?.paymentMethod !== "Efectivo" && (
                        <li>
                          <b>Comprobante:</b>
                          {p?.proofOfPayment ? (
                            <a
                              href={p?.proofOfPayment?.link}
                              target="_blank"
                              rel="noreferrer"
                            >
                              Ver <i className="bi bi-eye"></i>
                            </a>
                          ) : (
                            <p>No cargaste el comprobante.</p>
                          )}
                        </li>
                      )}
                      {!p?.proofOfPayment &&
                        p?.paymentMethod !== "Efectivo" && (
                          <InputFile
                            proofOfPayment={proofOfPayment}
                            setProofOfPayment={setProofOfPayment}
                            customer={p}
                            user={user}
                          />
                        )}
                      <li>
                        <b>Forma de Entrega:</b>
                        <p>{p?.shipment}</p>
                      </li>
                    </ul>
                    <div
                      className={
                        style.container__shopping__card__content__data__notification
                      }
                    >
                      <h3>Notificanos cuando te llegue el producto</h3>
                      <div
                        className={
                          style.container__shopping__card__content__data__notification__buttons
                        }
                      >
                        {(!updateCustomerMutation.isSuccess ||
                          p?.status?.text !== "Entregado.") &&
                          (
                            p?.status?.text === "Producto enviado." ||
                            p?.status?.text ===  "Productos enviados."
                          ) && (
                            <Button
                              icon={"check-circle"}
                              stylebtn={"v2"}
                              type={"button"}
                              title={"Entregado "}
                              disabled={
                                updateCustomerMutation.isLoading ||
                                updateCustomerMutation.isSuccess
                              }
                              isLoading={updateCustomerMutation.isLoading}
                              action={() => {
                                updateCustomerMutation.mutate({
                                  id: p._id,
                                  status: {
                                    text: "Entregado.",
                                    style: true,
                                  },
                                });
                              }}
                            />
                          )}
                        <Button
                          icon={"whatsapp"}
                          stylebtn={"v2"}
                          type={"button"}
                          title={"WhatsApp "}
                          disabled={false}
                          isLoading={false}
                          action={() => whatsapp(setting)}
                        />
                      </div>
                    </div>
                  </div>
                  <div
                    className={
                      style.container__shopping__card__content__products
                    }
                  >
                    <ProductsList products={p?.products} />
                  </div>
                </main>
              )}
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
