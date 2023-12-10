import React from "react";
import style from "./SignIn.module.scss";
//------ Imports

import { Link, useNavigate } from "react-router-dom";
import { Formik, Field, ErrorMessage, Form } from "formik";

//------ components
import Button from "../../components/Inputs/Button/Button";

//------ hooks
import useNotification from "../../hooks/useNotification";
import useMutationUser from "../../hooks/user/useMutationUser";

export default function SignIn() {
  const navigate = useNavigate();

  const { handleNotification } = useNotification();

  const { signInUserMutation } = useMutationUser();

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      onSubmit={async (valores, { resetForm }) => {
        let data = {
          email: valores.email,
          password: valores.password,
        };

        signInUserMutation.mutate(data, {
          onSuccess: (resp) => {
            window.localStorage.setItem("user", resp.data.token);

            handleNotification({
              status: true,
              title: "Iniciaste Sesión Correctamente.",
              text: "",
            });
            navigate("/");
          },
        });

        resetForm();
      }}
      validate={(valores) => {
        let errores = {};

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
        }

        return errores;
      }}>
      {({ errors }) => (
        <div className={style.container}>
          <img src="./img/form.jpg" alt="foto" />
          <Form className={style.container__form}>
            <div className={style.container__form__title}>
              <h3>Inicio de Sesión</h3>
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
            <div className={style.container__form__warning}>
              <p>
                ¿ No tenes una cuenta ? <Link to="/signup">Registrate</Link>
              </p>
            </div>
            <div className={style.container__form__button}>
              <Button
                type={"submit"}
                title={"INCIAR SESIÓN"}
                disabled={signInUserMutation.isLoading}
                action={() => {}}
                isLoading={signInUserMutation.isLoading}
              />
            </div>
          </Form>
        </div>
      )}
    </Formik>
  );
}
