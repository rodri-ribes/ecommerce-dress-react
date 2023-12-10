export function initialvalues(setting) {
  return {
    name_of_the_page: setting?.name_of_the_page
      ? setting?.name_of_the_page
      : "",
    email: setting?.email ? setting?.email : "",
    whatsapp: setting?.whatsapp ? setting?.whatsapp : "",
    local_active: setting?.local_active ? setting?.local_active : "true",
    schedule: setting?.schedule ? setting?.schedule : "",
    alias_mp: setting?.alias_mp ? setting?.alias_mp : "",
    card_payment: setting?.card_payment ? setting?.card_payment : "",
    address: setting?.store_address?.address
      ? setting?.store_address?.address
      : "",
    location: setting?.store_address?.location
      ? setting?.store_address?.location
      : "",
    province: setting?.store_address?.province
      ? setting?.store_address?.province
      : "",
    free_min_amount: setting?.free_min_amount ? setting?.free_min_amount : 0,
    shipping_price: setting?.shipping_price ? setting?.shipping_price : 0,
  };
}

export function validateInputs(valores) {
  let errores = {};

  if (!valores.name_of_the_page) {
    errores.name_of_the_page = "El nombre es requerido";
  }

  if (!valores.email) {
    errores.email = "El email es requerido";
  } else if (
    !/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(valores.email)
  ) {
    errores.email = "El email es invalido";
  }

  if (!valores.whatsapp) {
    errores.whatsapp = "El WhatsApp es requerido";
  }

  if (!valores.schedule && valores.local_active !== "false") {
    errores.schedule = "El horario de atención es requerido";
  }

  if (!valores.address && valores.local_active !== "false") {
    errores.local_address = "La dirección es requerida";
  }

  if (!valores.location && valores.local_active !== "false") {
    errores.location = "La localidad es requerida";
  }

  if (!valores.province && valores.local_active !== "false") {
    errores.province = "La provincia es requerida";
  }

  return errores;
}
