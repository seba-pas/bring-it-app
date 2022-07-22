import { useHistory } from "react-router-dom";
import { addUser } from "../actions/index.js";
import { React, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useDispatch } from "react-redux";

import style from "../styles/RegisterUser.module.css";

function RegisterUser() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [errors, setErrors] = useState({});
  const [input, setInput] = useState({
    email: "",
    password: "",
    nombre: "",
    apellido: "",
    fechaNacimiento: "",
    nacionalidad: [],
  });

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (
      input.email !== "" &&
      input.password !== "" &&
      input.nombre !== "" &&
      input.apellido !== "" &&
      input.fechaNacimiento !== "" &&
      input.nacionalidad.length !== 0
    ) {
      dispatch(console.log(addUser(input)));
      alert("El usuario fue creada con exito!");
      setInput({
        email: "",
        password: "",
        nombre: "",
        apellido: "",
        fechaNacimiento: "",
        nacionalidad: [],
      });
      history.push("/persona");
    } else {
      alert("¡Faltan los elementos necesarios!");
    }
  }
  return (
    <div className={style.divContainer}>
      <Form onSubmit={(e) => handleSubmit(e)}>
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
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ingrese su nombre"
            onChange={(e) => handleChange(e)}
            value={input.nombre}
            name="nombre"
            id="nombre"
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Apellido</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ingrese su apellido"
            onChange={(e) => handleChange(e)}
            value={input.apellido}
            name="apellido"
            id="apellido"
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Fecha nacimiento</Form.Label>
          <Form.Control
            type="date"
            placeholder="Fecha de nacimiento"
            onChange={(e) => handleChange(e)}
            value={input.fechaNacimiento}
            name="fechaNacimiento"
            id="fechaNacimiento"
            required
          />
        </Form.Group>
        <Form.Select className="mt-5" aria-label="Default select example">
          <option>Selecciona tu nacionalidad</option>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </Form.Select>

        <Button variant="primary" className="mt-5" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default RegisterUser;
