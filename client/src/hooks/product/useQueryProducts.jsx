import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { getProduct, getProducts } from "../../services/product";

export default function useQueryProducts() {
  let queryClient = useQueryClient();

  const [shouldLoadProducts, setShouldLoadProducts] = useState(false);

  const [shouldLoadProduct, setShouldLoadProduct] = useState({
    active: false,
    id: "",
  });

  const getProductsQuery = useQuery(["products"], getProducts,{
    refetchOnWindowFocus: false,
    enabled: shouldLoadProducts,
    refetchInterval: false,
  });


  const getProductQuery = useQuery(
    ["product"],
    async () => getProduct(shouldLoadProduct.id),
    {
      refetchOnWindowFocus: false,
      enabled: shouldLoadProduct.active,
    }
  );

  const reloadProducts = () => {
    if (!getProductsQuery?.data) {
      setShouldLoadProducts(true);
    }
  };

  const reloadProduct = (id) => {
    setShouldLoadProduct({ active: true, id: id });
  };

  return {
    getProductsQuery,
    getProductQuery,
    reloadProducts,
    reloadProduct,
    products: queryClient.getQueryData(["products"]),
  };
}
