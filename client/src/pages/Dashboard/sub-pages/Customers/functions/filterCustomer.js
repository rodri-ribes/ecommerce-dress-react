export default function filterCustomer(filterTerm) {
  let { status, date, search, montMin, montMax } = filterTerm;

  return function (x) {
    let name = x?.user?.firstname + " " + x?.user?.lastname;

    return (
      (x?.date?.includes(date) || date === "") &&
      ((x?.status?.style && status === "Completados") ||
        (!x?.status?.style && status === "No completados") ||
        status === "") &&
      (name?.toLowerCase().includes(search.toLowerCase()) || search === "") &&
      ((x?.total >= parseInt(montMin) && x?.total <= parseInt(montMax)) ||
        parseInt(montMin) === 0 ||
        parseInt(montMax) === 0 ||
        montMin === "" ||
        montMax === "") &&
      (x?.total >= parseInt(montMin) ||
        parseInt(montMin) === 0 ||
        montMin === "") &&
      (x?.total <= parseInt(montMax) ||
        parseInt(montMax) === 0 ||
        montMax === "")
    );
  };
}
