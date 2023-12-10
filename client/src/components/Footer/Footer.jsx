import style from "./Footer.module.scss";
import SocialNetworks from "./SocialNetworks/SocialNetworks";
import useSetting from "../../hooks/useSetting";
import { Link } from "react-router-dom";
import { whatsapp } from "../../functions/whatsapp";
function Footer() {
  const { setting } = useSetting();

  return (
    <footer className={style.container}>
      <div className={style.container__wrapper}>
        <div className={style.container__wrapper__logo}>
          <h4>{setting.name_of_the_page}</h4>
          <p>
            La plataforma líder en moda y prendas de vestir, ofreciendo la mejor
            relación calidad-precio.
          </p>
          <SocialNetworks
            social={{
              instagram: "#",
              facebook: "#",
              twitter: "#",
            }}
          />
        </div>
        <div className={style.container__wrapper__links}>
          <b>ENLACES</b>
          <ul>
            <li>
              <Link to={"/products"}>Productos</Link>
            </li>
            <li>
              <Link to={"/profile/settings"}>Perfil</Link>
            </li>
            <li>
              <Link to={"/profile/favorites"}>Favoritos</Link>
            </li>
            <li>
              <Link to={"/contact"}>Contacto</Link>
            </li>
          </ul>
        </div>

        <div className={style.container__wrapper__contact}>
          <b>CONTACTO</b>
          <ul>
            <li>
              <button onClick={() => whatsapp(setting)}>
                WhatsApp: +54 9 {setting.whatsapp}
              </button>
            </li>
            <li>
              <a href={`mailto:${setting.email}?Subject=Consulta`}>
                E-Mail: {setting.email}
              </a>
            </li>
          </ul>
        </div>

        <div className={style.container__wrapper__subscription}>
          <p>
            <strong>Suscríbete con tu correo electrónico</strong>
          </p>
          <p>
            Recibe las últimas publicaciones directamente en tu bandeja de
            entrada.
          </p>
          <div className={style.container__wrapper__suscription__input}>
            <input type={"email"} placeholder="Ingresa tu Email" />
            <button>Suscribir</button>
          </div>
        </div>
      </div>
      <div className={style.container__copy}>
        <p>
          Copyright © {new Date().getFullYear()} All rights reserved | This
          template is made with ♥ by
          <a
            href="https://rodrigoribes.netlify.app/"
            target="_blank"
            rel="noreferrer">
            Ribes
          </a>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
