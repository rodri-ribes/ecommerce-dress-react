import React from "react";
import style from "./Favorites.module.scss";
import { Link } from "react-router-dom";

import Warning from "../../../../components/Warning/Warning"
import { Pagination } from "@mui/material";
import useMutationUser from "../../../../hooks/user/useMutationUser";
import usePagination from "../../../../hooks/usePagination";

export default function Favorites() {
  const { user, updateUserMutation } = useMutationUser();

  const { page, handleOnChangePage, max, slicePrevious, sliceNext } =
    usePagination({
      count: 4,
      list: user?.favorites,
    });

  return (
    <div className={style.container}>
      {user.favorites.length > 0 ? (
        [...user.favorites]
          .reverse()
          ?.slice(slicePrevious, sliceNext)
          ?.map((f) => {
            return (
              <div className={style.container__product} key={f?._id}>
                <img src={f?.images[0]?.link} alt={f?.title} />
                <div className={style.container__product__content}>
                  <Link to={`/product/${f.idConfig}`}>{f?.title}</Link>
                  <div className={style.container__product__content__price}>
                    <p
                      style={{
                        textDecoration: `${f?.discount > 0 ? "line-through" : "none"
                          }`,
                      }}>
                      $ {Intl.NumberFormat("us-US").format(f?.price)}
                    </p>
                    {f?.discount > 0 && (
                      <b>$ {Intl.NumberFormat("us-US").format(f?.discount)}</b>
                    )}
                  </div>
                  <button onClick={() => updateUserMutation.mutate({ favorite: f._id })}>
                    Eliminar
                  </button>
                </div>
              </div>
            );
          })
      ) : (
        <Warning
          title={"¡ Agrega productos a Favoritos !"}
          text={"Agrega productos que quieras ver mas tarde..."}
        />
      )}

      {user.favorites.length > 4 && (
        <div className={style.container__pagination}>
          <Pagination
            count={max}
            color="primary"
            onChange={handleOnChangePage}
            page={page}
          />
        </div>
      )}
    </div>
  );
}
