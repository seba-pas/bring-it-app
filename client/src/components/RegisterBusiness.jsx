import { React, useState } from "react";
import { useDispatch } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { addBusiness } from "../actions/index.js";
import NavBarRegisters from "./NavBarRegisters.jsx";
import swal from "sweetalert";
import imgIcon from "./img/programmer.png";
import "../styles/RegisterBusiness.css";

function RegisterBusiness() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [errors, setErrors] = useState({});
  const [input, setInput] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    businessName: "",
    cuit: "",
    address: "",
    province: "",
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
      input.businessName !== "" &&
      input.cuit !== "" &&
      input.address !== "" &&
      input.province !== ""
    ) {
      dispatch(addBusiness(input));
      swal("Buen trabajo!", "La empresa fue creada con exito!", "success");
      setInput({
        email: "",
        password: "",
        businessName: "",
        cuit: "",
        address: "",
        province: "",
      });
      history.push("/empresas");
    } else {
      swal(
        "Faltan datos por llenar",
        "Por favor ingrese todos los datos",
        "error"
      );
    }
  }

  return (
    <div>
      <NavBarRegisters />

      <Container>
        <h1 className="shadow-sm text-success mt-5 p-3 text-center rounded">
          Registrar Empresa
        </h1>
        <Row>
          <Col
            lg={8}
            md={6}
            sm={12}
            className="text-center p-5 m-auto shadow-sm rounded-lg"
          >
            <img className="iconImg" src={imgIcon} alt="icon" />
            <Form onSubmit={(e) => handleSubmit(e)}>
              <Form.Group className="mb-3">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  value={input.email}
                  name="email"
                  id="email"
                  required
                  placeholder="Enter email"
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
                <Form.Label>Empresa nombre </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingrese el nombre de la empresa"
                  onChange={(e) => handleChange(e)}
                  value={input.businessName}
                  name="businessName"
                  id="businessName"
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Cuit</Form.Label>
                <Form.Control
                  type="number"
                  value={input.cuit}
                  name="cuit"
                  id="cuit"
                  required
                  placeholder="Ingrese su numero de Cuit"
                  onChange={(e) => handleChange(e)}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Provincia</Form.Label>
                <Form.Control
                  type="text"
                  value={input.province}
                  name="province"
                  id="province"
                  required
                  placeholder="Ingrese su Provincia"
                  onChange={(e) => handleChange(e)}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Direccion</Form.Label>
                <Form.Control
                  type="text"
                  value={input.address}
                  name="address"
                  id="address"
                  required
                  placeholder="Ingresa tu direccion"
                  onChange={(e) => handleChange(e)}
                />
              </Form.Group>
              <div>
                <Button
                  variant="primary btn btn-block w-100 mt-3"
                  type="submit"
                >
                  REGISTRARME
                </Button>
              </div>
            </Form>
          </Col>
          {/* <Col lg={6} md={6} sm={12}>
            <img className="w-100" src={imgRegister} alt="" />
          </Col> */}
        </Row>
        <h6 className="mt-5 p-5 text-center text-secondary ">
          © 2022 Bring it. All Rights Reserved | Design by Grupo 8 Soy Henry
        </h6>
      </Container>
    </div>
  );
}

export default RegisterBusiness;
