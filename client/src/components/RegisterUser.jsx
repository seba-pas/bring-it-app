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
import moment from 'moment'




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
    birthDate: moment().format("YYYY-MM-DD"),
    /* age: "1", */
    phone: "",
    active: true,
  });
  const [error, setError] = useState({
    erroremail: "",
    errorpassword: "",
    errorconfirmPassword: "",
    errorname: "",
    errorlastname: "",
    errorbirthDate: "",
    errorphone: "",
  });
  useEffect(() => {
    validate();
  }, [input.email, input.password, input.name, input.lastname, input.birthDate, input.phone, input.confirmPassword]);
  const validate = () => {
    let erroremail = "";
    let errorpassword = "";
    let errorconfirmPassword = "";
    let errorname = "";
    let errorlastname = "";
    let errorbirthDate = "";
    let errorphone = "";

    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(input.email)) { erroremail = "❌ Debe escribir una direccion de email correcta." } else { erroremail = "✅Email valido" }
    if (!input.password || !/^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/.test(input.password)) { errorpassword = "La contraseña debe tener al entre 8 y 16 caracteres, al menos un dígito, al menos una minúscula y al menos una mayúscula." } else { errorpassword = "✅ Contraseña valida" }
    // if (!/^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/.test(input.password)) { errorpassword = "La contraseña debe tener entre 8 y 16 caracteres" } else { errorpassword = "✅ Contraseña valida" }
    if (input.confirmPassword === "" || input.confirmPassword !== input.password) { errorconfirmPassword = "las contraseñas no coinciden" } else { errorconfirmPassword = "✅" }
    if (!/^[A-Z]+[A-Za-z0-9\s]+$/g.test(input.name)) { errorname = "❌ La primera letra debe estar en mayúscula" } else { errorname = "✅Hecho!" }
    if (!/^[A-Z]+[A-Za-z0-9\s]+$/g.test(input.lastname)) { errorlastname = "❌ La primera letra debe estar en mayúscula" } else { errorlastname = "✅Hecho" }
    if (input.birthDate[0] === " " || input.birthDate === "") { errorbirthDate = "Debe ingresar su fecha de nacimiento" } else { errorbirthDate = "✅Hecho!" }
    if (!/^[0-9]{0,10}$/.test(input.phone) || input.phone[0] === " " || input.phone === "") { errorphone = "Debe ingresar su número de contacto" } else { errorphone = "✅Hecho!" }


    setError((prevInput) => {
      return {
        erroremail: erroremail,
        errorpassword: errorpassword,
        errorname: errorname,
        errorlastname: errorlastname,
        errorbirthDate: errorbirthDate,
        errorphone: errorphone,
        errorconfirmPassword: errorconfirmPassword,
      }
    });
  }

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    // setErrors(
    //   validateUsers({
    //     ...input,
    //     [e.target.name]: e.target.name,
    //   })
    // );
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
      input.birthDate !== "" &&
      input.phone !== ""
    ) {
      dispatch(addUser(input));
      swal("Buen trabajo", "Usuario creado con exito", "success");
      history.push("/");
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
        swal("Buen trabajo!", "El usuario fue creado con éxito!", "success");
        setInput({
          email: "",
          password: "",
          name: "",
          lastname: "",
          birthDate: "",
          /* age: "1", */
          phone: "",
        });
        history.push("/"); // /persona
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
                  {error.erroremail && <p>{error.erroremail}</p>}
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
                  {error.errorpassword && <p>{error.errorpassword}</p>}
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
                  {error.errorconfirmPassword && <p>{error.errorconfirmPassword}</p>}
                  {/* {errors.password && <p>{errors.password}</p>} */}
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
                  {error.errorname && <p>{error.errorname}</p>}
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
                  {error.errorlastname && <p>{error.errorlastname}</p>}
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
                  {error.errorbirthDate && <p>{error.errorbirthDate}</p>}
                </Form.Group>
                <Form.Group>
                  <Form.Label>Agrega tu numero de contacto</Form.Label>
                  <Form.Control
                    type="text"
                    value={input.phone}
                    name="phone"
                    id="phone"
                    required
                    placeholder="Ingresa tu número de contacto"
                    onChange={(e) => handleChange(e)}
                  />
                  {error.errorphone && <p>{error.errorphone}</p>}
                </Form.Group>
                <Button
                  disabled={error.erroremail === "❌ Debe escribir una direccion de email correcta." || error.errorpassword === "La contraseña debe tener entre 8 y 16 caracteres " || error.errorname === "❌ La primera letra debe estar en mayúscula" || error.errorlastname === "❌ La primera letra debe estar en mayúscula" || error.errorbirthDate === "Debe ingresar su fecha de nacimiento" || error.errorphone === "Debe ingresar su número de contacto" || error.errorconfirmPassword === "las contraseñas no coinciden"}
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
