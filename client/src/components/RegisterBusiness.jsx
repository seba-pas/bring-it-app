import { React, useState } from "react";
import { useDispatch } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useHistory } from "react-router-dom";
import { addUser } from "../actions/index.js";

// import style from "../styles/RegisterBusiness.module.css";

function RegisterBusiness() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [errors, setErrors] = useState({});
  const [input, setInput] = useState({
    email: "",
    password: "",
    empresaNombre: "",
    cuit: "",
    direccion: "",
    provincia: [],
  });

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.name,
      })
    );
  }
  function handleSelect(e) {
    if (!input.provincia.includes(e.target.value)) {
      setInput({
        ...input,
        provincia: [...input.provincia, e.target.value],
      });
    } else {
      setInput({
        ...input,
      });
    }
    if (input.provincia.length === 3) {
      alert("¡El perro no puede tener más de tres provinciaos!");
    } else if (input.provincia.length < 3) {
      setInput({
        ...input,
        provincia: [...input.provincia, e.target.value],
      });
    }
  }
  function handleSubmit(e) {
    e.preventDefault();
    if (
      input.email !== "" &&
      input.password !== "" &&
      input.empresaNombre !== "" &&
      input.cuit !== "" &&
      input.direccion !== "" &&
      input.provincia.length !== 0
    ) {
      dispatch(addUser(input));
      alert("La empresa fue creada con exito!");
      setInput({
        email: "",
        password: "",
        empresaNombre: "",
        cuit: "",
        direccion: "",
        provincia: []
      });
      history.push("/empresas");
    } else {
      alert("¡Faltan los elementos necesarios!");
    }
  }

  return (
    <div>
      <Form>
        <Form.Group
          className="mb-3"
          controlId="formBasicEmail"
          onSubmit={(e) => handleSubmit(e)}
        >
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
        <Form.Group className="mb-3" controlId="formBasicPassword">
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
          <Form.Label>Empresa nombre </Form.Label>
          <Form.Control
            type="text"
            placeholder="Ingrese el nombre de la empresa"
            onChange={(e) => handleChange(e)}
            value={input.empresaNombre}
            name="empresaNombre"
            id="empresaNombre"
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
            placeholder="Ingrese su nombre"
            onChange={(e) => handleChange(e)}
          />
        </Form.Group>
        <Form.Select
          className="mt-5"
          aria-label="Default select example"
          onChange={(e) => handleSelect(e)}
        >
          {provincia.map((prov) => (
            <option value={prov.name} key={prov.id}>
              {prov.name}
            </option>
          ))}
        </Form.Select>
        <Form.Group className="mb-3">
          <Form.Label>Direccion</Form.Label>
          <Form.Control
            type="text"
            value={input.direccion}
            name="direccion"
            id="direccion"
            required
            placeholder="Ingresa tu direccion"
            onChange={(e) => handleChange(e)}
          />
        </Form.Group>

        <Button variant="primary" className="mt-5" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default RegisterBusiness;
