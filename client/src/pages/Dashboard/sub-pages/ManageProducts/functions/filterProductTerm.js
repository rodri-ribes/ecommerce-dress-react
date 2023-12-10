export const filterProductTerm = (stateFilters) => {
  let { category, brand, search, minPrice, maxPrice } = stateFilters;

  return function (x) {
    return (
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
