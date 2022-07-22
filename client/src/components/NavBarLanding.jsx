import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { NavLink } from "react-router-dom";
import image from "../components/img/logoCUT.png";
import swal from "sweetalert";
import Form from "react-bootstrap/Form";

import styles from "../styles/NavBarLanding.module.css";
import "bootstrap/dist/css/bootstrap.css";
//seba
export default function NavBarLanding() {
  const [show, setShow] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const [errors, setErrors] = useState({});
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    console.log(input);
  }
  function handleSubmit(e) {
    e.preventDefault();
    if (input.email !== "" && input.password !== "") {
      // dispatch(createLogin(input));
      swal("Buen trabajo!", "Entro al sistema correctamente!", "success");
      setInput({
        email: "",
        password: "",
        // user: true,
        // empresa: false,
      });
      // if (user !== true) {
      //   history.push("/empresas");
      // } else {
      //   history.push("/persona");
      // }
      //Aca hacer una logica, si el mail esta creado con empresa
      //
      //Si el mail figura para un usuario history.push("/persona")
      history.push("/empresas");
    } else {
      alert("¡Faltan los elementos necesarios!");
    }
  }

  const handleCloseLogin = () => setShowLogin(false);
  const handleShowLogin = () => setShowLogin(true);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
      <div className={styles.SearchBar}></div>
      <div className={styles.contbotones2}>
        <button onClick={handleShowLogin}>INGRESAR</button>

        <Modal show={showLogin} onHide={handleCloseLogin}>
          <Modal.Header closeButton>
            <Modal.Title>Bienvenido por favor ingresa tus datos</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={(e) => handleSubmit(e)}>
              <Form.Group className="mb-3">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  placeholder="Enter email"
                  type="email"
                  name="email"
                  value={input.email}
                  id="email"
                  required
                  onChange={(e) => handleChange(e)}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  name="password"
                  id="password"
                  value={input.password}
                  onChange={(e) => handleChange(e)}
                  required
                />
              </Form.Group>

              {/* <Form.Group>
                <Form.Label>Como estas registrado</Form.Label>
                <Form.Check inline label="Empresa" name="group1" />

                <Form.Check inline label="Usuario" name="group1" />
              </Form.Group> */}
              <Button
                variant="info"
                type="submit"
                style={{ marginLeft: "33%" }}
              >
                Iniciar sesion
              </Button>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={handleCloseLogin}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
        {/* <NavLink to="/Login">
          <button>INGRESAR</button>
        </NavLink> */}
        <button onClick={handleShow}>REGISTRARSE</button>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Bienvenido</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>Como prefieres registrarte:</div>
            <div>
              <NavLink to="/RegisterBusiness">
                <Button color="secondary" style={{ marginRight: "20px" }}>
                  Empresa
                </Button>
              </NavLink>
              <NavLink to="/RegisterUser">
                <Button color="secondary">Usuario</Button>
              </NavLink>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}
