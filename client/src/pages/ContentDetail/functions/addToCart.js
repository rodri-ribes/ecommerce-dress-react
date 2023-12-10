// import { buynowAction, userAction } from "../../../redux/features/data/data";
export default function addToCart(
  user,
  id,
  setModal,
  navigate,
  loadedProduct,
  setOptions,
  updateUserMutation,
  queryClient
) {
  if (user) {
    // dispatch(userAction("update-cart", { product: id }));
    updateUserMutation.mutate({ product: id });
    if (loadedProduct) {
      //si el producto ya estaba cargado, se actualiza la UI del btn
      setOptions((prev) => ({ ...prev, loadedProduct: false }));
    } else {
      //si el producto no estaba cargado entra en el else
      //se elimina el state de buynow si es que hay

      queryClient.setQueryData(["buynow"], false);
      setTimeout(() => {
        navigate("/added-to-cart");
      
      }, 1500);
    }
  } else {
    setModal((prev) => ({
      ...prev,
      view: true,
      text: "Inicia sesión o regístrate para agregar productos al carrito.",
    }));
  }
}
