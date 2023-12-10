import React from "react";
import style from "./MobileProductCard.module.scss";

//------ components
import Menu from "../../../../../../components/Menu/Menu";
//------ functions

import hiddenProductClass from "../../functions/hiddenProductClass";
import hideProduct from "../../functions/hideProduct";
import deleteProduct from "../../functions/deleteProduct";

//------ hooks
import useFileUploader from "../../../../../../hooks/useFileUploader";
import useMutationProduct from "../../../../../../hooks/product/useMutationProduct";
import openMenu from "../../../../../../functions/openMenu";

export default function MobileProductCard({
  products,
  slicePrevious,
  sliceNext,
  menu,
  setMenu,
  stockProduct,
}) {
  const [viewProduct, setViewProduct] = React.useState("");

  const { deleteProductMutation } = useMutationProduct();
  const { deleteFile } = useFileUploader();

  return (
    <ul className={style.container}>
      {products?.slice(slicePrevious, sliceNext)?.map((p) => {
        return (
          <li key={p?._id} className={style.container__card}>
            <header className={style.container__card__header}>
              <img
                className={hiddenProductClass(p?.show, style)}
                src={p?.images?.length > 0 && p?.images[0]?.link}
                alt={p?.title}
              />
              <h2
                onClick={() =>
                  setViewProduct((prev) => (prev !== p?._id ? p?._id : ""))
                }
              >
                {" "}
                {p?.title?.slice(0, 10)} {p?.title?.length > 10 && "..."}
              </h2>
              <button
               className={`${
                viewProduct === p?._id && style.container__card__header_icon
              }`}
                onClick={() =>
                  setViewProduct((prev) => (prev !== p?._id ? p?._id : ""))
                }
              >
                <i
                  className={` bi bi-arrow-up-circle`}
                ></i>
              </button>
            </header>
            {viewProduct === p?._id && (
              <ul className={style.container__card__content}>
                <li>
                  Acción:
                  <button
                    className={style.container__card__content_btn}
                    id="menu"
                    onClick={() => openMenu(setMenu, !menu?.menu, "", p, false)}
                  >
                    <i id="menu" className="bi bi-three-dots-vertical"></i>
                  </button>
                </li>
                <li>
                  Estado:
                  <button onClick={() => hideProduct(p)}>
                    <i className={`bi bi-${p?.show ? "eye" : "eye-slash"}`}></i>
                  </button>
                </li>
                <li>Categoria: {p?.category}</li>
                <li>
                  Precio:{" "}
                  <p
                    style={{
                      textDecoration: `${
                        p?.discount > 0 ? "line-through" : "none"
                      }`,
                    }}
                  >
                    $ {Intl.NumberFormat("es-ES").format(p?.price)}
                  </p>
                  {p?.discount > 0 && (
                    <b>$ {Intl.NumberFormat("es-ES").format(p?.discount)}</b>
                  )}
                </li>
                <li>Stock: {stockProduct[p?._id]}</li>
                <li>Ventas: {p?.sold}</li>
                <li>Comentarios: {p?.comments?.length}</li>
              </ul>
            )}
            {menu?.obj?._id === p?._id && menu?.menu && (
              <Menu
                styleMenu={{ right: "0rem", top: "5.5rem", width: "180px" }}
                setMenu={setMenu}
              >
                <button
                  onClick={() => openMenu(setMenu, false, "edit", p, true)}
                >
                  <i className="bi bi-pencil-square"></i>
                  Editar
                </button>
                <button
                  onClick={() =>
                    openMenu(setMenu, false, "create-offer", p, true)
                  }
                >
                  <i className="bi bi-tag"></i>
                  {p?.discount > 0 ? "Editar Oferta" : "Crear Oferta"}
                </button>
                <button
                  onClick={() =>
                    deleteProduct(setMenu, p, deleteFile, deleteProductMutation)
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
