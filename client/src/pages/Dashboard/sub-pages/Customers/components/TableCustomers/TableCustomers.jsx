import React from "react";
import style from "./TableCustomers.module.scss";

//------ Components
import Menu from "../../../../../../components/Menu/Menu";

//------ hooks
import useMutationCustomer from "../../../../../../hooks/customer/useMutationCustomer";
import useFileUploader from "../../../../../../hooks/useFileUploader";
//------ functions
import { whatsapp } from "../../../../../../functions/whatsapp";
import updateStatus from "../../functions/updateStatus";
import deleteCustomer from "../../functions/deleteCustomer";

export default function TableCustomers({
  customers,
  setMenu,
  menu,
  slicePrevious,
  sliceNext,
}) {
  const { updateCustomerMutation, deleteCustomerMutation } =
    useMutationCustomer();

  const { deleteFile } = useFileUploader();

  const openMenu = (menu, action, obj, modal) => {
    setMenu({ menu, action, obj, modal });
  };

  return (
    <table cellSpacing="0">
      <thead>
        <tr>
          <th colSpan="2">Cliente</th>
          <th>Total</th>
          <th>Metodo de Pago</th>
          <th>Comprobante</th>
          <th>Ampliar INFO</th>
          <th>Fecha</th>
          <th>Acción</th>
        </tr>
      </thead>
      <tbody>
        {customers?.slice(slicePrevious, sliceNext)?.map((p) => {
          return (
            <tr key={p?._id}>
              <td>
                <img src={p?.user?.image?.link} alt={p?.title} />
              </td>
              <td>
                {p?.user?.firstname} {p?.user?.lastname}
              </td>
              <td>$ {Intl.NumberFormat("us-US").format(p?.total)}</td>

              <td>{p?.paymentMethod}</td>
              <td>
                {
                  p?.paymentMethod === "Efectivo" ?
                  <p>No es requerido</p>
                  :
                  p?.proofOfPayment ? (
                    <a
                      href={p?.proofOfPayment?.link}
                      target="_blank"
                      rel="noreferrer">
                      <i className="bi bi-eye"></i>
                    </a>
                  ) : (
                    <button
                      className={style.btn_Whatsapp}
                      onClick={() =>
                        whatsapp(p.user, "necesito el comprobante de pago.")
                      }>
                      Solicitar <i className="bi bi-whatsapp"></i>
                    </button>
                  )
                }
              </td>
              <td>
                <button
                  onClick={() =>
                    openMenu(false, "ExtendedInformation", p, true)
                  }>
                  <i className="bi bi-list-check"></i>
                </button>
              </td>
              <td>{p?.date}</td>
              <td>
                <button
                  className={style.options_btn}
                  id="menu"
                  onClick={() => openMenu(!menu?.menu, "", p, false)}>
                  <i id="menu" className="bi bi-three-dots-vertical"></i>
                </button>
                {menu?.obj?._id === p?._id && menu?.menu && (
                  <Menu
                    styleMenu={{ right: "5rem", top: "1.5rem", width: "180px" }}
                    setMenu={setMenu}>
                    {!p.status.style && (
                      <button
                        onClick={() => updateStatus(p, updateCustomerMutation, setMenu)}>
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
                        deleteCustomer(p, deleteCustomerMutation, deleteFile, setMenu)
                      }>
                      <i className="bi bi-trash3"></i>
                      Eliminar
                    </button>
                  </Menu>
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
