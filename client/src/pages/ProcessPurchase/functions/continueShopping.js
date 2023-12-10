import verifyPurchases from "./verifyPurchases";

export const continueShopping = (
  totalCart,
  user,
  buynow,
  productFeatures,
  options,
  navigate,
  setModal,
  setting,
  userPurchasesQuery
) => {
  let errors = [];
  let purchase = {};

  let total =
    totalCart(user, buynow, productFeatures) < setting?.free_min_amount &&
    options.shipment.includes("Envio")
      ? totalCart(user, buynow, productFeatures) + setting?.shipping_price
      : totalCart(user, buynow, productFeatures);

  if (buynow) {
    purchase = {
      paymentMethod: options.paymentMethod,
      shipment: options.shipment,
      total,
    };

    window.localStorage.setItem("purchase", JSON.stringify(purchase));
    navigate("/finalize-purchase");
  } else {
    //para saber si el usuario cargo los datos
    user?.cart?.forEach((e) => {
      if (!productFeatures[e?._id]?.waist || !productFeatures[e?._id]?.color) {
        errors.push(e?.title);
      }
    });

    if(!verifyPurchases(userPurchasesQuery.data, setModal)){
      if (errors?.length === 0) {
        purchase = {
          paymentMethod: options.paymentMethod,
          shipment: options.shipment,
          total,
          productFeatures,
        };
        window.localStorage.setItem("purchase", JSON.stringify(purchase));
        navigate("/finalize-purchase");
      } else {
        verifyPurchases(userPurchasesQuery.data, setModal)
        //alerta
        setModal({
          view: true,
          text: `Falta seleccionar caraterísticas de los siguientes productos ${errors
            .toString()
            .replace(",", ", ")}`,
        });
      }
    }
  }
};
