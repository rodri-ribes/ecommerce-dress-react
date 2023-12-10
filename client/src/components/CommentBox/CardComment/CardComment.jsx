import React, { useState } from "react";
import getDate from "../../../functions/getDate.js";

import style from "./CardComment.module.scss";
import Menu from "../../Menu/Menu.jsx";
import useMutationComment from "../../../hooks/comment/useMutationComment.jsx";
import Button from "../../Inputs/Button/Button.jsx";

export default function CardComment({
  id,
  comment,
  user,
  date,
  view,
  author,
  product,
  btn,
  setBtn,
  response,
}) {
  const { updateCommentMutation, deleteCommentMutation } = useMutationComment();

  const [values, setValues] = useState({
    editButton: false,
    deleteButton: false,
    load: false,
    editComment: "",
    response: "",
  });

  const [menu, setMenu] = useState({ menu: false, id: "" });

  const handleOnChangeButton = (name, valor) => {
    setBtn((prev) => ({ ...prev, [name]: valor }));
  };

  const submitNewComment = (e) => {
    e.preventDefault();
    if (values.editComment?.length > 0) {
      updateCommentMutation.mutate({
        id,
        comment: values.editComment,
        date: getDate("full"),
      });
      setBtn((prev) => ({ ...prev, editButton: "" }));
    }
  };

  const reponseComment = () => {
    if (values?.response?.length > 0) {
      updateCommentMutation.mutate({
        id,
        view: true,
        response: {
          firstname: user?.firstname,
          comment: values?.response,
          date: getDate("full"),
        },
      });
      setBtn((prev) => ({ ...prev, responseButton: "" }));
    }
  };

  const invisibleComment = {
    opacity:
      btn.deleteButton === id || (!view && author?._id === user?._id)
        ? ".5"
        : "1",
  };

  return (
    <div className={style.container}>
      <img
        src={author?.image?.link}
        alt={author?.firstname}
        style={invisibleComment}
      />
      <div className={style.container__content}>
        <div className={style.container__content__name}>
          <p style={invisibleComment}>
            {`${author?.firstname} ${author?.lastname}`}{" "}
            {!view && <b>(Comentario en espera de Aprobación)</b>}
          </p>
          <div className={style.container__content__name__menu}>
            <p>{date}</p>
            <button
              className={style.container__content__name__menu_btn}
              disabled={btn.responseButton || btn.editButton}
              id="menu"
              onClick={() => setMenu((prev) => ({ menu: !prev.menu, id: id }))}>
              <i id="menu" className="bi bi-three-dots-vertical"></i>
            </button>
            {menu.menu && menu.id && (
              <Menu
                setMenu={setMenu}
                styleMenu={{ top: "0", right: "2rem", width: "200px" }}>
                <>
                  {user?.rol === "admin" && (
                    <button
                      id="floating_menu"
                      onClick={() =>
                        handleOnChangeButton("responseButton", id)
                      }>
                      <i className="bi bi-chat-right-dots"></i>
                      {response?.firstname ? "Editar Respuesta" : "Responder"}
                    </button>
                  )}
                  <button
                    id="floating_menu"
                    onClick={() => handleOnChangeButton("editButton", id)}>
                    <i className="bi bi-pencil-square"></i>
                    Editar
                  </button>
                  <button
                    id="floating_menu"
                    onClick={() => {
                      handleOnChangeButton("deleteButton", id);
                      deleteCommentMutation.mutate({
                        id: id,
                        id_product: product.idConfig,
                      });
                      handleOnChangeButton("deleteButton", "");
                    }}>
                    <i className="bi bi-trash"></i>
                    Eliminar
                  </button>
                </>
              </Menu>
            )}
          </div>
        </div>
        <div className={style.container__content__data}>
          {btn.editButton === id ? (
            <form>
              <input
                type={"text"}
                value={values.editComment}
                placeholder={comment}
                onChange={(e) =>
                  setValues((prev) => ({
                    ...prev,
                    editComment: e.target.value,
                  }))
                }
              />
              <div>
                <Button
                  disabled={!values.editComment}
                  action={(e) => submitNewComment(e)}
                  title="Editar"
                  type="submit"
                  isLoading={updateCommentMutation.isLoading}
                  extent={{ width: "40%", height: "40px" }}
                />
                <Button
                  danger={true}
                  disabled={false}
                  action={() => handleOnChangeButton("editButton", "")}
                  title="Cancelar"
                  type="button"
                  isLoading={updateCommentMutation.isLoading}
                  extent={{ width: "40%", height: "40px" }}
                />
              </div>
            </form>
          ) : (
            <p style={invisibleComment}>{comment}</p>
          )}
        </div>
        <div className={style.container__content__response}>
          {btn.responseButton === id ? (
            <form>
              <input
                type={"text"}
                id="floating_menu"
                value={values.response}
                placeholder={response?.comment ? response?.comment : ""}
                onChange={(e) =>
                  setValues((prev) => ({
                    ...prev,
                    response: e.target.value,
                  }))
                }
              />
              <div>
                <Button
                  disabled={!values.response}
                  action={(e) => reponseComment(e)}
                  title="Responder"
                  type="submit"
                  isLoading={updateCommentMutation.isLoading}
                />
                <Button
                  danger={true}
                  disabled={false}
                  action={() => handleOnChangeButton("responseButton", "")}
                  title="Cancelar"
                  type="button"
                  isLoading={updateCommentMutation.isLoading}
                />
              </div>
            </form>
          ) : (
            response?.firstname && (
              <div
                className={style.container__content__response__wrapper}
                style={{
                  justifyContent: `${
                    response?.comment?.length > 70
                      ? "space-between"
                      : "flex-start"
                  }`,
                }}>
                <div
                  className={style.container__content__response__wrapper_left}
                  style={{
                    width: `${response?.comment?.length > 70 ? "70%" : "auto"}`,
                  }}>
                  <i className="bi bi-arrow-return-right"></i>
                  <b>{response?.firstname}:</b>
                  <p>{response?.comment} </p>
                </div>
                <div
                  className={style.container__content__response__wrapper_right}>
                  <p>{response?.date}</p>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}
