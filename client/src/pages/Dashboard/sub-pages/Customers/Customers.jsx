import React, { useEffect, useState } from "react";
import style from "../ManageProducts/ManageProducts.module.scss";

//------ imports
import Pagination from "@mui/material/Pagination";

//------ components
import TableCustomers from "./components/TableCustomers/TableCustomers";
import Modal from "../../../../components/Modal/Modal";
import ExtendedInformation from "../../../../components/Dashboard/ExtendedInformation/ExtendedInformation";
import Snipper from "../../../../components//Spinner/Spinner";
import ErrorAlert from "../../../../components//ErrorAlert/ErrorAlert";
import HelpAlert from "../../../../components/HelpAlert/HelpAlert";
import FilterCustomers from "./components/FilterCustomers/FilterCustomers";

//------ functions
import filterCustomer from "./functions/filterCustomer";

//------ hooks
import usePagination from "../../../../hooks/usePagination";
import MobileCustomerCard from "./components/MobileCustomerCard/MobileCustomerCard";
import useNotification from "../../../../hooks/useNotification";
import { useQuery } from "@tanstack/react-query";
import { getCustomers } from "../../../../services/customer";

export default function Customers() {
  const {handleNotification } = useNotification()

  const [viewFilter, setViewFilter] = useState({
    view: false,
    count: 7
  })


  const getCustomerQuery = useQuery(["customers"], getCustomers, {
    refetchOnWindowFocus: true,
    enabled: true,
    retry: 2,
    refetchInterval: 300000,
    onError: () => {
      handleNotification({
        status: false,
        title: "Error",
        text: "Se ha producto un error.",
      });
    },
  });

  const [filterTerm, setFilterTerm] = useState({
    search: "",
    montMin: 0,
    montMax: 0,
    status: "",
    date: "",
    arrStatus: ["Completados", "No completados"],
    arrDate: [],
  });

  const { max, page, handleOnChangePage, sliceNext, slicePrevious } =
    usePagination({
      count: viewFilter.count,
      list: getCustomerQuery.data?.filter(filterCustomer(filterTerm)),
    });

  const [menu, setMenu] = useState({
    menu: false,
    action: "",
    obj: false,
    modal: false,
  });

  useEffect(() => {
    if(getCustomerQuery.isSuccess) {
      getCustomerQuery.data?.forEach((c) => {
        setFilterTerm((prev) => ({
          ...prev,
          arrDate: [...prev.arrDate, c?.date?.split(" - ")[1]],
        }));
      });
    }
  }, [getCustomerQuery.isSuccess]);

  //copiar lo de managerproduct, y el filtro
  return (
    <div className={style.container}>
      {getCustomerQuery.data?.length > 0 && (
        <header className={`${style.container__panel} ${viewFilter.view ? style.container__panel_viewFilter : style.container__panel_hideFilter}`}>
          <FilterCustomers filter={filterTerm} setFilter={setFilterTerm} />
        </header>
      )}
        <button
      onClick={() => {
        setViewFilter(prev => ({
          view: !prev.view,
          count: !prev.view ? 6 : 7
        }))
      }}
      className={style.container_btnFiler}>
        {
          viewFilter.view ? "Ocultar Filtro " : "Mostrar Filtro " 
        }
        <i className="bi bi-funnel"></i>
      </button>
      <div className={`${style.container__list} ${!viewFilter.view && style.container__list_withoutFilter }`}>
        {getCustomerQuery.isLoading || getCustomerQuery.isFetching ? (
          <Snipper />
        ) : getCustomerQuery.isError ? (
          <ErrorAlert typeError={"admin"} />
        ) : getCustomerQuery?.data?.length > 0 ? (
          <div className={style.container__list__content}>
                <MobileCustomerCard
                  customers={[
                    ...getCustomerQuery.data?.filter(filterCustomer(filterTerm)),
                  ].reverse()}
                  menu={menu}
                  setMenu={setMenu}
                  slicePrevious={slicePrevious}
                  sliceNext={sliceNext}
                />
            <div className={style.container__list__content__table}>
              <TableCustomers
                customers={[
                  ...getCustomerQuery.data?.filter(filterCustomer(filterTerm)),
                ].reverse()}
                menu={menu}
                setMenu={setMenu}
                slicePrevious={slicePrevious}
                sliceNext={sliceNext}
              />
              {getCustomerQuery.data?.filter(filterCustomer(filterTerm))?.length === 0 && (
                <h3 className={style.container__list__table_error}>
                  No hay clientes que coincidan con el filtro...
                </h3>
              )}
            </div>
          </div>
        ) : (
            <HelpAlert
              title={"No hay clientes..."}
              text="¡Potencia tu negocio con ofertas irresistibles y multiplica tus oportunidades de crecimiento!"
            />
        )}
        {getCustomerQuery.data?.filter(filterCustomer(filterTerm))?.length > viewFilter.count && (
          <div className={style.container__list__pagination}>
            <Pagination
              count={max}
              color="primary"
              onChange={handleOnChangePage}
              page={page}
            />
          </div>
        )}
      </div>
      {menu?.modal && (
        <Modal setModal={setMenu}>
          {menu?.action === "ExtendedInformation" && (
            <ExtendedInformation customer={menu.obj} setMenu={setMenu} />
          )}
        </Modal>
      )}
    </div>
  );
}
