import { useState } from "react";

/**
 * se espera {count: cant de post, list: data a mostrar}
 * @param {object} data
 * @returns
 */
export default function usePagination(data) {
  const [page, setPage] = useState(1);

  const handleOnChangePage = (e, p) => {
    setPage(p);
  };

  const countPage = data?.count;

  const ceil = data?.list?.length / countPage;

  const max = parseInt(Math.ceil(ceil));

  let slicePrevious = (page - 1) * countPage;
  let sliceNext = (page - 1) * countPage + countPage;

  return {
    page,
    handleOnChangePage,
    max: data?.list ? max : 1,
    slicePrevious,
    sliceNext,
  };
}
