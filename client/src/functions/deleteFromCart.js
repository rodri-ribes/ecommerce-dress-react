// import { userAction } from "../redux/features/data/data";

export default function deleteFromCart(
  user,
  location,
  navigate,
  id,
  updateUserMutation,
  productFeatures
) {
  /**
   * este codigo seria para cuando se usa en ProcessPurchase, para quitar el objeto cargado con las caracteristicas
   * y el else seria para cuando se borra desde el modal del carrito, guardamos el id para tener referencia de cual es el elemento
   */
  if (productFeatures) {
    delete productFeatures[id];
  } else {
    window.localStorage.setItem("drop-product", id);
  }

  //si es el ultimo producto a borrar y se encuentra en una de esas dos rutas, lo hacemso navegar al inicio.
  if (
    user?.cart?.length === 1 &&
    (location.pathname.includes("/added-to-cart") ||
      location.pathname.includes("/process-purchase"))
  ) {
    navigate("/");
  }
  //agregamos o quitamos del carrito el producto
  updateUserMutation.mutate({ product: id });
}
