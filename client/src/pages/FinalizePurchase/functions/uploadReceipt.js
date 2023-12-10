import { v4 } from "uuid";

export default async function uploadReceipt(
  success,
  setSuccess,
  user,
  uploadFile,
  proofOfPayment,
  customer,
  updateCustomerMutation,
  navigate
) {
  setSuccess && setSuccess((prev) => ({ ...prev, pdfUploaded: true }));

  let nameFile = user.email.split("@")[0] + v4().split("-")[0];

  let pdfUploaded = await uploadFile(
    proofOfPayment,
    "proof-of-payment",
    nameFile
  );

  updateCustomerMutation.mutate({
    id: customer?._id,
    proofOfPayment: pdfUploaded,
  });

  if(navigate){
    setTimeout(() => {
      navigate("/");
    }, 3000);
  }
}
