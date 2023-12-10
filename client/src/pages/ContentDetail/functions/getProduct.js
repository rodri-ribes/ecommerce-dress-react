export default function getProduct(
  products,
  product,
  id,
  setShowImage,
  reloadProduct,
  queryClient
) {
  if (products) {
    //si el producto no tiene comentarios o reviews para mostrar entrara en el else y solo filtrara entre los demas productos
    if (
      products?.find((e) => e?.idConfig === id)?.comments?.length > 0 ||
      products?.find((e) => e?.idConfig === id)?.reviews?.length > 0
    ) {
      if (product?.idConfig !== id) {
        reloadProduct(id);
        // dispatch(productsAction("get-product", id));
      }
    } else {
      //para ahorrar hacer un get al server, cuando el producto no cuenta con comentarios o reviews
      if (product?.idConfig !== id) {
        queryClient.setQueryData(
          ["product"],
          products.find((p) => p?.idConfig === id)
        );
        // dispatch(
        //   productsAction(
        //     "no-get-product",
        //     products.find((p) => p?.idConfig === id)
        //   )
        // );
      }
    }
  }
  if (product) {
    setShowImage(product?.images[0]?.link);
  }
}
