export default async function validate(
  params,
  setSuccess,
  addCustomerMutation
) {
  let mp = window.localStorage.getItem("mp");

  if (mp) {
    if (window.location.pathname.includes("success")) {
      setSuccess((prev) => ({ ...prev, purchase: true }));

      addCustomerMutation.mutate(
        JSON.parse(window.localStorage.getItem("customer"))
      );

      window.localStorage.removeItem("mp");
      window.localStorage.removeItem("customer");
      window.localStorage.removeItem("purchase");
    }
  }
}
