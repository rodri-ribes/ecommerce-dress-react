import React from 'react'
import style from './SocialNetworks.module.scss'

export default function SocialNetworks({ social }) {
    return (
        <div className={style.container}>
            <a href={social?.instagram} target="_blank" rel="noreferrer" className={style.container__social__group} style={social?.instagram ? { display: "flex" } : { display: "none" }}>
                <i className="bi bi-instagram"></i>
            </a>
            <a href={social?.linkedin} target="_blank" rel="noreferrer" className={style.container__social__group} style={social?.linkedin ? { display: "flex" } : { display: "none" }}>
                <i className="bi bi-linkedin"></i>
            </a>
            <a href={social?.facebook} target="_blank" rel="noreferrer" className={style.container__social__group} style={social?.facebook ? { display: "flex" } : { display: "none" }} >
                <i className="bi bi-facebook"></i>
            </a>
            <a href={social?.twitter} target="_blank" rel="noreferrer" className={style.container__social__group} style={social?.twitter ? { display: "flex" } : { display: "none" }}>
                <i className="bi bi-twitter"></i>
            </a>
            {/* <a href={social?.youtube} target="_blank" rel="noreferrer" className={style.container__social__group} style={social?.youtube ? { display: "flex" } : { display: "none" }}>
                <i class="bi bi-youtube"></i>
            </a> */}
        </div>
    )
}
