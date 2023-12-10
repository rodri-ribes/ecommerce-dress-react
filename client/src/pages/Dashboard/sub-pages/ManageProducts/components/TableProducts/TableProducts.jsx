import React from "react";
import style from "./TableProducts.module.scss";

//------ components
import Menu from "../../../../../../components/Menu/Menu";


//------ functions
import deleteProduct from "../../functions/deleteProduct";
import hideProduct from "../../functions/hideProduct";
import hiddenProductClass from "../../functions/hiddenProductClass";

//------ hooks
import useFileUploader from "../../../../../../hooks/useFileUploader";
import useMutationProduct from "../../../../../../hooks/product/useMutationProduct";
import openMenu from "../../../../../../functions/openMenu";

export default function TableProducts({
  products,
  stockProduct,
  setMenu,
  menu,
  slicePrevious,
  sliceNext,
}) {
  const { deleteProductMutation, updateProductMutation } = useMutationProduct();
  const { deleteFile } = useFileUploader();


  return (
    <table cellSpacing="0">
      <thead>
        <tr>
          <th colSpan="2">Producto</th>
          <th>Estado</th>
          <th>Categoria</th>
          <th>Precio</th>
          <th>Stock</th>
          <th>Vendidos</th>
          <th>Comentarios</th>
          <th>Acción</th>
        </tr>
      </thead>
      <tbody>
        {products?.slice(slicePrevious, sliceNext)?.map((p) => {
          return (
            <tr key={p?._id}>
              <td className={style.product}>
                <img
                  className={hiddenProductClass(p?.show, style)}
                  src={p?.images?.length > 0 && p?.images[0]?.link}
                  alt={p?.title}
                />
              </td>
              <td
                style={{
                  textDecoration: `${p?.show ? "none" : "line-through"}`,
                }}
                className={hiddenProductClass(p?.show, style)}>
                {p?.title?.slice(0, 20)} {p?.title?.length > 20 && ". . ."}
              </td>
              <td className={hiddenProductClass(p?.show, style)}>
                <button onClick={() => hideProduct(p, updateProductMutation)}>
                  <i className={`bi bi-${p?.show ? "eye" : "eye-slash"}`}></i>
                </button>
              </td>
              <td className={hiddenProductClass(p?.show, style)}>{p?.category}</td>
              <td className={hiddenProductClass(p?.show, style)}>
                <p
                  style={{
                    textDecoration: `${
                      p?.discount > 0 ? "line-through" : "none"
                    }`,
                  }}>
                  $ {Intl.NumberFormat("es-ES").format(p?.price)}
                </p>
                {p?.discount > 0 && (
                  <b>$ {Intl.NumberFormat("es-ES").format(p?.discount)}</b>
                )}
              </td>
              <td className={hiddenProductClass(p?.show, style)}>
                {stockProduct[p?._id]}
              </td>
              <td className={hiddenProductClass(p?.show, style)}>{p?.sold}</td>
              <td className={hiddenProductClass(p?.show, style)}>
                {p?.comments?.length}
              </td>
              <td>
                <button
                  className={style.container_btn}
                  id="menu"
                  onClick={() => openMenu(setMenu,!menu?.menu, "", p, false)}>
                  <i id="menu" className="bi bi-three-dots-vertical"></i>
                </button>
                {menu?.obj?._id === p?._id && menu?.menu && (
                  <Menu
                    styleMenu={{ right: "5rem", top: "1.5rem", width: "180px" }}
                    setMenu={setMenu}>
                    <button onClick={() => openMenu(setMenu,false, "edit", p, true)}>
                      <i className="bi bi-pencil-square"></i>
                      Editar
                    </button>
                    <button
                      onClick={() => openMenu(setMenu,false, "create-offer", p, true)}>
                      <i className="bi bi-tag"></i>
                      {p?.discount > 0 ? "Editar Oferta" : "Crear Oferta"}
                    </button>
                    <button onClick={() => deleteProduct(p, deleteFile, deleteProductMutation)}>
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
