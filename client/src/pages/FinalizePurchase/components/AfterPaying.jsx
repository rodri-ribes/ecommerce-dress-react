import React, { useEffect, useState } from "react";

//------ Components
import Button from "../../../components/Inputs/Button/Button";
import InputFile from '../../../components/Inputs/InputFile/InputFile'
//------ Functions
import uploadReceipt from "../functions/uploadReceipt";

//------ Hooks
import useFileUploader from "../../../hooks/useFileUploader";
import useSetting from "../../../hooks/useSetting";
import useMutationCustomer from "../../../hooks/customer/useMutationCustomer";
import ErrorAlert from "../../../components/ErrorAlert/ErrorAlert";
import { Link } from "react-router-dom";
//------ Contants
// import { LOCAL_ADDRESS } from "../../../constants/const";

export default function AfterPaying({
  style,
  success,
  setSuccess,
  user,
  navigate,
}) {
  const [proofOfPayment, setProofOfPayment] = useState(false);

  const { updateCustomerMutation, customer } = useMutationCustomer();

  const { uploadFile } = useFileUploader();

  const { setting } = useSetting();

  useEffect(() => {
    if(customer?.shipment !== "Envio"){
      setTimeout(() => {
        navigate("/")
      }, 2000);
    }
  }, [])
  

  return (
    <div className={style.container__after}>
      <h3>Gracias por su Compra</h3>
      <hr />
      {updateCustomerMutation.isError ? (
        <ErrorAlert
          typeError={"user"}
          text={`Por favor, envía el comprobante por correo electrónico a ${setting.email} o a través de WhatsApp al número ${setting.whatsapp}."`}
        />
      ) : (
        customer?.shipment === "Envio" &&
        <>
          {!updateCustomerMutation.isSuccess && (
            <p>
              Por favor, adjunta el comprobante de pago. Si lo prefieres,
              también puedes enviarlo por WhatsApp al número {setting.whatsapp}.
              Puedes seguir el estado de tu compra en tu{" "}
              <Link to={"/profile/shopping"}>Perfil</Link>
            </p>
          )}
          <div className={style.container__after__payment}>
            {updateCustomerMutation.isSuccess ? (
              <p>Comprobante Cargado.</p>
            ) : (
              <InputFile
                proofOfPayment={proofOfPayment}
                setProofOfPayment={setProofOfPayment}
                user={user}
                customer={customer}
                success={success}
                setSuccess={setSuccess}
                navigate={navigate}
              />
                
            )}
          </div>
        </>
      )}
      {!updateCustomerMutation.isError &&
        success?.customer?.shipment === "Envio" && (
          <p>
            Te notificaremos a través de WhatsApp tan pronto como tu pedido sea
            despachado.
          </p>
        )}
    </div>
  );
}
