import React, { useState } from "react";
import style from "./Settings.module.scss";

//------ Imports
import { Formik, Field, ErrorMessage, Form } from "formik";

//------ Functions
import { loadImage, uploadImage } from "./functions";
import upperCase from "../../../../functions/upperCase";
//------ hooks

import useCompress from "../../../../hooks/useCompress";
import useFileUploader from "../../../../hooks/useFileUploader";
import useMutationUser from "../../../../hooks/user/useMutationUser";
import useNotification from "../../../../hooks/useNotification";

export default function Settings() {
  const { images, setImages, handleOnCompress } = useCompress();

  const { uploadFile, deleteFile } = useFileUploader();

  const { user, updateUserMutation } = useMutationUser();

  const { handleNotification } = useNotification();

  //state para los errores
  const [options, setOptions] = useState({
    showEdit: false,
    showEditImage: false,
  });

  return (
    <Formik
      initialValues={{
        firstname: user?.firstname,
        lastname: user?.lastname,
        address: user?.domicile?.address,
        location: user?.domicile?.location,
        province: user?.domicile?.province,
        postal_code: user?.domicile?.postal_code,
        email: user?.email,
        whatsapp: user?.whatsapp,
      }}
      onSubmit={async (valores) => {
        let data = {
          firstname: upperCase(valores.firstname),
          lastname: upperCase(valores.lastname),
          domicile: {
            address: upperCase(valores.address),
            location: upperCase(valores.location),
            province: upperCase(valores.province),
            postal_code: valores.postal_code,
          },
          email: valores.email,
          whatsapp: valores.whatsapp,
        };

        updateUserMutation.mutate(data, {
          onSuccess: (resp) => {
            handleNotification({
              status: true,
              title: resp.data.message,
              text: "",
            });
          },
          onError: () => {
            handleNotification({
              status: false,
              title: "Error",
              text: "Vuelve a intentarlo mas tarde.",
            });
          },
        });
        setOptions((prev) => ({ ...prev, showEdit: false }));
      }}
      validate={(valores) => {
        let errores = {};

        if (!valores.firstname) {
          errores.firstname = "Ingresa Nombre";
        }
        if (!valores.lastname) {
          errores.lastname = "Ingresa Apellido";
        }
        if (!valores.address) {
          errores.address = "Ingresa Dirección";
        }
        if (!valores.location) {
          errores.location = "Ingresa Localidad";
        }
        if (!valores.province) {
          errores.province = "Ingresa Provincia";
        }
        if (!valores.postal_code) {
          errores.postal_code = "Ingresa Codigo Postal";
        }

        if (!valores.whatsapp) {
          errores.whatsapp = "Ingresa WhatsApp";
        }

        if (!valores.email) {
          errores.email = "Ingresa Email";
        } else if (
          !/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(
            valores.email
          )
        ) {
          errores.email = "Email invalido";
        }

        return errores;
      }}>
      {({ errors, values }) => (
        <Form className={style.container}>
          {!options.showEdit && (
            <button
              onClick={() =>
                setOptions((prev) => ({ ...prev, showEdit: !prev.showEdit }))
              }
              className={style.container_buttonEdit}>
              <i className="bi bi-pencil-square"></i>
            </button>
          )}
          <div className={style.container__oneSection}>
            <div className={style.container__oneSection__image}>
              <img
                src={images ? URL.createObjectURL(images) : user?.image?.link}
                alt={values?.firstname}
              />

              <div className={style.container__oneSection__image__svg}>
                <input
                  type="file"
                  accept=".jpg, .png"
                  onChange={(e) => loadImage(e, setOptions, handleOnCompress)}
                />
                <i
                  className="bi bi-upload"
                  onClick={() =>
                    setOptions((prev) => ({
                      ...prev,
                      showEdit: !prev.showEdit,
                    }))
                  }></i>
              </div>
            </div>
            <div className={style.container__oneSection__content}>
              <div className={style.container__oneSection__content__group}>
                <div
                  className={style.container__oneSection__content__group__data}>
                  {options.showEdit ? (
                    <Field
                      className={
                        style.container__oneSection__content__group__data_input
                      }
                      type="text"
                      id="firstname"
                      name="firstname"
                      placeholder="Nombre"
                    />
                  ) : (
                    <p>{values.firstname}</p>
                  )}
                </div>
                {options.showEdit && (
                  <ErrorMessage
                    name="firstname"
                    component={() => (
                      <div
                        className={
                          style.container__oneSection__content__group_error
                        }>
                        <p>{errors.firstname}</p>
                      </div>
                    )}
                  />
                )}
              </div>
              <div className={style.container__oneSection__content__group}>
                <div
                  className={style.container__oneSection__content__group__data}>
                  {options.showEdit ? (
                    <Field
                      className={
                        style.container__oneSection__content__group__data_input
                      }
                      type="text"
                      id="lastname"
                      name="lastname"
                      placeholder="Apellido"
                    />
                  ) : (
                    <p>{values.lastname}</p>
                  )}
                </div>
                {options.showEdit && (
                  <ErrorMessage
                    name="lastname"
                    component={() => (
                      <div
                        className={
                          style.container__oneSection__content__group_error
                        }>
                        <p>{errors.lastname}</p>
                      </div>
                    )}
                  />
                )}
              </div>
            </div>
          </div>
          <div className={style.container__twoSection}>
            <div className={style.container__twoSection__group}>
              <div className={style.container__twoSection__group__data}>
                <p
                  className={style.container__twoSection__group__data_typeCamp}>
                  E-mail:
                </p>
                {options.showEdit ? (
                  <Field
                    className={style.container__twoSection__group__data_input}
                    type="email"
                    id="email"
                    name="email"
                    placeholder="E-mail"
                  />
                ) : (
                  <p>{values.email}</p>
                )}
              </div>
              {options.showEdit && (
                <ErrorMessage
                  name="email"
                  component={() => (
                    <div className={style.container__twoSection__group_error}>
                      <p>{errors.email}</p>
                    </div>
                  )}
                />
              )}
            </div>
            <div className={style.container__twoSection__group}>
              <div className={style.container__twoSection__group__data}>
                <p
                  className={style.container__twoSection__group__data_typeCamp}>
                  WhatsApp:
                </p>
                {options.showEdit ? (
                  <Field
                    className={style.container__twoSection__group__data_input}
                    type="number"
                    id="whatsapp"
                    name="whatsapp"
                    placeholder="WhatsApp"
                  />
                ) : (
                  <p>{values.whatsapp}</p>
                )}
              </div>
              {options.showEdit && (
                <ErrorMessage
                  name="whatsapp"
                  component={() => (
                    <div className={style.container__twoSection__group_error}>
                      <p>{errors.whatsapp}</p>
                    </div>
                  )}
                />
              )}
            </div>
            <div className={style.container__twoSection__home}>
              <h3>
                {!user?.domicile?.address &&
                !user?.domicile?.location &&
                !user?.domicile?.province &&
                !user?.domicile?.postal_code
                  ? "¿ Donde te enviamos los productos ?"
                  : "Domicilio de Entrega"}
              </h3>
              {/* <h3>¿  ?</h3> */}
            </div>
            <div className={style.container__twoSection__group}>
              <div className={style.container__twoSection__group__data}>
                <p
                  className={style.container__twoSection__group__data_typeCamp}>
                  Dirección:
                </p>
                {options.showEdit ? (
                  <Field
                    className={style.container__twoSection__group__data_input}
                    type="text"
                    id="address"
                    name="address"
                    placeholder="Dirección"
                  />
                ) : (
                  <p
                    style={{
                      color: `${!values.address && "red"}`,
                    }}>
                    {values.address?.length > 0
                      ? values?.address
                      : "Ingresa tu dirección"}
                  </p>
                )}
              </div>
              {options.showEdit && (
                <ErrorMessage
                  name="address"
                  component={() => (
                    <div className={style.container__twoSection__group_error}>
                      <p>{errors.address}</p>
                    </div>
                  )}
                />
              )}
            </div>
            <div className={style.container__twoSection__group}>
              <div className={style.container__twoSection__group__data}>
                <p
                  className={style.container__twoSection__group__data_typeCamp}>
                  Localidad:
                </p>
                {options.showEdit ? (
                  <Field
                    className={style.container__twoSection__group__data_input}
                    type="text"
                    id="location"
                    name="location"
                    placeholder="Localidad"
                  />
                ) : (
                  <p
                    style={{
                      color: `${!values.location && "red"}`,
                    }}>
                    {values.location?.length > 0
                      ? values?.location
                      : "Ingresa tu Localidad"}
                  </p>
                )}
              </div>
              {options.showEdit && (
                <ErrorMessage
                  name="location"
                  component={() => (
                    <div className={style.container__twoSection__group_error}>
                      <p>{errors.location}</p>
                    </div>
                  )}
                />
              )}
            </div>
            <div className={style.container__twoSection__group}>
              <div className={style.container__twoSection__group__data}>
                <p
                  className={style.container__twoSection__group__data_typeCamp}>
                  Provincia:
                </p>
                {options.showEdit ? (
                  <Field
                    className={style.container__twoSection__group__data_input}
                    type="text"
                    id="province"
                    name="province"
                    placeholder="Provincia"
                  />
                ) : (
                  <p
                    style={{
                      color: `${!values.location && "red"}`,
                    }}>
                    {values.province?.length > 0
                      ? values?.province
                      : "Ingresa tu Provincia"}
                  </p>
                )}
              </div>
              {options.showEdit && (
                <ErrorMessage
                  name="province"
                  component={() => (
                    <div className={style.container__twoSection__group_error}>
                      <p>{errors.province}</p>
                    </div>
                  )}
                />
              )}
            </div>
            <div className={style.container__twoSection__group}>
              <div className={style.container__twoSection__group__data}>
                <p
                  className={style.container__twoSection__group__data_typeCamp}>
                  Codigo Postal:
                </p>
                {options.showEdit ? (
                  <Field
                    className={style.container__twoSection__group__data_input}
                    type="number"
                    id="postal_code"
                    name="postal_code"
                    placeholder="Codigo Postal"
                  />
                ) : (
                  <p
                    style={{
                      color: `${!values.postal_code && "red"}`,
                    }}>
                    {values.postal_code
                      ? values?.postal_code
                      : "Ingresa tu Codigo Postal"}
                  </p>
                )}
              </div>
              {options.showEdit && (
                <ErrorMessage
                  name="postal_code"
                  component={() => (
                    <div className={style.container__twoSection__group_error}>
                      <p>{errors.postal_code}</p>
                    </div>
                  )}
                />
              )}
            </div>
          </div>

          <div className={style.container__buttons}>
            {(options.showEditImage || options.showEdit) && (
              <button
                type="button"
                onClick={() => {
                  setOptions((prev) => ({
                    ...prev,
                    showEdit: false,
                    showEditImage: false,
                  }));
                  setImages(false);
                }}
                className={style.container__buttons_btn_err}>
                CANCELAR
              </button>
            )}

            {options.showEditImage && (
              <button
                type="button"
                onClick={() =>
                  uploadImage(
                    setOptions,
                    user,
                    deleteFile,
                    uploadFile,
                    updateUserMutation.mutate,
                    handleNotification,
                    images
                  )
                }
                className={style.container__buttons_btn}>
                ACTUALIZAR IMAGEN
              </button>
            )}

            {options.showEdit && (
              <button
                type="submit"
                disabled={Object.keys(errors)?.length > 0 || !values.address}
                className={style.container__buttons_btn}>
                ACTUALIZAR PERFIL
              </button>
            )}
          </div>
        </Form>
      )}
    </Formik>
  );
}
