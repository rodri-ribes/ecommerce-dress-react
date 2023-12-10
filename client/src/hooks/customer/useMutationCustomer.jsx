import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  addCustomer,
  deleteCustomer,
  updateCustomer,
} from "../../services/customer";
import useNotification from "../useNotification";

export default function useMutationCustomer() {
  const queryClient = useQueryClient();

  const { handleNotification } = useNotification();

  const addCustomerMutation = useMutation(addCustomer, {
    onSuccess: (resp) => {
      queryClient.setQueryData(["customer"], resp.customer);
      queryClient.setQueryData(["user"], (prev) => ({ ...prev, cart: [] }));

      if(resp?.customer?.user === queryClient.getQueryData(["user"])?._id){
        queryClient.setQueryData(["userPurchases"], prev => ([...prev, resp.customer]));
      }
    },
    onError: () => {
      handleNotification({
        status: false,
        title: "Error",
        text: "Se ha producto un error.",
      });
    },
  });

  const updateCustomerMutation = useMutation(updateCustomer, {
    onSuccess: (resp, obj) => {
      console.log(queryClient.getQueryData(["customers"]))
      if (queryClient.getQueryData(["customers"])) {
        let customers = queryClient.getQueryData(["customers"]);
        let filtered = customers.filter((p) => p._id !== obj.id);
        filtered.push(resp.customer);
        queryClient.setQueryData(["customers"], filtered);
        if (!obj.proofOfPayment) {
          handleNotification({
            status: true,
            title: "Éxito",
            text: "Actualizado.",
          });
        }
      }else if (queryClient.getQueryData(["userPurchases"])){
        let purchases = queryClient.getQueryData(["userPurchases"]);
        let filtered = purchases.filter((p) => p._id !== obj.id);
        filtered.push(resp.customer);
        queryClient.setQueryData(["userPurchases"], filtered);
      } else {
        //cuando le user cargue el comprobante.
        queryClient.setQueryData(["customer"], resp.customer);
      }
    },
    onError: () => {
      handleNotification({
        status: false,
        title: "Error",
        text: "Se ha producto un error.",
      });
    },
  });

  const deleteCustomerMutation = useMutation(deleteCustomer, {
    onSuccess: (resp, id) => {
      let customers = queryClient.getQueryData(["customers"]);
      let filtered = customers.filter((p) => p._id !== id);
      queryClient.setQueryData(["customers"], filtered);
      handleNotification({
        status: true,
        title: "Éxito",
        text: "Cliente eliminado.",
      });
    },
    onError: () => {
      handleNotification({
        status: false,
        title: "Error",
        text: "Se ha producto un error.",
      });
    },
  });

  return {
    addCustomerMutation,
    updateCustomerMutation,
    deleteCustomerMutation,
    customer: queryClient.getQueryData(["customer"]),
  };
}
