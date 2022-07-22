import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import style from "../styles/RegisterUser.module.css";

function RegisterBusiness() {
  return (
    <div>
      <div className={style.divContainer}>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Empresa nombre </Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese el nombre de la empresa"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Cuit</Form.Label>
            <Form.Control type="number" placeholder="Ingrese su nombre" />
          </Form.Group>
          <Form.Select className="mt-5" aria-label="Default select example">
            <option>Selecciona tu pronvincia</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </Form.Select>
          <Form.Group className="mb-3">
            <Form.Label>Direccion</Form.Label>
            <Form.Control type="text" placeholder="Ingresa tu direccion" />
          </Form.Group>
          {/* <Form.Group className="mb-3">
          <Form.Label>Logo</Form.Label>
          <Form.Control type="date" placeholder="Fecha de nacimiento"/>
        </Form.Group> */}

          <Button variant="primary" className="mt-5" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default RegisterBusiness;
