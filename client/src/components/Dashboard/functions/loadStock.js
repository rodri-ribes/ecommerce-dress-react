export default function loadStock(
  e,
  listStock,
  setListStock,
  upperCase,
  setFormik
) {
  e.preventDefault();

  if (
    listStock?.color?.length > 0 &&
    listStock?.waist?.length > 0 &&
    listStock?.stock?.length > 0
  ) {
    let obj = {
      waist: listStock.waist.toUpperCase(),
      list: [
        {
          color: listStock.color,
          stock: parseInt(listStock.stock),
        },
      ],
    };

    let obj2 = {
      color: listStock.color,
      stock: parseInt(listStock.stock),
    };

    let alreadyExists = {
      ...listStock?.lista?.find(
        (e) => e?.waist === listStock.waist.toUpperCase()
      ),
    };

    if (Object.keys(alreadyExists)?.length > 0) {
      let stock = listStock?.lista?.filter(
        (e) => e?.waist !== listStock.waist.toUpperCase()
      );

      //tira error si alreadyExists.list?.push(obj2)
      let list = [...alreadyExists?.list];

      list.push(obj2);

      alreadyExists.list = [...list];

      stock?.push(alreadyExists);

      setListStock((prev) => ({
        ...prev,
        lista: stock,
      }));

      setFormik((prev) => ({ ...prev, sizeAndStock: stock }));
    } else {
      setListStock((prev) => ({
        ...prev,
        lista: [...prev.lista, obj],
      }));
      setFormik((prev) => ({
        ...prev,
        sizeAndStock: [...prev.sizeAndStock, obj],
      }));
    }

    setListStock((prev) => ({
      ...prev,
      color: "#ffffff",
      waist: "",
      stock: 0,
    }));
  }

  // setFormik({ sizeAndStock:  });
}
