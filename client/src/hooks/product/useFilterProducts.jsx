import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export default function useFilterProducts() {
  const queryClient = useQueryClient();

  const products = queryClient.getQueryData(["products"]);

  const [filteredProducts, setFilteredProducts] = useState(
    products ? products : []
  );

  const [filterTerm, setFilterTerm] = useState({
    category: "",
    minPrice: 0,
    maxPrice: 0,
    search: "",
    brand: "",
    offer: "",
    gender: "",
    isActive: false,
  });

  const filterProduct = () => {
    let { category, brand, search, minPrice, maxPrice, offer, gender } =
      filterTerm;

    if (
      category ||
      brand ||
      search ||
      minPrice ||
      maxPrice ||
      offer ||
      gender
    ) {
      setFilterTerm((prev) => ({ ...prev, isActive: true }));
    } else {
      setFilterTerm((prev) => ({ ...prev, isActive: false }));
    }

    return function (x) {
      return (
        ((x?.offer > 0 && offer === "Con Descuento") ||
          (x?.offer === 0 && offer === "Sin Descuento") ||
          offer === "") &&
        (x?.gender?.includes(gender) || gender === "") &&
        (x?.category?.includes(category) || category === "") &&
        (x?.brand?.includes(brand) || brand === "") &&
        (x?.title?.toLowerCase().includes(search.toLowerCase()) ||
          search === "") &&
        ((x?.price >= parseInt(minPrice) && x?.price <= parseInt(maxPrice)) ||
          parseInt(minPrice) === 0 ||
          parseInt(maxPrice) === 0 ||
          minPrice === "" ||
          maxPrice === "") &&
        (x?.price >= parseInt(minPrice) ||
          parseInt(minPrice) === 0 ||
          minPrice === "") &&
        (x?.price <= parseInt(maxPrice) ||
          parseInt(maxPrice) === 0 ||
          maxPrice === "")
      );
    };
  };

  useEffect(() => {
    if (products) {
      setFilteredProducts([...products?.filter(filterProduct())]?.reverse());
    }
  }, [products, filterTerm]);

  return {
    filteredProducts,
    filterTerm,
    setFilterTerm,
    products,
  };
}
