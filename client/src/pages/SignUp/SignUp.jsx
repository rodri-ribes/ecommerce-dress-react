import React from "react";
import style from "../SignIn/SignIn.module.scss";

//------ Imports
import { Link, useNavigate } from "react-router-dom";
import { Formik, Field, ErrorMessage, Form } from "formik";

//------ Components
import Button from "../../components/Inputs/Button/Button";

//------ functions
import upperCase from "../../functions/upperCase";

//------ hooks
import useMutationUser from "../../hooks/user/useMutationUser";
import useNotification from "../../hooks/useNotification";

export default function SignUp() {
  const navigate = useNavigate();

  const { handleNotification } = useNotification();
  const { signUpUserMutation } = useMutationUser();

  return (
    <Formik
      initialValues={{
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        whatsapp: "",
      }}
      onSubmit={async (valores, { resetForm }) => {
        let data = {
          firstname: upperCase(valores.firstname),
          lastname: upperCase(valores.lastname),
          email: valores.email,
          password: valores.password,
          whatsapp: valores.whatsapp,
          image: {
            link: `https://i2.wp.com/cdn.auth0.com/avatars/${valores?.firstname?.charAt(
              0
            )}.png?ssl=1`,
            name: "",
          },
        };

        signUpUserMutation.mutate(data, {
          onSuccess: (resp) => {
            window.localStorage.setItem("user", resp.data.token);

            handleNotification({
              status: true,
              title: "Registrado Correctamente.",
              text: "",
            });
            navigate("/");
          },
        });

        resetForm();
      }}
      validate={(valores) => {
        let errores = {};

        if (!valores.firstname) {
          errores.firstname = "Ingresa Nombre";
        }

        if (!valores.lastname) {
          errores.lastname = "Ingresa Apellido";
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

        if (!valores.password) {
          errores.password = "Ingresa Contraseña";
        } else if (/^.{1,5}$/.test(valores.password)) {
          errores.password = "Ingresa una contraseña mas segura";
        }

        if (!valores.whatsapp) {
          errores.whatsapp = "Ingresa numero de celular (WhatsApp)";
        }

        return errores;
      }}>
      {({ errors }) => (
        <div className={style.container}>
          <img src="./img/form.jpg" alt="foto" />
          <Form className={style.container__form}>
            <div className={style.container__form__title}>
              <h3>Registro</h3>
            </div>
            <div className={style.container__form__group}>
              <Field
                className={style.container__form__group_input}
                type="text"
                id="firstname"
                name="firstname"
                placeholder="Nombre"
              />
              <ErrorMessage
                name="firstname"
                component={() => (
                  <div className={style.container__form__group_error}>
                    <p>{errors.firstname}</p>
                  </div>
                )}
              />
            </div>
            <div className={style.container__form__group}>
              <Field
                className={style.container__form__group_input}
                type="text"
                id="lastname"
                name="lastname"
                placeholder="Apellido"
              />
              <ErrorMessage
                name="lastname"
                component={() => (
                  <div className={style.container__form__group_error}>
                    <p>{errors.lastname}</p>
                  </div>
                )}
              />
            </div>
            <div className={style.container__form__group}>
              <Field
                className={style.container__form__group_input}
                type="email"
                id="email"
                name="email"
                placeholder="Email"
              />
              <ErrorMessage
                name="email"
                component={() => (
                  <div className={style.container__form__group_error}>
                    <p>{errors.email}</p>
                  </div>
                )}
              />
            </div>
            <div className={style.container__form__group}>
              <Field
                className={style.container__form__group_input}
                type="password"
                id="password"
                name="password"
                placeholder="Contraseña"
              />
              <ErrorMessage
                name="password"
                component={() => (
                  <div className={style.container__form__group_error}>
                    <p>{errors.password}</p>
                  </div>
                )}
              />
            </div>
            <div className={style.container__form__group}>
              <Field
                className={style.container__form__group_input}
                type="number"
                id="whatsapp"
                name="whatsapp"
                placeholder="WhatsApp"
              />
              <ErrorMessage
                name="whatsapp"
                component={() => (
                  <div className={style.container__form__group_error}>
                    <p>{errors.whatsapp}</p>
                  </div>
                )}
              />
            </div>
            <div className={style.container__form__warning}>
              <p>
                ¿ Ya tenes una cuenta ? <Link to="/signin">Inicia Sesión</Link>
              </p>
            </div>
            <div className={style.container__form__button}>
              <Button
                type={"submit"}
                title={"CREAR CUENTA"}
                disabled={signUpUserMutation.isLoading}
                action={() => {}}
                isLoading={signUpUserMutation.isLoading}
              />
            </div>
          </Form>
        </div>
      )}
    </Formik>
  );
}
