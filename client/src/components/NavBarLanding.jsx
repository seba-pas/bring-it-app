import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { NavLink } from "react-router-dom";
import image from "../components/img/logoCUT.png";
import swal from "sweetalert";
import Form from "react-bootstrap/Form";
import { login, loginBusiness } from "../actions/index.js";
import styles from "../styles/NavBarLanding.module.css";
import "bootstrap/dist/css/bootstrap.css";
//seba
export default function NavBarLanding() {
  const [show, setShow] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const user = useSelector((state) => state.user);
  const business = useSelector((state) => state.business);
  const dispatch = useDispatch();
  const history = useHistory();
  const [errors, setErrors] = useState({});
  const [didMount, setDidMount] = useState(true);
  const [input, setInput] = useState({
    email: "",
    password: "",
    type: "",
  });

  const validate = (values) => {
    const errors = {};

    if (!values.email) {
      errors.email = "Email obligatorio.";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = "Email invalido";
    }

    if (!values.password) {
      errors.password = "Contraseña obligatoria.";
    } else if (
      !/^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/.test(values.password)
    ) {
      errors.password =
        "Debe tener entre 8 y 16 caracteres, al menos un numero, una minúscula y una mayúscula.";
    }

    return errors;
  };

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  }
  function handleCheck(e) {
    if (e.target.checked) {
      setInput({
        ...input,
        type: e.target.value,
      });
    }
  }
  function handleSubmit(e) {
    e.preventDefault();

    if (input.email !== "" && input.password !== "") {
      if (input.type === "users") {
        dispatch(login(input));
      } else if(input.type === 'business'){
        dispatch(loginBusiness(input));
      }else{
        return
      }
    } else {
      alert("¡Faltan los elementos necesarios!");
    }
  }
  useEffect(() => {
    if (didMount) {
      setDidMount(false);
      return;
    } else {
      if (user === "Usuario no encontrado") {
        alert("El usuario no existe");
        setInput({
          email: "",
          password: "",
          type: "",
        });
        return;
      } else if (user === "Datos incorrectos") {
        alert("Datos incorrectos");
        setInput({
          email: "",
          password: "",
          type: "",
        });
        return;
      } else {
        swal("Buen trabajo!", "Entro al sistema correctamente!", "success");
        setInput({
          email: "",
          password: "",
          type: "",
        });
        history.push("/persona");
      }
    }
  }, [user]);

  useEffect(() => {
    if (didMount) {
      setDidMount(false);
      return;
    } else {
      if (business === "Usuario no encontrado") {
        alert("La empresa no existe");
        setInput({
          email: "",
          password: "",
          type: "",
        });
        return;
      } else if (business === "Datos incorrectos") {
        alert("Datos incorrectos");
        setInput({
          email: "",
          password: "",
          type: "",
        });
        return;
      } else {
        swal("Buen trabajo!", "Entro al sistema correctamente!", "success");
        setInput({
          email: "",
          password: "",
          type: "",
        });
        history.push("/empresas");
      }
    }
  }, [business]);

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

              <Form.Label>Estas registrado como:</Form.Label>
              <div>
                <Form.Group className="mb-3 ml-15">
                  <Form.Label>Empresa</Form.Label>
                  <Form.Check
                    type="radio"
                    name="type"
                    value="business"
                    onChange={(e) => handleCheck(e)}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Usuario</Form.Label>
                  <Form.Check
                    type="radio"
                    name="type"
                    value="users"
                    onChange={(e) => handleCheck(e)}
                  />
                </Form.Group>
              </div>
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
