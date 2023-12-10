export default function totalCart(user, buynow, productFeatures) {
  let total = 0;
  if (buynow) {
    total +=
      buynow?.discount > 0
        ? buynow?.discount * buynow.amount
        : buynow?.price * buynow.amount;
  } else {
    // e?.sizeAndStock.forEach((s) => {
    //   s?.list.forEach((l) => {
    //     sum += l?.amount;
    //   });
    // });
    // if (sum > 0) {
    //   let cantidad = productFeatures ? productFeatures[e?._id]?.amount : 1;
    //   total += e?.discount > 0 ? e?.discount * cantidad : e?.price * cantidad;
    // }
    user?.cart?.forEach((e) => {
      let cantidad = productFeatures ? productFeatures[e?._id]?.amount : 1;
      total += e?.discount > 0 ? e?.discount * cantidad : e?.price * cantidad;
    });
  }
  return total;
}
