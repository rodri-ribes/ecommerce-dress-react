import React, { useState } from "react";
import style from "./MobileMailCard.module.scss";
import useSetting from "../../../../../../hooks/useSetting";

export default function MobileMailCard({ mails, slicePrevious, sliceNext }) {
  const { setting } = useSetting();

  const [viewMail, setViewMail] = useState(false);

  return (
    <ul className={style.container}>
      {mails?.slice(slicePrevious, sliceNext)?.map((p) => {
        return (
          <li key={p?._id} className={style.container__card}>
            <header className={style.container__card__header}>
              <h2
                onClick={() =>
                  setViewMail((prev) => (prev !== p?._id ? p?._id : ""))
                }
              >
                {p?.name}
              </h2>
              <button
                onClick={() =>
                  setViewMail((prev) => (prev !== p?._id ? p?._id : ""))
                }
              >
                <i
                  className={`bi bi-arrow-${
                    viewMail === p._id ? "up" : "down"
                  }-circle`}
                ></i>
              </button>
            </header>
            {viewMail === p?._id && (
              <ul className={style.container__card__content}>
                <li>
                  <p>
                    <b>E-mail: </b>
                    {p?.email}
                  </p>
                </li>
                <li>
                  <p>
                    <b>Mensaje: </b> {p?.message}
                  </p>
                </li>
                <li>
                  <b>Responder: </b>
                  <a
                    href={`mailto:${p?.email}?Subject=Respondimos tu consulta  - ${setting?.name_of_the_page}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Abrir Correo
                    <i className="bi bi-envelope-paper"></i>
                  </a>
                </li>
              </ul>
            )}
          </li>
        );
      })}
    </ul>
  );
}
