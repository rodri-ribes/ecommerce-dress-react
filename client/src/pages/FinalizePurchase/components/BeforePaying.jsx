import React from "react";

//------ Functions
import confirmPurchase from "../functions/confirmPurchase";
import cash from "../functions/cash";

//------ Contants
import Button from "../../../components/Inputs/Button/Button";
import useSetting from "../../../hooks/useSetting";

export default function BeforePaying({
  style,
  data,
  success,
  buynow,
  user,
  setSuccess,
  addCustomerMutation,
}) {
  const { setting } = useSetting();
  const [copy, setCopy] = React.useState(false);

  const { address, location, province } = setting?.store_address;

  const copyText = async (text) =>{
    setCopy(true)
    await navigator.clipboard.writeText(text)
    setTimeout(() => {
      setCopy(false)
    }, 2000);
  }

  return (
    <div className={style.container__before}>
      <h3>Finalizar Compra</h3>
      <hr />
      {data?.paymentMethod === "Mercado Pago" ? (
        <p>
          Utiliza el alias <b>{setting.alias_mp} <i className={`bi bi-${copy ? "clipboard-check" : "clipboard"}`} 
          title="Copiar" 
          onClick={() => copyText(setting.alias_mp)}></i></b> para efectuar el pago con
          Mercado Pago. Después de completar la transacción, haz clic en el
          botón 'Continuar' para cargar el comprobante.           
        </p>
      ) : data?.paymentMethod === "Efectivo" ? (
        <p>
          Una vez que hayas completado tu compra, estaremos esperándote en
          nuestro local ubicado en {address + ", " + location + ", " + province}{" "}
          durante el horario de {setting?.schedule} A partir de hoy, dispones de
          un plazo de 5 días hábiles para retirar tu compra.
        </p>
      ) : (
        <p>
          Utiliza el CBU/CVU <b>{setting.card_payment} 
          <i className={`bi bi-${copy ? "clipboard-check" : "clipboard"}`} 
          title="Copiar" 
          onClick={() => copyText(setting.card_payment)}></i></b> para efectuar el
          pago. Después de completar la transacción, haz clic en el botón
          'Continuar' para cargar el comprobante.
        </p>
      )}
      {data ? (
        <>
          <div className={style.container__before__group}>
            <p>TOTAL:</p>
            <p>$ {Intl.NumberFormat("us-US").format(data?.total)}</p>
          </div>
      
            <Button
              extent={{ width: "50%", height: "45px" }}
              type={"button"}
              title={"Continuar"}
              disabled={success.processing}
              isLoading={success.processing}
              action={() => {
                confirmPurchase(
                  data,
                  buynow,
                  user,
                  setSuccess,
                  addCustomerMutation
                );
              }}
            />
          
        </>
      ) : (
        <p>
          Se ha producido un error, por favor, proceda a realizar la compra
          nuevamente.
        </p>
      )}
    </div>
  );
}
