import React, { useState } from "react";
import style from "../../../pages/Dashboard/sub-pages/AddProduct/AddProduct.module.scss";

//------ Imports
import { Formik, Field, ErrorMessage, Form } from "formik";
import { useNavigate } from "react-router-dom";

//------ Components
import Button from "../../Inputs/Button/Button";
import LoadImages from "../LoadImages/LoadImages";
import LoadSizeAndStock from "../LoadSizeAndSotck/LoadSizeAndSotck";
import Snipper from "../../Spinner/Spinner";

//------ Functions
import upperCase from "../../../functions/upperCase";
import { listBrand, listCategory } from "../../../functions/clothingProperties";

//------ hooks
import useMutationProduct from "../../../hooks/product/useMutationProduct";
import useFileUploader from "../../../hooks/useFileUploader";
import useNotification from "../../../hooks/useNotification";
import FieldFormik from "../FieldFormik/FieldFormik";

export default function EditProduct({ product, setMenu }) {
  const navigate = useNavigate();

  const { updateProductMutation } = useMutationProduct();

  const { uploadFile, deleteFile } = useFileUploader();

  const { handleNotification } = useNotification();

  const [succes, setSucces] = useState(false);

  const [imagesToDelete, setImagesToDelete] = useState([]);

  const [listStock, setListStock] = useState({
    waist: "",
    color: "#ffffff",
    stock: "",
    lista: product?.sizeAndStock,
  });

  return (
    <Formik
      initialValues={{
        idConfig: product?.idConfig,
        title: product?.title,
        content: product?.content,
        images: product?.images,
        price: product?.price,
        gender: product?.gender,
        category: product?.category,
        brand: product?.brand,
        sizeAndStock: product?.sizeAndStock,
      }}
      onSubmit={async (valores, { resetForm }) => {
        setSucces(true);
        let images = [];

        for (const img of valores.images) {
          if (img?.link) {
            //se pushean las imagenes ya existentes para no perderlas
            images.push(img);
          } else {
            //se suben las imagenes nuevas y se pushean
            let upImage = await uploadFile(img, "products", valores.title);
            images.push(upImage);
          }
        }

        //las imagenes que ya estaban cargadas y se quitaron se borran de firebase
        for (const img of imagesToDelete) {
          await deleteFile("products", img?.name);
        }

        //si no hubo modificaciones se cargan las imagenes que estaban
        if (images?.length < 1) {
          images = valores.images;
        }

        let data = {
          idConfig: valores?.idConfig,
          title: upperCase(valores.title),
          content: valores?.content,
          price: valores?.price,
          category: valores?.category,
          brand: valores?.brand,
          gender: valores?.gender,
          sizeAndStock: listStock?.lista,
          images,
          discount:
            valores?.price !== product?.price && product?.discount > 0
              ? valores?.price - (valores?.price * product?.offer) / 100
              : product?.discount,
        };

        updateProductMutation.mutate(data, {
          onSuccess: (resp) => {
            handleNotification({
              status: true,
              title: "Éxito",
              text: resp.message,
            });
            navigate("/dashboard/manage-products");
            resetForm();
            setMenu({
              menu: false,
              action: "",
              obj: false,
              modal: false,
            });
          },
        });
      }}
      validate={(valores) => {
        let errores = {};

        if (!valores.title) {
          errores.title = "Ingresa Titulo";
        }

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
          {updateProductMutation.isLoading ? (
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
                      placeholder="Categoria"
                      as="select">
                      <option value={""}>Categoria</option>
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
                      placeholder="Marca"
                      as="select">
                      <option value={""}>Marca</option>
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
                          {errors.brand}
                        </p>
                      )}
                    />
                  </div>
                  <div className={style.container__form__section__group}>
                    <LoadImages
                      images={values?.images}
                      setFormik={setValues}
                      setImagesToDelete={setImagesToDelete}
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
              <div
                className={style.container__button}
                style={{ justifyContent: "center" }}>
                <Button
                  type="submit"
                  title={"EDITAR PRODUCTO"}
                  disabled={
                    Object.keys(errors)?.length > 0 ||
                    values?.title?.length < 1 ||
                    succes
                  }
                  isLoading={succes}
                  stylebtn=""
                  icon={"cloud-arrow-up"}
                  extent={{ width: "100%", heigth: "40px" }}
                />
              </div>
            </>
          )}
        </Form>
      )}
    </Formik>
  );
}
