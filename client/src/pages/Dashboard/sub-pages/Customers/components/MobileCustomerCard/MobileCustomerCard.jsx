import React from "react";
import style from "./MobileCustomerCard.module.scss";

//------ components
import Menu from "../../../../../../components/Menu/Menu";
//------ functions

//------ hooks
import useFileUploader from "../../../../../../hooks/useFileUploader";
import { whatsapp } from "../../../../../../functions/whatsapp";
import useMutationCustomer from "../../../../../../hooks/customer/useMutationCustomer";
import updateStatus from "../../functions/updateStatus";
import deleteCustomer from "../../functions/deleteCustomer";
import openMenu from "../../../../../../functions/openMenu";

export default function MobileCustomerCard({
  customers,
  slicePrevious,
  sliceNext,
  menu,
  setMenu,
}) {
  const { updateCustomerMutation, deleteCustomerMutation } =
    useMutationCustomer();

  const { deleteFile } = useFileUploader();
  const [viewCustomer, setViewCustomer] = React.useState();

  return (
    <ul className={style.container}>
      {customers?.slice(slicePrevious, sliceNext)?.map((p) => {
        return (
          <li key={p?._id} className={style.container__card}>
            <header className={style.container__card__header}>
              <img src={p?.user?.image?.link} alt={p?.title} />
              <h2
               onClick={() =>
                setViewCustomer((prev) => (prev !== p?._id ? p?._id : ""))
              }>
                {p?.user?.firstname} {p?.user?.lastname}
              </h2>
              <button
              className={viewCustomer === p?._id && style.btn_animation}
                onClick={() =>
                  setViewCustomer((prev) => (prev !== p?._id ? p?._id : ""))
                }
              >
                <i
                  className={`bi bi-arrow-up-circle`}
                ></i>
              </button>
            </header>
            {viewCustomer === p?._id && (
              <ul className={style.container__card__content}>
                <li>
                  <b>Acción: </b>
                  <button
                    className={style.options_btn}
                    id="menu"
                    onClick={() => openMenu(setMenu,!menu?.menu, "", p, false)}
                  >
                    <i id="menu" className="bi bi-three-dots-vertical"></i>
                  </button>
                </li>
                <li>
                  <p>
                    <b>Fecha: </b>
                    {p?.date}
                  </p>
                </li>
                <li>
                  <p>
                    {" "}
                    <b>Estado: </b> {p?.status?.text}
                  </p>
                </li>
                <li>
                  <p>
                    {" "}
                    <b>Total: </b> ${" "}
                    {Intl.NumberFormat("us-US").format(p?.total)}
                  </p>
                </li>
                <li>
                  <b>Ampliar: </b>
                <button
                  onClick={() =>
                    openMenu(setMenu, false, "ExtendedInformation", p, true)
                  }>
                  <i className="bi bi-list-check"></i>
                </button>
                </li>
                <li>
                  <p>
                    <b>Metodo de Pago: </b> {p?.paymentMethod}
                  </p>
                </li>
                <li>
                  <p>
                    {" "}
                    <b>Comprobante: </b>{" "}
                  </p>
                  {p?.proofOfPayment ? (
                    <a
                      href={p?.proofOfPayment?.link}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <i className="bi bi-eye"></i>
                    </a>
                  ) : (
                    <button
                      className={style.btn_Whatsapp}
                      onClick={() =>
                        whatsapp(p.user, "necesito el comprobante de pago.")
                      }
                    >
                      <i className="bi bi-whatsapp"></i> Solicitar
                    </button>
                  )}
                </li>
              </ul>
            )}
            {menu?.obj?._id === p?._id && menu?.menu && (
              <Menu
                styleMenu={{ right: "5rem", top: "1.5rem", width: "180px" }}
                setMenu={setMenu}
              >
                {!p.status.style && (
                  <button
                    onClick={() =>
                      updateStatus(p, updateCustomerMutation, setMenu)
                    }
                  >
                    <i className="bi bi-truck"></i>
                    {p.shipment === "Envio" ? "Enviado" : "Entregado"}
                  </button>
                )}
                <button onClick={() => whatsapp(p.user)}>
                  <i className="bi bi-whatsapp"></i>
                  WhatsApp
                </button>
                <button
                  onClick={() =>
                    deleteCustomer(
                      p,
                      deleteCustomerMutation,
                      deleteFile,
                      setMenu
                    )
                  }
                >
                  <i className="bi bi-trash3"></i>
                  Eliminar
                </button>
              </Menu>
            )}
          </li>
        );
      })}
    </ul>
  );
}
