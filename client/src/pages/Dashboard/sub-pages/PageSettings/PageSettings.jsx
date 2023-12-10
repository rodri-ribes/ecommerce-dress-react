import React, { useEffect, useState } from "react";
import style from "./PageSettings.module.scss";

//------ Imports
import { Formik, Field, Form } from "formik";

//------ Components
import Button from "../../../../components/Inputs/Button/Button";
import InputGroup from "./components/InputGroup/InputGroup";

//------ Functions
import { initialvalues, validateInputs } from "./data";

//------ Hooks
import useSetting from "../../../../hooks/useSetting";

export default function PageSettings() {
  const [options, setOptions] = useState({
    edit: false,
    createSetting: false,
  });

  const { setting, addSettingMutation, updateSettingMutation } = useSetting();

  useEffect(() => {
    if (Object.keys(setting).length === 0) {
      setOptions((prev) => ({ ...prev, createSetting: true }));
    } else {
      setOptions((prev) => ({ ...prev, createSetting: false }));
    }
  }, [setting]);

  return (
    <Formik
      initialValues={initialvalues(setting)}
      onSubmit={(valores) => {
        let data = { ...valores };

        data.store_address = {
          address: valores.address,
          location: valores.location,
          province: valores.province,
        };

        if (options.createSetting) {
          addSettingMutation.mutate(data, {
            onSuccess: () => {
              setOptions((prev) => ({ ...prev, createSetting: false }));
            },
          });
        } else {
          updateSettingMutation.mutate(
            {
              _id: setting._id,
              ...data,
            },
            {
              onSuccess: () => {
                setOptions((prev) => ({ ...prev, edit: !prev.edit }));
              },
            }
          );
        }
      }}
      validate={(valores) => validateInputs(valores)}>
      {({ errors, values }) => (
        <Form className={style.container}>
          <div className={style.container__content}>
            <header>
              <h3>Configuración</h3>
            </header>
            <div className={style.container__content__settings}>
              <InputGroup
                title={"Nombre de la pagina"}
                values={values}
                type="text"
                name={"name_of_the_page"}
                options={options}
                errors={errors}
              />
              <InputGroup
                title={"Email de contactó"}
                values={values}
                type="email"
                name={"email"}
                options={options}
                errors={errors}
              />
              <InputGroup
                title={"WhatsApp de contactó"}
                values={values}
                type="text"
                name={"whatsapp"}
                options={options}
                errors={errors}
              />
              <InputGroup
                title={"Monto mínimo para envío gratis"}
                values={values}
                type="number"
                name={"free_min_amount"}
                options={options}
                errors={errors}
              />
              <InputGroup
                title={"Precio del envio"}
                values={values}
                type="number"
                name={"shipping_price"}
                options={options}
                errors={errors}
              />
              <InputGroup
                title={"Alias de Mercado Pago"}
                values={values}
                type="text"
                name={"alias_mp"}
                options={options}
                errors={errors}
              />
              <InputGroup
                title={"CVU / CBU para pago con tarjeta"}
                values={values}
                type="text"
                name={"card_payment"}
                options={options}
                errors={errors}
              />
              <h4>Direccion del local (Para retiros de productos)</h4>
              <div className={style.container__content__settings__localActive}>
                {options.edit || options.createSetting ? (
                  <>
                    <p>
                      ¿ Desea que los clientes puedan retirar su compra en el
                      local ?
                    </p>
                    <div
                      className={
                        style.container__content__settings__localActive__group
                      }>
                      <Field type="radio" name="local_active" value={"true"} />
                      <label>Activar</label>
                    </div>
                    <div
                      className={
                        style.container__content__settings__localActive__group
                      }>
                      <Field type="radio" name="local_active" value={"false"} />
                      <label>Desactivar </label>
                    </div>
                  </>
                ) : (
                  values.local_active === "true" && (
                    <p>
                      Puede desactivar la opción de retiro en el local si lo
                      prefiere.
                    </p>
                  )
                )}
                {values.local_active === "true" ? (
                  <>
                    <InputGroup
                      title={"Horario de atención"}
                      values={values}
                      type="text"
                      name={"schedule"}
                      options={options}
                      errors={errors}
                    />
                    <InputGroup
                      title={"Dirección del local"}
                      values={values}
                      type="text"
                      name={"address"}
                      options={options}
                      errors={errors}
                    />
                    <InputGroup
                      title={"Localidad"}
                      values={values}
                      type="text"
                      name={"location"}
                      options={options}
                      errors={errors}
                    />
                    <InputGroup
                      title={"Provincia"}
                      values={values}
                      type="text"
                      name={"province"}
                      options={options}
                      errors={errors}
                    />
                  </>
                ) : (
                  <p>El retiro de productos en el local esta desactivado</p>
                )}
              </div>
            </div>
          </div>

          <div className={style.container__buttons}>
            {options.createSetting && (
              <Button
                type="submit"
                title="Crear Configuración"
                isLoading={addSettingMutation.isLoading}
                disabled={
                  Object.keys(errors)?.length > 0 ||
                  !values.name_of_the_page ||
                  addSettingMutation.isLoading
                }
                stylebtn={""}
                icon="floppy"
                extent={{ width: "0%", heigth: "40px" }}
              />
            )}
            {options.edit ? (
              <>
                <Button
                  type="button"
                  title="Cancelar"
                  action={() => {
                    setOptions((prev) => ({ ...prev, edit: !prev.edit }));
                  }}
                  isLoading={false}
                  disabled={false}
                  stylebtn={""}
                  danger={true}
                  icon="x-circle"
                  extent={{ width: "50%", heigth: "40px" }}
                />
                <Button
                  type="submit"
                  title="Guardar"
                  isLoading={false}
                  disabled={
                    Object.keys(errors)?.length > 0 ||
                    !values.name_of_the_page ||
                    updateSettingMutation.isLoading
                  }
                  stylebtn={""}
                  icon="floppy"
                  extent={{ width: "20%", heigth: "40px" }}
                />
              </>
            ) : (
              !options.createSetting && (
                <Button
                  type="button"
                  title="Editar"
                  action={() => {
                    setOptions((prev) => ({ ...prev, edit: !prev.edit }));
                  }}
                  isLoading={false}
                  disabled={false}
                  stylebtn={"v2"}
                  icon="pencil-square"
                  extent={{ width: "20%", heigth: "40px" }}
                />
              )
            )}
          </div>
        </Form>
      )}
    </Formik>
  );
}
