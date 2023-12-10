export default function addOrSubtract(
  action,
  configProduct,
  product,
  setConfigProduct
) {
  let max = product?.sizeAndStock
    ?.find((f) => f?.waist === configProduct?.waist)
    ?.list?.find((f) => f?.color === configProduct?.color)?.stock;

  if (action === "add") {
    if (configProduct.amount < max) {
      setConfigProduct((prev) => ({
        ...prev,
        amount: prev.amount + 1,
      }));
    }
  } else {
    if (configProduct.amount > 1) {
      setConfigProduct((prev) => ({
        ...prev,
        amount: prev.amount - 1,
      }));
    }
  }
}
