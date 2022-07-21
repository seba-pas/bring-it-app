import React from "react";
import { NavLink } from "react-router-dom";
import image from "../components/img/logoCUT.png";
import styles from "../styles/NavBarLanding.module.css";
//seba
export default function NavBarLanding() {
  return (
    <div className={styles.navbarLanding}>
      <div className={styles.imagen}>
        <NavLink exact to="/">
          <img
            src={image}
            style={{ width: "auto", height: "100px" }}
            alt="Logo no encontrado"
          />
        </NavLink>
      </div>
      <div className={styles.SearchBar}>
      </div>
      <div className={styles.contbotones2}>
        <NavLink to="/Login">
          <button >INGRESAR</button>
        </NavLink>
        <NavLink to="/Register">
          <button>REGISTRARSE</button>
        </NavLink>
      </div>
    </div>
  );
}
