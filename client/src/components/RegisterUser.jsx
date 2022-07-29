import { useHistory } from "react-router-dom";
import { addUser, cleanUsers } from "../actions/index.js";
import { React, useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import swal from "sweetalert";
import imgIcon from "./img/programmer.png";
import style from "../styles/RegisterUser.module.css";
import NavBarRegisters from "./NavBarRegisters.jsx";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

const validateUsers = (input) => {
  const errors = {};

  if (
    !input.email ||
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(input.email)
  ) {
    errors.email = "❌ Debe escribir una direccion de email correcta.";
  } else {
    errors.email = "✅Email valido";
  }
  if (
    !input.password ||
    !/^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/.test(input.password)
  ) {
    errors.password = "La contraseña debe tener entre 8 y 16 caracteres";
  } else {
    errors.password = "✅ Contraseña valida";
  }
  if (!input.name || !/^[A-Z]+[A-Za-z0-9\s]+$/g.test(input.name)) {
    errors.name = "❌ La primera letra debe estar en mayúscula";
  } else {
    errors.name = "✅Hecho!";
  }
  if (!input.lastname || !/^[A-Z]+[A-Za-z0-9\s]+$/g.test(input.lastname)) {
    errors.lastname = "❌ La primera letra debe estar en mayúscula";
  } else {
    errors.lastname = "✅Hecho!";
  }

  return errors;
};

function RegisterUser() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [errors, setErrors] = useState({});
  const [value, setValue] = useState();
  const [input, setInput] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    lastname: "",
    birthDate: "",
  });
 /*  function getAge(input) {
    var today = new Date();
    var birthDate = new Date(input.birthDate);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
  } */

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
      input.password.length >= 8 &&
      input.password.length <= 16 &&
      input.confirmPassword.length >= 8 &&
      input.confirmPassword.length <= 16 &&
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
      if (user === "Usuario creado") {
        swal("Buen trabajo!", "El usuario fue creado con exito!", "success");
        setInput({
          email: "",
          password: "",
          name: "",
          lastname: "",
          birthDate: "",
        });
        history.push("/persona");
      } else if (user === "error:Validation error") {
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
                  {errors.email && <p>{errors.email}</p>}
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
                  {errors.password && <p>{errors.password}</p>}
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
                  {errors.password && <p>{errors.password}</p>}
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
                  {errors.name && <p>{errors.name}</p>}
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
                  {errors.lastname && <p>{errors.lastname}</p>}
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
                <Form.Group>
                  <Form.Label>Agrega tu numero de contacto</Form.Label>
                  <div>
                    <PhoneInput
                      placeholder="Enter phone number"
                      value={value}
                      onChange={setValue}
                    />
                    {value}
                  </div>
                </Form.Group>
                <Button
                  variant="primary"
                  className="mt-3 mb-5 w-100 mt-3"
                  type="submit"
                >
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
