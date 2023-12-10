import React, { useState } from "react";
import style from "./AddProduct.module.scss";

//------ Imports
import { Formik, Field, ErrorMessage, Form } from "formik";
import { useNavigate } from "react-router-dom";

//------ Components
import Button from "../../../../components/Inputs/Button/Button";
import LoadImages from "../../../../components/Dashboard/LoadImages/LoadImages";
import LoadSizeAndStock from "../../../../components/Dashboard/LoadSizeAndSotck/LoadSizeAndSotck";
import Snipper from "../../../../components/Spinner/Spinner";

//------ Functions
import {
  listBrand,
  listCategory,
} from "../../../../functions/clothingProperties";
import upperCase from "../../../../functions/upperCase";
import { idGenerator } from "../../../../functions/idGenerator";

//------ hooks
import useMutationProduct from "../../../../hooks/product/useMutationProduct";
import useFileUploader from "../../../../hooks/useFileUploader";
import useNotification from "../../../../hooks/useNotification";
import FieldFormik from "../../../../components/Dashboard/FieldFormik/FieldFormik";

export default function AddProduct() {
  const navigate = useNavigate();

  const [succes, setSucces] = useState(false);

  const { addProductMutation } = useMutationProduct();

  const { uploadFile } = useFileUploader();

  const { handleNotification } = useNotification();

  const [listStock, setListStock] = useState({
    waist: "",
    color: "#ffffff",
    stock: "",
    lista: [],
  });

  return (
    <Formik
      initialValues={{
        title: "",
        content: "",
        images: [],
        price: 0,
        gender: "",
        category: "",
        brand: "",
        sizeAndStock: [],
      }}
      onSubmit={async (valores, { resetForm }) => {
        setSucces(true);
        let images = [];

        for (const img of valores.images) {
          let upImage = await uploadFile(img, "products", valores.title);
          images.push(upImage);
        }

        let data = {
          idConfig: idGenerator(),
          title: upperCase(valores.title),
          content: valores.content,
          price: valores.price,
          category: valores.category,
          brand: valores.brand,
          gender: valores.gender,
          sizeAndStock: listStock.lista,
          images,
        };

        addProductMutation.mutate(data, {
          onSuccess: (resp) => {
            handleNotification({
              status: true,
              title: "Éxito",
              text: resp.message,
            });
            setSucces(false);
            navigate("/dashboard/manage-products");
            resetForm();
          },
        });
      }}
      validate={(valores) => {
        let errores = {};

        if (!valores.title) {
          errores.title = "Ingresa Titulo";
        }
        // if (!valores.content) {
        //   errores.content = "Ingresa Descripción";
        // }
        if (!valores.price) {
          errores.price = "Ingresa Precio";
        }
        if (!valores.gender) {
          errores.gender = "Ingresa Genero";
        }
        if (!valores.category) {
          errores.category = "Ingresa Categoria";
        }
        if (!valores.brand) {
          errores.brand = "Ingresa Marca";
        }
        if (valores.sizeAndStock?.length === 0) {
          errores.sizeAndStock = "Ingresa al menos un talle";
        }
        if (valores.images?.length === 0) {
          errores.images = "Ingresa al menos una imagen";
        }

        return errores;
      }}>
      {({ errors, values, setValues }) => (
        <Form className={style.container}>
          {addProductMutation.isLoading ? (
            <Snipper />
          ) : (
            <>
              <div className={style.container__form}>
                <div className={style.container__form__section}>
                  <FieldFormik
                    type={"text"}
                    name={"title"}
                    placeholder={"Titulo"}
                    errors={errors}
                    style={style}
                  />
                  <FieldFormik
                    type={"text"}
                    name="content"
                    placeholder={"Descripción (Opcional)"}
                    as="textarea"
                    errors={errors}
                    style={style}
                  />
                  <FieldFormik
                    type={"number"}
                    name="price"
                    placeholder={"Precio"}
                    as="input"
                    errors={errors}
                    style={style}
                  />
                  <div className={style.container__form__section__group}>
                    <LoadSizeAndStock
                      listStock={listStock}
                      setListStock={setListStock}
                      setFormik={setValues}
                    />
                    <ErrorMessage
                      name="sizeAndStock"
                      component={() => (
                        <p
                          className={
                            style.container__form__section__group_error
                          }>
                          {errors.sizeAndStock}
                        </p>
                      )}
                    />
                  </div>
                </div>
                <div className={style.container__form__section}>
                  <div className={style.container__form__section__group}>
                    <Field
                      className={style.container__form__section__group_input}
                      type="text"
                      id="gender"
                      name="gender"
                      as="select">
                      <option value="">Genero</option>
                      {["Hombre", "Mujer"].map((c, i) => (
                        <option key={i} value={c}>
                          {c}
                        </option>
                      ))}
                    </Field>
                    <ErrorMessage
                      name="gender"
                      component={() => (
                        <p
                          className={
                            style.container__form__section__group_error
                          }>
                          {errors.gender}
                        </p>
                      )}
                    />
                  </div>
                  <div className={style.container__form__section__group}>
                    <Field
                      className={style.container__form__section__group_input}
                      type="text"
                      id="category"
                      name="category"
                      as="select">
                      <option value="">Categoria</option>
                      {listCategory.map((c, i) => (
                        <option key={i} value={c}>
                          {c}
                        </option>
                      ))}
                    </Field>
                    <ErrorMessage
                      name="category"
                      component={() => (
                        <p
                          className={
                            style.container__form__section__group_error
                          }>
                          {errors.category}
                        </p>
                      )}
                    />
                  </div>
                  <div className={style.container__form__section__group}>
                    <Field
                      className={style.container__form__section__group_input}
                      type="text"
                      id="brand"
                      name="brand"
                      as="select">
                      <option value="">Marca</option>
                      {listBrand.map((b, i) => (
                        <option key={i} value={b}>
                          {b}
                        </option>
                      ))}
                    </Field>
                    <ErrorMessage
                      name="brand"
                      component={() => (
                        <p
                          className={
                            style.container__form__section__group_error
                          }>
                          {errors.category}
                        </p>
                      )}
                    />
                  </div>
                  <div className={style.container__form__section__group}>
                    <LoadImages
                      actionProduct={"edit"}
                      images={values?.images}
                      setFormik={setValues}
                    />
                    <ErrorMessage
                      name="images"
                      component={() => (
                        <p
                          className={
                            style.container__form__section__group_error
                          }>
                          {errors.images}
                        </p>
                      )}
                    />
                  </div>
                </div>
              </div>
              <div className={style.container__button}>
                <Button
                  type="submit"
                  title={"CARGAR PRODUCTO"}
                  disabled={
                    Object.keys(errors)?.length > 0 ||
                    values?.title?.length < 1 ||
                    succes
                  }
                  stylebtn=""
                  icon={"cloud-arrow-up"}
                  isLoading={succes}
                  extent={{ width: "100%", height: "40px" }}
                />
              </div>
            </>
          )}
        </Form>
      )}
    </Formik>
  );
}
