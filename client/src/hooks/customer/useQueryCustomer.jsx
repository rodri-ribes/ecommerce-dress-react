import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import useNotification from "../useNotification";
import { getCustomers } from "../../services/customer";

export default function useQueryCustomer() {
  const queryClient = useQueryClient();

  const [shouldLoadCustomer, setShouldLoadCustomer] = useState(false);

  const { handleNotification } = useNotification();

  const getCustomerQuery = useQuery(["customers"], getCustomers, {
    refetchOnWindowFocus: false,
    enabled: shouldLoadCustomer,
    retry: 2,
    onError: () => {
      handleNotification({
        status: false,
        title: "Error",
        text: "Se ha producto un error.",
      });
    },
  });



  const reloadCustomer = () => {
    if (!getCustomerQuery.data) {
      setShouldLoadCustomer(true);
    }
  };

  return {
    getCustomerQuery,
    reloadCustomer,
    customers: queryClient.getQueryData(["customers"]),
  };
}
