export default function deleteStock(listStock, setListStock, waist, setFormik) {
  let arr = listStock?.lista?.filter((e) => e?.waist !== waist);
  setListStock((prev) => ({
    ...prev,
    lista: arr,
  }));
  setFormik((prev) => ({ ...prev, sizeAndStock: arr }));
}
