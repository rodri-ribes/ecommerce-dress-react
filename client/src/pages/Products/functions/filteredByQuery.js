export default function filteredByQuery(params, setFilterTerm) {
    if (
        params.get("gender")?.toLowerCase()?.includes("hombre") ||
        params.get("gender")?.toLowerCase()?.includes("mujer")
      ) {
        let value =
          params.get("gender").charAt(0).toUpperCase() +
          params.get("gender").slice(1);
        setFilterTerm((prev) => ({
          ...prev,
          gender: value,
        }));
      } else if (params.get("category")?.toLowerCase()) {
        let value =
          params.get("category").charAt(0).toUpperCase() +
          params.get("category").slice(1);
        setFilterTerm((prev) => ({
          ...prev,
          category: value,
        }));
      } else {
        setFilterTerm((prev) => ({
          ...prev,
          gender: "",
          category: "",
        }));
      }
}