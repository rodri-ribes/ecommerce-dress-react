import React, { useState } from "react";
import style from "./CommentBox.module.scss";

//------ imports
import { v4 } from "uuid";
import { useQueryClient } from "@tanstack/react-query";

//------ components
import CardComment from "./CardComment/CardComment";
import ModalAlert from "../ModalAlert/ModalAlert";
import Button from "../Inputs/Button/Button";

//------ functions
import getDate from "../../functions/getDate";

//------ hooks
import useMutationComment from "../../hooks/comment/useMutationComment";

export default function CommentBox({ product }) {
  const queryclient = useQueryClient();

  const { addCommentMutation } = useMutationComment();

  const user = queryclient.getQueryData(["user"]);

  const [values, setValues] = useState({
    comment: "",
    loadComment: false,
    editButton: "",
    deleteButton: "",
    responseButton: "",
  });

  const [modal, setModal] = useState({ view: false, text: "" });

  const loadComment = (e, values, setValues) => {
    e.preventDefault();
    let unapprovedComment;

    product?.comments?.forEach((e) => {
      if (e?.user?._id === user._id && !e.view) {
        unapprovedComment = true;
      }
    });

    if (unapprovedComment) {
      setModal({
        text: "Tenes que esperar a que te aprueben el comentario para volver a comentar.",
        view: true,
      });
    } else {
      setValues((prev) => ({ ...prev, loadComment: true }));
      if (values?.comment?.length > 0) {
        addCommentMutation.mutate({
          user,
          id_product: product?.idConfig,
          comment: values.comment,
          date: getDate("full"),
        });
        setValues((prev) => ({ ...prev, comment: "" }));
      }
      setTimeout(() => {
        setValues((prev) => ({ ...prev, loadComment: false }));
      }, 2000);
    }
  };

  return (
    <div className={style.container}>
      <div className={style.container__box}>
        <div className={style.container__box__wrapper}>
          <p>{`${user?.firstname} ${user?.lastname}`}</p>
        </div>
        <form className={style.container__box__form}>
          <input
            value={values.comment}
            type={"text"}
            placeholder="Preguntar..."
            onChange={(e) =>
              setValues((prev) => ({ ...prev, comment: e.target.value }))
            }
          />
          <Button
            disabled={addCommentMutation.isLoading}
            action={(e) => loadComment(e, values, setValues)}
            title="Comentar"
            type="submit"
            isLoading={addCommentMutation.isLoading}

          />
        </form>
      </div>
      <div className={style.container__comments}>
        {product?.comments?.length > 0 &&
          [...product?.comments]
            ?.reverse()
            .filter((p) => p?.view === true || p?.user?._id === user?._id)
            .map((c) => {
              return (
                <CardComment
                  key={v4()}
                  user={user}
                  author={c?.user}
                  product={product}
                  date={c?.date}
                  id={c?._id}
                  comment={c?.comment}
                  view={c?.view}
                  btn={values}
                  setBtn={setValues}
                  response={c?.response}
                />
              );
            })}
      </div>
      {modal.view && <ModalAlert modal={modal} setModal={setModal} />}
    </div>
  );
}
