import React, { useEffect, useState } from "react";
import style from "./ManageProducts.module.scss";

//------ Imports

import Pagination from "@mui/material/Pagination";

//------ Components
import TableProducts from "./components/TableProducts/TableProducts";
import FilterPanel from "./components/FilterPanel/FilterPanel";
import CreateOffer from "../../../../components/Dashboard/CreateOffer/CreateOffer";
import EditProduct from "../../../../components/Dashboard/EditProduct/EditProduct";
import Modal from "../../../../components/Modal/Modal";
import Spinner from "../../../../components/Spinner/Spinner";
import ErrorAlert from "../../../../components/ErrorAlert/ErrorAlert";
import HelpAlert from "../../../../components/HelpAlert/HelpAlert";

//------ Functions
import stockCounter from "./functions/stockCounter";

//------ hooks
import usePagination from "../../../../hooks/usePagination";
import useFilterProducts from "../../../../hooks/product/useFilterProducts";
import useQueryProducts from "../../../../hooks/product/useQueryProducts";
import MobileProductCard from "./components/MobileProductCard/MobileProductCard";

export default function ManageProducts() {
  const { getProductsQuery, products } = useQueryProducts();
  const { filteredProducts, filterTerm, setFilterTerm } = useFilterProducts();

  const [viewFilter, setViewFilter] = useState({
    view: false,
    count: 7
  })

  const { page, handleOnChangePage, max, slicePrevious, sliceNext } =
    usePagination({ count: viewFilter.count, list: filteredProducts });


  const [menu, setMenu] = useState({
    menu: false,
    action: "",
    obj: false,
    modal: false,
  });

  const [stockProduct, setStockProduct] = useState(false);

  useEffect(() => {
    stockCounter(products, setStockProduct);
  }, [products]);

  return (
    <div className={style.container}>
      { products?.length > 0 && (
        <header className={`${style.container__panel} ${viewFilter.view ? style.container__panel_viewFilter : style.container__panel_hideFilter}`}>
          <FilterPanel filter={filterTerm} setFilter={setFilterTerm} />
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
          viewFilter?.view ? "Ocultar Filtro " : "Mostrar Filtro " 
        }
        <i className="bi bi-funnel"></i>
      </button>
      <div className={`${style.container__list} ${!viewFilter.view && style.container__list_withoutFilter }`}>
        {getProductsQuery.isLoading || getProductsQuery.isFetching ? (
          <Spinner />
        ) : getProductsQuery.isError ? (
          <ErrorAlert typeError={"admin"} />
        ) : products?.length > 0 && getProductsQuery?.isSuccess ? (
          <div className={style.container__list__content}>
            <MobileProductCard 
              products={filteredProducts} 
              sliceNext={sliceNext} 
              slicePrevious={slicePrevious}
              menu={menu}
              setMenu={setMenu}
              stockProduct={stockProduct}
            />
            <div className={style.container__list__content__table}>
              <TableProducts
                products={filteredProducts}
                stockProduct={stockProduct}
                menu={menu}
                setMenu={setMenu}
                slicePrevious={slicePrevious}
                sliceNext={sliceNext}
              />
              {filteredProducts?.length === 0 && (
                <h3 className={style.container__list__table_error}>
                  No hay productos que coincidan con el filtro...
                </h3>
              )}
            </div>
          </div>
        ) : (
          <HelpAlert
            title={"No se encontraron productos"}
            text="¡Explora la sección 'Agregar Producto' y comienza a impulsar tus ventas! ¡Haz que tu catálogo brille y atraiga a más clientes!"
          />
        )}
        {(filteredProducts?.length > viewFilter.count) && getProductsQuery?.isSuccess && (
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
          {menu?.action === "edit" ? (
            <EditProduct product={menu?.obj} setMenu={setMenu} />
          ) : (
            <CreateOffer product={menu?.obj} setMenu={setMenu} />
          )}
        </Modal>
      )}
    </div>
  );
}
