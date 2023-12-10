import openMenu from "../../../../../functions/openMenu";

export default function deleteCustomer(p, deleteCustomerMutation, deleteFile, setMenu){
    openMenu(setMenu,false, "", false, false);
    deleteFile("proof-of-payment", p?.proofOfPayment?.name);
    deleteCustomerMutation.mutate(p?._id);
  };