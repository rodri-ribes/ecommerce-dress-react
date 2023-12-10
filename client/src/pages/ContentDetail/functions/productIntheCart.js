export function productInTheCart(setOptions, user, product) {
  setOptions((prev) => ({ ...prev, loadedProduct: false }));

  user?.cart?.forEach((e) => {
    if (e?._id === product?._id) {
      return setOptions((prev) => ({ ...prev, loadedProduct: true }));
    }
  });
}
