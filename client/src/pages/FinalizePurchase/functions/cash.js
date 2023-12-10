import { LOCAL_ADDRESS, SCHEDULE } from "../../../constants/const";
import getDate from "../../../functions/getDate";

export default function cash(data, buynow, user, setSuccess) {
  setSuccess((prev) => ({ ...prev, processing: true }));

  let cart = [];
  let customer = {};

  if (buynow) {
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
      text: "Esperando al cliente...",
      style: false,
    },
    total: data?.total,
    shipment: data?.shipment,
    // chat: [
    //   {
    //     usuario: "BOT",
    //     text: `Hola ${user.firstname}, ¿Cómo Estas?, ${
    //       data?.shipment === "Envio"
    //         ? "Queríamos informarte que te notificaremos cuando realicemos el envío"
    //         : "Te esperamos en " +
    //           LOCAL_ADDRESS +
    //           ". Nuestro horario de atención es de " +
    //           SCHEDULE
    //     }, Gracias por tu compra !`,
    //   },
    // ],
  };
}
