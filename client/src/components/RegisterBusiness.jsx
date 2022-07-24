import { React, useState } from "react";
import { useDispatch } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useHistory } from "react-router-dom";
import { addBusiness } from "../actions/index.js";
import NavBarRegisters from "./NavBarRegisters.jsx";
import swal from "sweetalert";
import style from "../styles/RegisterBusiness.module.css";

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
      <div className={style.registerContainer}>
        <Form onSubmit={(e) => handleSubmit(e)}>
          <Form.Group className="mb-3">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              value={input.email}
              name="email"
              id="email"
              required
              className={style.field}
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
              className={style.field}
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
              className={style.field}
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
              className={style.field}
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
              className={style.field}
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
              className={style.field}
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
              className={style.field}
              placeholder="Ingresa tu direccion"
              onChange={(e) => handleChange(e)}
            />
          </Form.Group>
          <div>
            <button
              variant="primary"
              className={style.buttonRegister}
              type="submit"
            >
              Submit
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default RegisterBusiness;
