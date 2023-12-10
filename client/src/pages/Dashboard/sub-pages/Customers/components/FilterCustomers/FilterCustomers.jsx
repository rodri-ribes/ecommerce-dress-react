import React from "react";
import style from "./FilterCustomers.module.scss";

//------ components
import InputSearch from "../../../../../../components/Inputs/InputSearch/InputSearch";
import InputSelect from "../../../../../../components/Inputs/InputSelect/InputSelect";
import InputField from "../../../../../../components/Inputs/InputField/InputField";

//------ functions

export default function FilterCustomers({ filter, setFilter }) {
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
        <div className={style.container__filters_select}>
          <InputSelect
            filter={filter}
            setFilter={setFilter}
            name={"status"}
            title={"Estado"}
            arr={filter.arrStatus}
          />
        </div>
        <div className={style.container__filters_select}>
          <InputSelect
            filter={filter}
            setFilter={setFilter}
            name={"date"}
            title={"Fechas"}
            arr={[...new Set(filter.arrDate)]}
            />
        </div>
        <div className={style.container__filters__price}>
          <InputField
            name={"montMin"}
            title={"Monto Min"}
            filter={filter}
            setFilter={setFilter}
          />
          <p>-</p>
          <InputField
            name={"montMax"}
            title={"Monto Max"}
            filter={filter}
            setFilter={setFilter}
          />
        </div>
      </div>
    </div>
  );
}
