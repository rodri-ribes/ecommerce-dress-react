import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  addProduct,
  deleteProduct,
  updateProduct,
} from "../../services/product";
import useNotification from "../useNotification";

export default function useMutationProduct() {
  const { handleNotification } = useNotification();

  const queryClient = useQueryClient();

  const addProductMutation = useMutation(addProduct, {
    onSuccess: (resp) => {
      queryClient.setQueryData(["products"], (prev) => [...prev, resp.product]);
    },
    onError: (error) => {
      handleNotification({
        status: false,
        title: "Error",
        text: error.response.data,
      });
    },
  });

  const deleteProductMutation = useMutation(deleteProduct, {
    onSuccess: (resp) => {
      queryClient.setQueryData(["products"], (prev) => [
        ...prev.filter((p) => p.idConfig !== resp.product),
      ]);
    },
    onError: (error) => {
      handleNotification({
        status: false,
        title: "Error",
        text: error.response.data,
      });
    },
  });

  const updateProductMutation = useMutation(updateProduct, {
    onSuccess: (resp, obj) => {
      let products = queryClient
        .getQueryData(["products"])
        .filter((p) => p?.idConfig !== obj?.idConfig);
      products.push(resp.product);
      queryClient.setQueryData(["products"], products);
    },
    onError: (error) => {
      handleNotification({
        status: false,
        title: "Error",
        text: error.response.data,
      });
    },
  });

  return {
    products: queryClient.getQueryData(["products"]),
    addProductMutation,
    deleteProductMutation,
    updateProductMutation,
  };
}
