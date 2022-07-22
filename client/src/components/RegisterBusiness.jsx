import { React, useState } from "react";
import { useDispatch } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
// import { useHistory } from "react-router-dom";
// import { addUser } from "../actions/index.js";

// import style from "../styles/RegisterBusiness.module.css";

function RegisterBusiness() {
  

  return (
    <div>
      <Form onSubmit={(e) => handleSubmit(e)}>
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
        <Form.Select className="mt-5" aria-label="Default select example">
          <option>Selecciona tu pronvincia</option>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
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
