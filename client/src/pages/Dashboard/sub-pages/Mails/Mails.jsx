import React, { useEffect, useState } from "react";
import useMail from "../../../../hooks/mail/useMail";
import Modal from "../../../../components/Modal/Modal";
import TableMail from "../../../../components/Dashboard/TableMail/TableMail";
import style from "../ManageProducts/ManageProducts.module.scss";
import Snipper from "../../../../components/Spinner/Spinner";
import ErrorAlert from "../../../../components/ErrorAlert/ErrorAlert";
import HelpAlert from "../../../../components/HelpAlert/HelpAlert";
import { Pagination } from "@mui/material";
import usePagination from "../../../../hooks/usePagination";
import MobileMailCard from "./components/MobileMailCard/MobileMailCard";

export default function Mails() {
  const { reloadMail, mails, getMailQuery } = useMail();
  const { max, page, handleOnChangePage, sliceNext, slicePrevious } =
    usePagination({
      count: 6,
      list: mails,
    });
    
  const [menu, setMenu] = useState({
    menu: false,
    action: "",
    obj: false,
    modal: false,
  });

  useEffect(() => {
    reloadMail();
  }, []);

  return (
    <div className={style.container}>
      {getMailQuery?.data?.length > 0 && (
        <header className={style.container__panel}>
          <p>
            <b>Nota: </b> Administrador, se recomienda eliminar los correos a
            medida que los vayas respondiendo para liberar espacio en el
            servidor.
          </p>
        </header>
      )}
      <main className={style.container__list}>
        {getMailQuery.isLoading || getMailQuery.isFetching ? (
          <Snipper />
        ) : getMailQuery.isError ? (
          <ErrorAlert typeError={"admin"} />
        ) : getMailQuery?.data?.length > 0 ? (
          <div className={style.container__list__content}>
            <MobileMailCard
            mails={mails}
            slicePrevious={slicePrevious}
            sliceNext={sliceNext}
           
            />
          <div className={style.container__list__content__table}>
            <TableMail
              mails={mails}
              slicePrevious={slicePrevious}
              sliceNext={sliceNext}
              setMenu={setMenu}
              menu={menu}
            />
          </div>
          </div>
        ) : (
            <HelpAlert
              title={"No hay Correos..."}
              text="¡Aquí se listarán todas las preguntas de los clientes!"
            />
        )}
        {getMailQuery?.data?.length > 6 && (
          <div className={style.container__list__pagination}>
            <Pagination
              count={max}
              color="primary"
              onChange={handleOnChangePage}
              page={page}
            />
          </div>
        )}
      </main>
      {menu?.modal && (
        <Modal setModal={setMenu} extent={{ width: "500px", height: "200px" }}>
          <p>{menu?.obj?.message}</p>
        </Modal>
      )}
    </div>
  );
}
