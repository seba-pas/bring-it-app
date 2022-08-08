import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import swal from "sweetalert";
import Modal from "react-bootstrap/Modal";
import { NavLink } from "react-router-dom";
import image from "../components/img/logo2.png";
import {
  login,
  loginBusiness,
  cleanUsers,
  cleanBusiness,
  activateUser,
  activateBusiness,
  getActiveUser,  
  loginUserGoogle
} from "../actions/index.js";
import styles from "../styles/NavBarLanding.module.css";
import "bootstrap/dist/css/bootstrap.css";
import { Avatar, AvatarBadge } from "@chakra-ui/react";
import axios from "axios";


//seba
export default function NavBarLanding() {
  const [show, setShow] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const user = useSelector((state) => state.user);
  const activeUser = user !== 'clean'? user : 'clean';
  
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

useEffect(() => {
  dispatch(getActiveUser())
 }, [dispatch])
 

  const validateBusiness = (inputBusiness) => {
    const errors = {};

    if (
      !inputBusiness.email ||
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(inputBusiness.email)
    ) {
      errors.email = "Debe escribir una direccion de email correcta.";
    } else {
      errors.email = "✔ Email valido";
    }
    if (
      !inputBusiness.password ||
      !/^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/.test(
        inputBusiness.password
      )
    ) {
      errors.password = "La contraseña debe tener entre 8 y 16 caracteres";
    } else {
      errors.password = "✔ Contraseña valida";
    }

    return errors;
  };

  const validateUsers = (input) => {
    const errors = {};

    if (
      !input.email ||
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(input.email)
    ) {
      errors.email = "Debe escribir una direccion de email correcta.";
    } else {
      errors.email = "✔ Email valido";
    }
    if (
      !input.password ||
      !/^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/.test(input.password)
    ) {
      errors.password = "La contraseña debe tener entre 8 y 16 caracteres";
    } else {
      errors.password = "✔ Contraseña valida";
    }

    return errors;
  };

  //Business
  function handleSubmitLoginBusiness(e) {
    e.preventDefault();
    if (
      inputBusiness.email !== "" &&
      inputBusiness.password !== "" &&
      inputBusiness.password.length >= 8 &&
      inputBusiness.password.length <= 16
    ) {
      dispatch(loginBusiness(inputBusiness));
      setInputBusiness({
        email: "",
        password: "",
      });
    } else {
      swal(
        "La contraseña es incorrecta",
        "Verifica cumplir con los requisitos",
        "error"
      );
    }
  }
  function handleChangeBusiness(e) {
    setInputBusiness({
      ...inputBusiness,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validateBusiness({
        ...inputBusiness,
        [e.target.name]: e.target.name,
      })
    );
  }

  useEffect(() => {
    if (didMount) {
      setDidMount(false);
      return;
    } else {
      if (business === "clean") return;
      if (business === "Empresa y sede creada") return;
      else if (business === "Usuario no encontrado") {
        swal(
          "Empresa no encontrada",
          "La empresa a la que intentas entrar no esta registrada",
          "error"
        );

        setInputBusiness({
          email: "",
          password: "",
        });
        dispatch(cleanBusiness());
        history.push("/");
      } else if (business === "Datos incorrectos") {
        swal(
          "Datos incorrectos",
          "El email o la contraseña no son correctas ",
          "error"
        );
        setInputBusiness({
          email: "",
          password: "",
        });
        dispatch(cleanBusiness());
        return;
      } else if (!business.active) {
        swal(
          "Tu cuenta se encuentra desactivada, ¿deseas activarla para iniciar sesión?",
          {
            buttons: ["No", "Si"],
          }
        ).then((value) => {
          if (value) {
            swal("Buen trabajo!", "Entro al sistema correctamente!", "success");
            dispatch(activateBusiness(business.email));
            setInput({
              email: "",
              password: "",
            });
            history.push("/empresas");
          } else {
            history.push("/");
          }
        });
      } else if (business.active) {
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
    setErrors(
      validateUsers({
        ...input,
        [e.target.name]: e.target.name,
      })
    );
  }

  function handleSubmitLoginUser(e) {
    e.preventDefault();
    if (
      input.email !== "" &&
      input.password !== "" &&
      input.password.length >= 8 &&
      input.password.length <= 16
    ) {
      dispatch(login(input));
      setInput({
        email: "",
        password: "",
      });
    } else {
      swal(
        "Ops a ocurrido un error",
        "Verifica cumplir con los requisitos",
        "error"
      );
    }
  }

  useEffect(() => {
    if (didMount) {
      setDidMount(false);
      return;
    } else {
      if (user === "clean") return;
      if (user === "Usuario creado") return;
      else if (user === "Usuario no encontrado") {
        swal(
          "Usuario no encontrado",
          "El email parece no estar registrado",
          "error"
        );
        setInput({
          email: "",
          password: "",
        });
        dispatch(cleanUsers());
        history.push("/");
        return;
      } else if (user === "Datos incorrectos") {
        swal(
          "Datos incorrectos",
          "El email o la contraseña no son correctas ",
          "error"
        );
        setInput({
          email: "",
          password: "",
        });
        dispatch(cleanUsers());
        return;
      } else if (!user.active) {
        swal(
          "Tu cuenta se encuentra desactivada, ¿deseas activarla para iniciar sesión?",
          {
            buttons: ["No", "Si"],
          }
        ).then((value) => {
          if (value) {
            swal("Buen trabajo!", "Entro al sistema correctamente!", "success");
            dispatch(activateUser(user.email));
            setInput({
              email: "",
              password: "",
            });
            history.push("/filtro");
          } else {
            history.push("/");
          }
        });
      } else if (user.active) {
        swal("Buen trabajo!", "Entro al sistema correctamente!", "success");
        setInput({
          email: "",
          password: "",
        });
        history.push("/filtro");
      }
    }
  }, [user]);

  const handleCloseLogin = () => setShowLogin(false);
  const handleShowLogin = () => setShowLogin(true);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  //fc relacionadas a la aut con Google:
  const getAuthenticatedUser = async () => {
    const response = await axios.get(
      "http://localhost:3001/auth/authenticatedUser",
      { withCredentials: true }
      )
      .catch((err) => {
        console.log(`No se loggeo correctamente`);
      });
    if (response && response.data){
      console.log("Usuario loggeado: ", response.data);
      dispatch(loginUserGoogle(response.data));
    }      
  };

  const redirectToGoogle = async () => {
    let timer = null;
    const googleLoginURL = "http://localhost:3001/auth/login/google";
    const newWindow = window.open(googleLoginURL, "_blank", "width=500, height=600");
    //chequeamos sin la ventana esta cerrada o no (se cierra cdo el loggeo con Google termina (exitoso o no))
    if(newWindow){
      timer = setInterval(() => {
        if(newWindow.closed){
          console.log("Se cerro la ventana de autenticación");
          getAuthenticatedUser();
          if (timer) clearInterval(timer);
        }
      }, 500);
    }
  }  


  return (
    <div
      className={styles.navbarLanding}
      style={{
        border: "none",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      {/* <div className={styles.imagen}> */}

      {/* <NavLink exact to="/"> */}
      <img
        src={image}
        style={{
          height: "auto",
          width: "10%",
          objectFit: "fit",
          paddingBottom: "0px",

          marginLeft: '2%',
          marginTop: "3px",
          paddingTop:'5px',

        }}
        alt="Logo no encontrado"
      />
      {/* </NavLink> */}
      {/* </div> */}

      <div className={styles.SearchBar}></div>

      {activeUser !== 'clean' && Object.entries(activeUser).length > 0 ? (
        <div
          style={{
            height: "100%",
            paddingTop: "33px",           
            cursor: "pointer",
            marginRight: '0px',
          marginLeft: '45%'
          }}
        >
          <Avatar
            onClick={() => history.push("/usuarioE")}
            name={`${activeUser.name} ${activeUser.lastname}`}
            src=""
          >
            <AvatarBadge boxSize="1.25em" bg="green.500" />
          </Avatar>
        </div>
      ) : (
        <div className={styles.contbotones2} style={{ marginLeft: "30%" }}>
          <button id={styles.login} onClick={handleShowLogin}>
            LOGIN
          </button>
          <button onClick={handleShow}>REGISTRARSE</button>
        </div>
      )}

      <div>
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
                    {errors.email && <p>{errors.email}</p>}
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
                    {errors.password && <p>{errors.password}</p>}
                  </Form.Group>

                  <Button
                    variant="info"
                    type="submit"
                    id={styles.iniciarSesion}
                    style={{ marginLeft: "33%" }}
                  >
                    Iniciar sesion
                  </Button>                                
                </Form>
              </Tab>

              <Tab eventKey="profile" title="Usuario">
                <Form onSubmit={(e) => handleSubmitLoginUser(e)}>
                  <Row>
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
                      {errors.email && <p>{errors.email}</p>}
                    </Form.Group>
                  </Row>
                  <Row>
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
                      {errors.password && <p>{errors.password}</p>}
                    </Form.Group>
                  </Row>

                  <Button
                    variant="info"
                    type="submit"
                    className={styles.buttonSubmit}
                    style={{ marginLeft: "33%" }}
                  >
                    Iniciar sesion
                  </Button>
                  <div>
                    O inicia sesion con 
                    <Button
                    variant="info"
                    type="submit"
                    id={styles.iniciarSesion}                    
                    onClick={redirectToGoogle}
                  >
                    Google
                  </Button>                    
                  </div>    
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
