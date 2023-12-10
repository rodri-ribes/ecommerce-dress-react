import getDate from "../../../functions/getDate";

export default async function confirmPurchase(
  data,
  buynow,
  user,
  setSuccess,
  addCustomerMutation
) {
  //carrito user
  let cart = [];
  //carrito customer
  let customer = {};

  if (buynow) {
    //compra ahora
    cart.push({
      title: buynow.title,
      content: buynow.content,
      image: buynow.images[0]?.link,
      idConfig: buynow.idConfig,
      id: buynow._id,
      price: buynow.price,
      discount: buynow.discount,
      offer: buynow.offer,
      category: buynow.category,
      amount: buynow?.amount,
      color: buynow?.color,
      waist: buynow?.waist,
    });
  } else {
    //carrito del user
    user?.cart?.forEach((p) => {
      cart.push({
        title: p.title,
        content: p.content,
        image: p.images[0]?.link,
        idConfig: p.idConfig,
        id: p._id,
        price: p.price,
        discount: p.discount,
        offer: p.offer,
        category: p.category,
        amount: data.productFeatures[p._id]?.amount,
        color: data.productFeatures[p._id]?.color,
        waist: data.productFeatures[p._id]?.waist,
      });
    });
  }

  customer = {
    user: user._id,
    products: cart,
    paymentMethod: data?.paymentMethod,
    date: getDate("full"),
    status: {
      text:
        data.paymentMethod === "Mercado Pago" ||
        data.paymentMethod === "Tarjeta"
          ? "Verificando comprobante..."
          : "Esperando al cliente...",
      style: false,
    },
    total: data?.total,
    shipment: data?.shipment,
  };

  setSuccess((prev) => ({
    ...prev,
    processing: true,
  }));

  addCustomerMutation.mutate(customer);

  setTimeout(() => {
    setSuccess((prev) => ({
      ...prev,
      purchase: true,
    }));
  }, 2000);
}
