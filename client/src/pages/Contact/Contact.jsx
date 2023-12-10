import React, { useState } from "react";
import style from "./Contact.module.scss";
import TextField from "@mui/material/TextField";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import Button from "../../components/Inputs/Button/Button";
import handleOnChange from "../../functions/handleOnChange";
import upperCase from "../../functions/upperCase";
import useSetting from "../../hooks/useSetting";
import useMail from "../../hooks/mail/useMail";
import getDate from "../../functions/getDate";

export default function Contact() {
  const { setting } = useSetting();

  const { addMutationMail } = useMail();

  const { address, location, province } = setting.store_address;

  const [values, setValues] = useState({
    name: "",
    email: "",
    message: "",
    alert: "",
  });

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const { name, email, message } = values;

    let date = getDate("date");

    if (window.localStorage.getItem("time-mail") !== date) {
      if (
        name ||
        /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(email) ||
        message
      ) {
        let user = upperCase(name);
        addMutationMail.mutate({ name: user, email, message });
        window.localStorage.setItem("time-mail", date);
        setValues({
          name: "",
          email: "",
          message: "",
          alert: "",
        });
      }
    } else {
      handleOnChange(
        setValues,
        false,
        "alert",
        "Ya enviaste un correo, espera para enviar otro."
      );
      setTimeout(() => {
        handleOnChange(setValues, false, "alert", "");
      }, 2000);
    }
  };

  return (
    <div className={style.container}>
      <form
        onSubmit={handleOnSubmit}
        className={style.container__form}
        style={{
          margin: `${setting.local_active === "true" ? "0" : "0 auto"}`,
        }}>
        <h2>Contacto</h2>
        <TextField
          id="outlined-search"
          label="Nombre"
          type="text"
          name="name"
          onChange={(e) => handleOnChange(setValues, e)}
          variant="outlined"
          style={{ width: "100%" }}
        />
        <TextField
          id="outlined-search"
          label="Email"
          type="email"
          name="email"
          onChange={(e) => handleOnChange(setValues, e)}
          variant="outlined"
          style={{ width: "100%" }}
        />
        <TextareaAutosize
          minRows={5}
          maxRows={10}
          id="outlined-search"
          label="Message"
          type="text"
          name="message"
          onChange={(e) => handleOnChange(setValues, e)}
          variant="outlined"
          placeholder="Mensaje"
        />
        <Button
          type="submit"
          title={"Enviar"}
          disabled={addMutationMail.isLoading || addMutationMail.isSuccess}
          stylebtn=""
          icon={""}
          isLoading={addMutationMail.isLoading}
          extent={{ width: "150px", height: "40px" }}
        />
        {values.alert && <p>{values.alert}</p>}
      </form>
      {setting.local_active === "true" && (
        <div className={style.container__map}>
          <iframe
            title="map"
            id="gmap_canvas"
            src={`https://maps.google.com/maps?q=${encodeURI(
              address + ", " + location + ", " + province + ", Argentina"
            )}&t=&z=13&ie=UTF8&iwloc=&output=embed`}></iframe>
          <div className={style.container__map__information}>
            <p>
              <b>Dirección:</b> {address + ", " + location + ", " + province}
            </p>
            <p>
              <b>Horario:</b> {setting.schedule}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
