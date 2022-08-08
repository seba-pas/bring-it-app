import React from "react";
import { NavLink } from "react-router-dom";
import image from "../components/img/logo2-removebg-preview.png";
import styles from "../styles/NavBar.module.css";

export default function NavBarAdmin() {
    return (
        <div className={styles.navbar}>
          <div className={styles.imagen}>
            {/* <NavLink exact to="/"> */}
              <img
                src={image}
                style={{ width: "auto", height: "100px" }}
                alt="Logo no encontrado"
              />
            {/* </NavLink> */}
          </div>

    </div>
  )
}