import { useHistory } from "react-router-dom";
import { addUser, cleanUsers} from "../actions/index.js";
import { React, useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useDispatch , useSelector } from "react-redux";
import swal from "sweetalert";
import imgIcon from "./img/programmer.png";
import style from "../styles/RegisterUser.module.css";
import NavBarRegisters from "./NavBarRegisters.jsx";
// function validate(input) {
//   let errors = {};

//   if (
//     !input.email ||
//     [(v) => !!v || "Este campo es requerido"] + $ / g.test(input.email)
//   ) {
//     error.email = alert("Este campo es requerido");
//   } else {
//     error.email = console.log("✅Hecho!");
//   }
// // al menos una letra
//   //, al menos un numero, al menos una letra mayúscula, al menos 8 caracteres, no permite espacios.
//   if (
//     !input.password ||
//     /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/g.test(input.password)
//   ) {
//     error.password = alert(
//       "La contraseña debe tener al menos:1 num, letra mayuscula, 8 caracteres,sin espacios "
//     );
//   } else {
//     error.password = console.log("✅Hecho!");
//   }

//   if (!input.name || !/^[A-Z]+[A-Za-z0-9\s]+$/g.test(input.name)) {
//     errors.name = alert("La primera letra debe estar en mayúscula");
//   } else {
//     errors.name = console.log("✅Hecho!");
//   }
//   if (!input.lastname || !/^[A-Z]+[A-Za-z0-9\s]+$/g.test(input.lastname)) {
//     errors.lastname = alert("La primera letra debe estar en mayúscula");
//   } else {
//     errors.lastname = console.log("✅Hecho!");
//   }

//   return errors;
// }
function RegisterUser() {
  const dispatch = useDispatch();
  const history = useHistory();
  // const [errors, setErrors] = useState({});



  const [input, setInput] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    lastname: "",
    birthDate: "",
  });

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  }
  function handleSubmit(e) {
    e.preventDefault();
    if (input.password !== input.confirmPassword) {
      swal(
        "Las contraseñas no coinciden",
        "Por favor vuelva a ingresar su contraseña",
        "error"
      );
      return;
    }
    if (
      input.email !== "" &&
      input.password !== "" &&
      input.password === input.confirmPassword &&
      input.name !== "" &&
      input.lastname !== "" &&
      input.birthDate !== ""
    ) {
      dispatch(addUser(input));
      
    } else {
      swal(
        "Faltan datos por llenar",
        "Por favor ingrese todos los datos",
        "error"
      );
    }
  }
//NUEVO AGUS -> PARA QUE MUESTRE CUANDO USUARIO YA EXISTE
const user = useSelector((state) => state.user);
const [didMount, setDidMount] = useState(true);
  useEffect(() => {
    if (didMount) {
      setDidMount(false);
      return; 
    } else {
      if ( user === "Usuario creado") {
      swal("Buen trabajo!", "El usuario fue creado con exito!", "success");
      setInput({
        email: "",
        password: "",
        name: "",
        lastname: "",
        birthDate: "",
      });
      history.push("/persona");
      } else if ( user === "error:Validation error") {
      swal("Ya existe un usuario con el email");
      dispatch(cleanUsers());
      }
    }
  }, [user]);


  return (
    <div className={style.divContainer}>
      <NavBarRegisters />
      <div className={style.divContainerForms}>
        <Container>
          <h1 className="shadow-sm text-success mt-5 p-3 text-center rounded">
            Registrar Usuario
          </h1>
          <Row>
            <Col
              lg={8}
              md={6}
              sm={12}
              className="text-center p-5 m-auto shadow-sm rounded-lg"
            >
              <img className="iconImg" src={imgIcon} alt="icon" />
              <Form onSubmit={(e) => handleSubmit(e)} className={style.forms}>
                <Form.Group className="mb-3">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    placeholder="Enter email"
                    type="email"
                    value={input.email}
                    name="email"
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
                    onChange={(e) => handleChange(e)}
                    value={input.password}
                    name="password"
                    id="password"
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Confirmar password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Confirmar password"
                    onChange={(e) => handleChange(e)}
                    value={input.confirmPassword}
                    name="confirmPassword"
                    id="confirmPassword"
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Nombre</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Ingrese su nombre"
                    onChange={(e) => handleChange(e)}
                    value={input.name}
                    name="name"
                    id="name"
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Apellido</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Ingrese su apellido"
                    onChange={(e) => handleChange(e)}
                    value={input.lastname}
                    name="lastname"
                    id="lastname"
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Fecha nacimiento</Form.Label>
                  <Form.Control
                    type="date"
                    placeholder="Fecha de nacimiento"
                    onChange={(e) => handleChange(e)}
                    value={input.birthDate}
                    name="birthDate"
                    id="birthDate"
                    required
                  />
                </Form.Group>

                <Button variant="primary" className="mt-3 mb-5 w-100 mt-3"  type="submit">
                  REGISTRARME
                </Button>
              </Form>
            </Col>
          
          </Row>
          <h6 className="mt-5 p-5 text-center text-secondary ">
            © 2022 Bring it. All Rights Reserved | Design by Grupo 8 Soy Henry
          </h6>
        </Container>
      </div>
    </div>
  );
}

export default RegisterUser;
