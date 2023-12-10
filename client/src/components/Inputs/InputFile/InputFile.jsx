import React from "react";
import style from "./InputFile.module.scss";
import Button from "../Button/Button";
import useMutationCustomer from "../../../hooks/customer/useMutationCustomer";
import uploadReceipt from "../../../pages/FinalizePurchase/functions/uploadReceipt";
import useFileUploader from "../../../hooks/useFileUploader";

export default function InputFile({proofOfPayment, setProofOfPayment, user, customer, success, setSuccess, navigate}) {

    const {updateCustomerMutation} = useMutationCustomer()
    const {uploadFile} = useFileUploader()

  return (
    <div className={style.container}>
      <div
        className={
          style.container__input
        }
      >
        <p>{proofOfPayment.name}</p>
        <i className={proofOfPayment ? "bi bi-check-lg" : "bi bi-upload"}></i>
        <input
          type="file"
          accept=".pdf"
          title=""
          onChange={(e) => setProofOfPayment(e.target.files[0])}
        />
      </div>
      {proofOfPayment && (
        <Button
          type={"button"}
          title={
            updateCustomerMutation.isSuccess
              ? "CARGADO CON ÉXTIO"
              : "CARGAR COMPROBANTE"
          }
          disabled={
            updateCustomerMutation.isLoading || updateCustomerMutation.isSuccess
          }
          isLoading={updateCustomerMutation.isLoading}
          action={() =>
            uploadReceipt(
              success,
              setSuccess,
              user,
              uploadFile,
              proofOfPayment,
              customer,
              updateCustomerMutation,
              navigate
            )
          }
        />
      )}
    </div>
  );
}
