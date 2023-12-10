import React, { useEffect, useState } from "react";
import style from "./Search.module.scss";

//------ Imports
import { useNavigate } from "react-router-dom";

//------ Functions
import showProduct from "../../functions/showProduct";

//------ Hooks
import useQueryProducts from "../../hooks/product/useQueryProducts";

export default function Search() {
  const { products } = useQueryProducts();
  const [search, setSearch] = useState("");
  const [filteredProducts, setfilteredProducts] = useState();

  useEffect(() => {
    setfilteredProducts(
      products.filter((p) =>
        p?.title?.toLocaleLowerCase()?.includes(search?.toLocaleLowerCase())
      )
    );
  }, [products, search]);

  let navigate = useNavigate();

  return (
    <div className={style.container}>
      <form
        onSubmit={(e) => e.preventDefault()}
        className={style.container__input}>
        <i className={`bi bi-search ${style.container__input_search}`}></i>
        <input
          type="text"
          placeholder="Buscar..."
          onChange={(e) => setSearch(e.target.value)}
          value={search}
        />
        {search && (
          <button type="button" onClick={() => setSearch("")}>
            <i className="bi bi-x-lg"></i>
          </button>
        )}
      </form>
      {filteredProducts?.length > 0 && search && (
        <ul className={style.container__list}>
          {filteredProducts?.map((p) => {
            return (
              <li
                key={p._id}
                className={style.container__list__card}
                onClick={() => {
                  showProduct(navigate, p.idConfig);
                  setSearch("");
                }}>
                <img src={p.images[0]?.link} alt={p.images[0].name} />
                <div>
                  <h4>{p.title}</h4>
                  <div className={style.container__content__price}>
                    <p
                      style={{
                        textDecoration: `${
                          p.discount > 0 ? "line-through" : "none"
                        }`,
                      }}>
                      $ {Intl.NumberFormat("us-US").format(p.price)}
                    </p>
                    {p.discount > 0 && (
                      <b>$ {Intl.NumberFormat("us-US").format(p.discount)}</b>
                    )}
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
