import React from "react";
import style from "./FilterPanel.module.scss";

//------ components
import InputSelect from "../../../../../../components/Inputs/InputSelect/InputSelect";
import InputField from "../../../../../../components/Inputs/InputField/InputField";
import InputSearch from "../../../../../../components/Inputs/InputSearch/InputSearch";

//------ functions

import { listCategory, listBrand } from "../../../../../../functions/clothingProperties";

export default function FilterPanel({ filter, setFilter }) {

  return (
    <div className={style.container}>
      <div className={style.container__search}>

      <InputSearch
        name={"search"}
        filter={filter}
        title={"Buscar..."}
        setFilter={setFilter}
      />
      </div>
      <div className={style.container__filters}>
        <div  className={style.container__filters_select}>
          <InputSelect
            filter={filter}
            setFilter={setFilter}
            name={"category"}
            title={"Categoria"}
            arr={listCategory}
          />
        </div>
        <div  className={style.container__filters_select}>
          <InputSelect
            filter={filter}
            setFilter={setFilter}
            name={"brand"}
            title={"Marcas"}
            arr={listBrand}
          />
        </div>
        <div className={style.container__filters__price}>
          <InputField
            name={"minPrice"}
            title={"Precio Min"}
            filter={filter}
            setFilter={setFilter}
          />
          <p>-</p>
          <InputField
            name={"maxPrice"}
            title={"Precio Max"}
            filter={filter}
            setFilter={setFilter}
          />
        </div>
      </div>
    </div>
  );
}
