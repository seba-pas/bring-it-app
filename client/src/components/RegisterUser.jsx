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
    name: "",
    lastName: "",
    age: "",
    nationality: [],
  });

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  }
  function handleSelect(e) {
    if (!input.nationality.includes(e.target.value)) {
      setInput({
        ...input,
        nationality: [...input.nationality, e.target.value],
      });
    } else {
      setInput({
        ...input,
      });
    }
    if (input.nationality.length === 3) {
      alert("¡El perro no puede tener más de tres nationalityos!");
    } else if (input.nationality.length < 3) {
      setInput({
        ...input,
        nationality: [...input.nationality, e.target.value],
      });
    }
  }
  function handleSubmit(e) {
    e.preventDefault();
    if (
      input.email !== "" &&
      input.password !== "" &&
      input.name !== "" &&
      input.lastName !== "" &&
      input.age !== "" &&
      input.nationality.length !== 0
    ) {
      dispatch(console.log(addUser(input)));
      alert("El usuario fue creada con exito!");
      setInput({
        email: "",
        password: "",
        name: "",
        lastName: "",
        age: "",
        nationality: [],
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
            value={input.lastName}
            name="lastName"
            id="lastName"
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Fecha nacimiento</Form.Label>
          <Form.Control
            type="date"
            placeholder="Fecha de nacimiento"
            onChange={(e) => handleChange(e)}
            value={input.age}
            name="age"
            id="age"
            required
          />
        </Form.Group>
        <Form.Select
          className="mt-5"
          aria-label="Default select example"
          onChange={(e) => handleSelect(e)}
        >
          {nationality.map((nation) => (
            <option value={nation.name} key={nation.id}>
              {nation.name}
            </option>
          ))}
        </Form.Select>

        <Button variant="primary" className="mt-5" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default RegisterUser;
