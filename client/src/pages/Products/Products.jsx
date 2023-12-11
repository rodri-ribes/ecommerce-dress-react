import React, { useEffect, useState } from "react";
import style from "./Products.module.scss";

//------ Imports
import Pagination from "@mui/material/Pagination";
import { useSearchParams } from "react-router-dom";

//------ Components
import SidebarFilter from "./components/SideFIlter/SidebarFilter";
import Spinner from "../../components/Spinner/Spinner";
import HelpAlert from "../../components/HelpAlert/HelpAlert";
import BrandCarousel from "./components/BrandCarousel/BrandCarousel";
import CardProduct from "../../components/CardProduct/CardProduct";
import Modal from "../../components/Modal/Modal";
//------ Hooks
import usePagination from "../../hooks/usePagination";
import useFilterProducts from "../../hooks/product/useFilterProducts";
import filteredByQuery from "./functions/filteredByQuery";
import Warning from "../../components/Warning/Warning";
import useQueryProducts from "../../hooks/product/useQueryProducts";

export default function Products() {
  const { filterTerm, setFilterTerm, filteredProducts } =
    useFilterProducts();

  const { getProductsQuery } = useQueryProducts();

  const [modal, setModal] = useState({ modal: false });

  const { page, handleOnChangePage, max, sliceNext, slicePrevious } =
    usePagination({ count: 10, list: filteredProducts });

  const [params] = useSearchParams();

  useEffect(() => {
    window.scrollTo(0, 0);
    filteredByQuery(params, setFilterTerm);
  }, [params]);

  return getProductsQuery.isLoading ? (
    <Spinner />
  ) : getProductsQuery.isError ? (
    <Warning
      title={"Se ha producido un error"}
      text={
        "Los productos no se han podido cargar; por favor, inténtelo de nuevo más tarde."
      }
    />
  ) : (
    getProductsQuery.isSuccess && (
      <div className={style.container}>
        <div className={style.container__sidebar}>
          <SidebarFilter filter={filterTerm} setFilter={setFilterTerm} />
        </div>
        {modal.modal && (
          <Modal setModal={setModal}>
            <SidebarFilter filter={filterTerm} setFilter={setFilterTerm} />
          </Modal>
        )}
        <div className={style.container__main}>
          <BrandCarousel products={getProductsQuery.data} setFilter={setFilterTerm} />
          <button
            className={style.container__main_btnFilter}
            onClick={() => setModal({ modal: true })}
          >
            FILTROS <i className="bi bi-funnel"></i>
          </button>
          {filteredProducts?.length > 0 ? (
            <ul className={style.container__main__products}>
              {filteredProducts
                ?.filter((f) => f.show)
                ?.slice(slicePrevious, sliceNext)
                ?.map((p) => {
                  return (
                    <CardProduct
                      key={p?._id}
                      id={p?._id}
                      idConfig={p?.idConfig}
                      title={p?.title}
                      price={p?.price}
                      offer={p?.offer}
                      rating={p?.rating}
                      discount={p?.discount}
                      img={p?.images[0]?.link}
                    />
                  );
                })}
            </ul>
          ) : (
            <div className={style.container__main__alert}>
              <HelpAlert
                title={"No hay resultados..."}
                text={
                  "No se encontraron resultados coincidentes con los filtros seleccionados."
                }
              />
            </div>
          )}
          {filteredProducts?.length > 10 && (
            <div className={style.container__main__pagination}>
              <Pagination
                count={max}
                color="primary"
                onChange={handleOnChangePage}
                page={page}
              />
            </div>
          )}
        </div>
      </div>
    )
  );
}
