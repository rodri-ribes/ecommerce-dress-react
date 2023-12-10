import openMenu from "../../../../../functions/openMenu";

export default function updateStatus (
    customer,
    updateCustomerMutation,
    setMenu,
     
     ){
    openMenu(setMenu, false, "", false, false);
    let status = {
      text:
        customer?.shipment === "Envio"
          ? customer?.products?.length > 1
            ? "Productos Enviados."
            : "Producto Enviado."
          : customer?.products?.length > 1
          ? "Productos Entregados."
          : "Producto Entregado.",
      style: true,
    };

    updateCustomerMutation.mutate({
      id: customer._id,
      status,
    });
  };