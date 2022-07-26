import React from 'react'
import style from '../styles/LandingPage1.module.css'
import NavBarLanding from './NavBarLanding'
import {Link} from 'react-router-dom'
import Button from "react-bootstrap/Button";
import Imagen from "./img/imgMuestra.jpg";

function LandingPage1() {
    return (
        <div style={{ backgroundColor: "white" }}>
          <NavBarLanding />
          <div>
            <div className={style.divContainer}>
              <div className={style.info}>
                <h1>Compra con Bring It de manera simple, fácil y segura</h1>
                <span>
                  Consigue productos de tus tiendas de todo el pais y entregados por
                  viajeros a tu ciudad.
                </span>
                <div className={style.containerButton}>
                  <Link to={`/persona`}>
                    <Button id={style.boton} type="submit">
                      COMPRAR
                    </Button>
                  </Link>
    
                  <Button id={style.boton} type="submit">
                    VIAJAR
                  </Button>
                </div>
              </div>
              <div className={style.photos}>
                <img src={Imagen} className={style.img} alt="" />
              </div>
              </div>
              </div>
              </div>
    )
            
}

export default LandingPage1