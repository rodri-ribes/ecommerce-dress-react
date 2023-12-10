export default function stockCounter(products, setStockProduct) {
  //codigo para contar todo el stock de los productos
  products?.forEach((e) => {
    let sum = 0;
    e?.sizeAndStock?.forEach((s) => {
      s?.list?.forEach((l) => {
        sum += l?.stock;
        setStockProduct((prev) => ({
          ...prev,
          [e?._id]: sum,
        }));
      });
    });
  });
}
