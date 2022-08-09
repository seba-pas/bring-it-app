import React from "react";
import { NavLink } from "react-router-dom";
import image from "../components/img/logo2-removebg-preview.png";
import styles from "../styles/NavBar.module.css";
import { Button, Col, Container, Form, Row } from "react-bootstrap";

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

              <Col>
                <Button>Cerrar sesion</Button>
              </Col>
            {/* </NavLink> */}
          </div>

    </div>
  )
}