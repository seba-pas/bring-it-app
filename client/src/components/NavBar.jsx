import React from "react";
import { NavLink } from "react-router-dom";
import image from "../components/img/logoCUT.png";
import styles from "../styles/NavBar.module.css";
import SearchBar from "./SearchBar";

//seba
export default function NavBar() {
  return (
    <div className={styles.navbar}>
      <div className={styles.imagen}>
        <NavLink exact to="/">
          <img
            src={image}
            style={{ width: "auto", height: "100%" }}
            alt="Logo no encontrado"
          />
        </NavLink>
      </div>
      <div className={styles.SearchBar}>
        <SearchBar />
      </div>
      {/* <div className={styles.contbotones}>
        <NavLink to="/Login">
          <button>INGRESAR</button>
        </NavLink>
        <button>REGISTRARSE</button>

        
      </div> */}
    </div>
  );
}
