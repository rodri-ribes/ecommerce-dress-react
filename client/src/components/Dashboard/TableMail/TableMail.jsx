import React from "react";
import style from "./TableMail.module.scss";

//------ Components
import Menu from "../../../components/Modal/Modal";

//------ hooks
import useSetting from "../../../hooks/useSetting";
import useMail from "../../../hooks/mail/useMail";
import openMenu from "../../../functions/openMenu";

export default function TableMail({
  mails,
  setMenu,
  menu,
  slicePrevious,
  sliceNext,
}) {
  const { setting } = useSetting();
  const { deleteMutationMail } = useMail();


  return (
    <table cellSpacing="0">
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Email</th>
          <th>Mensaje</th>
          <th>Responder</th>
          <th>Acción</th>
        </tr>
      </thead>
      <tbody>
        {mails?.slice(slicePrevious, sliceNext)?.map((p) => {
          return (
            <tr key={p?._id}>
              <td>{p?.name}</td>
              <td>{p?.email}</td>
              <td title={p?.message}>
                {p?.message?.slice(0, 10)} {p?.message?.length > 10 && "..."}
              </td>
              <td>
                <a
                  href={`mailto:${p?.email}?Subject=Respondimos tu consulta  - ${setting?.name_of_the_page}`}
                  target="_blank"
                  rel="noreferrer">
                  Responder
                  <i className="bi bi-envelope-paper"></i>
                </a>
              </td>
              <td>
                <button
                  className={style.options_btn}
                  id="menu"
                  onClick={() => openMenu(setMenu,!menu?.menu, "", p, false)}>
                  <i id="menu" className="bi bi-three-dots-vertical"></i>
                </button>
                {menu?.obj?._id === p?._id && menu?.menu && (
                  <Menu
                    styleMenu={{ right: "5rem", top: "1.5rem", width: "180px" }}
                    setModal={setMenu}>
                    <button
                      onClick={() => openMenu(setMenu,!menu?.menu, "message", p, true)}>
                      <i className="bi bi-envelope"></i>
                      Ver Mensaje
                    </button>
                    <button
                      onClick={() => {
                        openMenu(setMenu,!menu?.menu, "", false, false);
                        deleteMutationMail.mutate({ id: p?._id });
                        openMenu(setMenu,!menu?.menu, "", false, false);
                      }}>
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
