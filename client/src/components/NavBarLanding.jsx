import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import swal from "sweetalert";
import Modal from "react-bootstrap/Modal";
import { NavLink } from "react-router-dom";
import image from "../components/img/logoCUT.png";
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
  const [key, setKey] = useState("home");
  const [inputBusiness, setInputBusiness] = useState({
    email: "",
    password: "",
  });
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const validate = (inputBusiness) => {
    const errors = {};

    if (!inputBusiness.email) {
      errors.email = "Email obligatorio.";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(inputBusiness.email)
    ) {
      errors.email = "Email invalido";
    }

    if (!inputBusiness.password) {
      errors.password = "Contraseña obligatoria.";
    } else if (
      !/^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/.test(
        inputBusiness.password
      )
    ) {
      errors.password =
        "Debe tener entre 8 y 16 caracteres, al menos un numero, una minúscula y una mayúscula.";
    }

    return errors;
  };

  //Business
  function handleSubmitLoginBusiness(e) {
    e.preventDefault();

    if (inputBusiness.email !== "" && inputBusiness.password !== "") {
      dispatch(loginBusiness(inputBusiness));
      setInputBusiness({
        email: "",
        password: "",
      });
      setErrors({
        ...inputBusiness,

      })
    } else {
      alert("¡Faltan los elementos necesarios!");
    }
  }
  function handleChangeBusiness(e) {
    setInputBusiness({
      ...inputBusiness,
      [e.target.name]: e.target.value,
    });
  }


  
  useEffect(() => {
    if (didMount) {
      setDidMount(false);
      return;
    } else {
      if (business === "Usuario no encontrado") {
        swal(
          "Empresa no encontrada",
          "La empresa a la que intentas entrar no esta registrada",
          "error"
        );
        setShowLogin(false);
        setInputBusiness({
          email: "",
          password: "",
        });

        setShowLogin(false)
        return;

      } else if (business === "Datos incorrectos") {
        swal(
          "Datos incorrectos",
          "El email o la contraseña no son correctas ",
          "error"
        );
        setShowLogin(false);
        setInputBusiness({
          email: "",
          password: "",
        });
        
      } else {
        swal("Buen trabajo!", "Entro al sistema correctamente!", "success");

        setInputBusiness({
          email: "",
          password: "",
        });
        history.push("/empresas");
      }
    }
    return () => {
      setInputBusiness({
        email: "",
        password: "",
      });
    };
  }, [business]);

  //USUARIO
  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  }
  function handleSubmitLoginUser(e) {
    e.preventDefault();

    if (input.email !== "" && input.password !== "") {
      dispatch(login(input));
      setInput({
        email: "",
        password: "",
      });
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
        setInput({
          email: "",
          password: "",
        });
        swal(
          "Usuario no encontrado",
          "El email parece no estar registrado",
          "error"
        );
        return;
      } else if (user === "Datos incorrectos") {
        setInput({
          email: "",
          password: "",
        });
        swal(
          "Datos incorrectos",
          "El email o la contraseña no son correctas ",
          "error"
        );
        return;
      } else {
        swal("Buen trabajo!", "Entro al sistema correctamente!", "success");
        setInput({
          email: "",
          password: "",
        });
        history.push("/persona");
      }
    }
  }, [user]);

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
        <button onClick={handleShowLogin}>LOGIN</button>
        <Modal show={showLogin} onHide={handleCloseLogin}>
          <Modal.Header closeButton>
            <Modal.Title>Bienvenido por favor ingresa tus datos</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Tabs
              id="controlled-tab-example"
              activeKey={key}
              onSelect={(k) => setKey(k)}
              className="mb-3"
              justify
            >
              <Tab eventKey="home" title="Empresa">
                <Form onSubmit={(e) => handleSubmitLoginBusiness(e)}>
                  <Form.Group className="mb-3">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      placeholder="Enter email"
                      type="email"
                      name="email"
                      value={inputBusiness.email}
                      required
                      onChange={(e) => handleChangeBusiness(e)}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      name="password"
                      value={inputBusiness.password}
                      onChange={(e) => handleChangeBusiness(e)}
                      required
                    />
                  </Form.Group>

                  <Button
                    variant="info"
                    type="submit"
                    className={styles.buttonSubmit}
                    style={{ marginLeft: "33%" }}
                  >
                    Iniciar sesion
                  </Button>
                </Form>
              </Tab>

              <Tab eventKey="profile" title="Usuario">
                <Form onSubmit={(e) => handleSubmitLoginUser(e)}>
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

                  <Button
                    variant="info"
                    type="submit"
                    className={styles.buttonSubmit}
                    style={{ marginLeft: "33%" }}
                  >
                    Iniciar sesion
                  </Button>
                </Form>
              </Tab>
            </Tabs>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={handleCloseLogin}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        <button onClick={handleShow}>REGISTRARSE</button>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Bienvenido</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className={styles.modalTitle}>Como prefieres registrarte:</div>
            <div className={styles.buttonModals}>
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
            <Button variant="danger" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}
