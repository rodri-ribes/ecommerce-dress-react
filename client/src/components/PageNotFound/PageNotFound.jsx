import React from 'react'
import style from './PageNotFound.module.scss';

import image from '../../assets/images/404.png'
import { Link } from 'react-router-dom';

export default function PageNotFound() {
  return (
    <div className={style.container}>
      <div className={style.container__card}>
        <img src={image} alt="404" />
        <p>No existe la pagina, <Link to="/">ir a la pagina principal</Link></p>
      </div>
    </div>
  )
}
