import React from "react";
import style from "./SidebarFilter.module.scss";
import InputSearch from "../../../../components/Inputs/InputSearch/InputSearch";
import InputSelect from "../../../../components/Inputs/InputSelect/InputSelect";
import InputField from "../../../../components/Inputs/InputField/InputField";
import {
  listBrand,
  listCategory,
} from "../../../../functions/clothingProperties.js";

export default function SidebarFilter({ filter, setFilter }) {
  return (
    <aside className={style.container}>
      {filter.isActive && (
        <button
          className={style.container__resetFilter}
          onClick={() => {
            setFilter({
              brand: "",
              category: "",
              search: "",
              offer: "",
              minPrice: 0,
              maxPrice: 0,
              gender: "",
            });
          }}>
          Borrar Filtros
        </button>
      )}
      <InputSearch
        filter={filter}
        setFilter={setFilter}
        name={"search"}
        title={"Buscar..."}
        extent={{ width: "100%", heigth: "" }}
      />
      <div className={style.container__range}>
        <InputField
          filter={filter}
          setFilter={setFilter}
          title={"Precio Minimo"}
          name={"minPrice"}
          extent={{ width: "49%", heigth: "" }}
        />
        <InputField
          filter={filter}
          setFilter={setFilter}
          title={"Precio Maximo"}
          name={"maxPrice"}
          extent={{ width: "49%", heigth: "" }}
        />
      </div>
      <InputSelect
        filter={filter}
        setFilter={setFilter}
        arr={["Hombre", "Mujer", "Niños"]}
        title={"Genero"}
        name={"gender"}
        extent={{ width: "100%", heigth: "" }}
      />
      <InputSelect
        filter={filter}
        setFilter={setFilter}
        arr={["Con Descuento", "Sin Descuento"]}
        title={"Descuentos"}
        name={"offer"}
        extent={{ width: "100%", heigth: "" }}
      />
      <InputSelect
        filter={filter}
        setFilter={setFilter}
        arr={listCategory}
        title={"Categoria"}
        name={"category"}
        extent={{ width: "100%", heigth: "" }}
      />
      <InputSelect
        filter={filter}
        setFilter={setFilter}
        arr={listBrand}
        title={"Marca"}
        name={"brand"}
        extent={{ width: "100%", heigth: "" }}
      />
    </aside>
  );
}
