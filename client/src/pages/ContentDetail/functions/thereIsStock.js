export function thereIsStock(product, setOptions) {
  //stock
  let sum = 0;
  product?.sizeAndStock.forEach((s) => {
    s?.list.forEach((l) => {
      sum += l?.stock;
    });
  });
  if (sum === 0) {
    setOptions((prev) => ({ ...prev, thereIsStock: true }));
  }
}
