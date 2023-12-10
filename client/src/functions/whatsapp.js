export const whatsapp = (user, message) => {
  let url = `https://wa.me/+549${user.whatsapp}/?text=${encodeURI(
    `Hola ${user.firstname ? user.firstname : ""} cómo estás ?, ${
      message ? message : ""
    }`
  )}`;
  window.open(url, "_blank");
};
