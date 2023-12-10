// import { buynowAction } from "../../../redux/features/data/data";

export default function buynow(
  navigate,
  product,
  productFeatures,
  setModal,
  queryClient,
  user
) {

  if(user){
    if (productFeatures.waist && productFeatures.color) {
      queryClient.setQueryData(["buynow"], product);
      navigate("/process-purchase");
    } else {
      let text =
        !productFeatures.waist && !productFeatures.color
          ? "talle y color"
          : !productFeatures.waist
          ? "talle"
          : "color";
  
      setModal({
        view: true,
        text: `Falta seleccionar ${text} del producto`,
      });
    }
  }else{
    setModal({
      view: true,
      text: `Para realizar una compra, por favor, inicia sesión o regístrate.`,
    });
  }
}
