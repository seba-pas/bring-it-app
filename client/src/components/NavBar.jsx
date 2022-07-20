import React from "react";
import { NavLink } from "react-router-dom";
import image from "../components/img/logoCUT.png";
import styles from "../styles/NavBar.module.css";

export default function NavBar() {
  return (
    <div className={styles.navbar}>
      <nav>
        <NavLink exact to="/">
          <img
            src={image}
            style={{ width: "auto", height: "100px" }}
            alt="Logo no encontrado"
          />
        </NavLink>
        <div className={styles.contbotones}>
          <NavLink to="/Login">
            <button>INGRESAR</button>
          </NavLink>

          <NavLink to="/Register">
            <button>REGISTRARSE</button>
          </NavLink>
        </div>
      </nav>
    </div>
  );
}
