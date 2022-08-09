import React from "react";
import { NavLink, useHistory } from "react-router-dom";
import image from "../components/img/logo2-removebg-preview.png";
import styles from "../styles/NavBar.module.css";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { cleanUsers,cleanUserState } from "../actions/index.js";
import { useDispatch } from "react-redux";

export default function NavBarAdmin() {
  const history = useHistory();
  const dispatch = useDispatch();
  function handleCloseSessionAdmin(e) {
    e.preventDefault();
    dispatch(cleanUsers());
    dispatch(cleanUserState());
    swal(
      "Tu sesion ha sido cerrada con éxito",
      "Gracias por usar Bring it!",
      "success"
    );
    history.push("/");
  }
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
      <Col
        lg={6}
        md={6}
        sm={12}
        className="text-center p-5 m-auto shadow-sm rounded-lg"
      >
        <Button onClick={handleCloseSessionAdmin}>Salir</Button>
      </Col>
    </div>
  );
}
