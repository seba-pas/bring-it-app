import React from "react";
import style from "../styles/LandingPage1.module.css";
import NavBarLanding from "./NavBarLanding";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import imagen from './img/unboxing.jpg'

function LandingPage1() {
  return (
    <div style={{ backgroundColor: "white", height: '100vh' }}>
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
              <Link to={`/filtro`}>
                <Button id={style.boton}>COMPRAR</Button>
              </Link>
              <Link to={"/conocemas"}>
                <Button id={style.boton}>CONOCE MAS</Button>
              </Link>
            </div>
          </div>
          <div className={style.photos}>
            <img src={imagen} className={style.img} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage1;
