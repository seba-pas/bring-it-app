import { React, useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";
import styles from "../styles/PerfilBusiness.module.css";

import { editUser } from "../actions";

function PerfilUser(props) {
  const gState = useSelector((state) => state);
  const dispatch = useDispatch();

  const emailState = gState.email;
  const infoUser = gState.user;

  const [input, setInput] = useState({
    email: infoUser.others.dataValues.email,
    password: infoUser.others.dataValues.password,
    name: infoUser.others.dataValues.name,
    lastname: infoUser.others.dataValues.lastname,
    phone: infoUser.others.dataValues.phone,
    arrayInfo: [],
  });

  useEffect(() => {}, [
    input.email,
    input.password,
    input.name,
    input.lastname,
    input.phone,
  ]);

  const handleInputChange = (event) => {
    event.preventDefault();
    setInput((prevInput) => {
      return {
        ...prevInput,
        [event.target.name]: event.target.value,
      };
    });
  };
  const handleBack = (event) => {
    event.preventDefault();
    props.history.goBack();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(
      editUser(input.email, {
        password: input.password,
        name: input.name,
        lastname: input.lastname,
        phone: input.phone,

        arrayInfo: [],
      })
    );
    swal("Buen trabajo!", "Editado satisfactoriamente!", "success");
  };
  return (
    <div className={styles.PerfilBusiness}>
      <Container>
        <h1 className="shadow-sm text-success mt-5 p-3 text-center rounded">
          Editar Usuario
        </h1>
        <Row>
          <Col
            lg={8}
            md={6}
            sm={12}
            className="text-center p-5 m-auto shadow-sm rounded-lg"
          >
            <Form onSubmit={handleSubmit}>
              {/* <Form.Label className={styles.emailContainer}>
                {input.email}
              </Form.Label> */}
              <Row>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control
                      placeholder="Nombre"
                      type="text"
                      name="name"
                      value={input.name}
                      onChange={handleInputChange}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Form.Group className="mb-3">
                <Form.Label>Apellido:</Form.Label>
                <Form.Control
                  type="text"
                  name="lastname"
                  value={input.lastname}
                  placeholder="Apellido"
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Número de contacto</Form.Label>
                <Form.Control
                  type="text"
                  value={input.phone}
                  name="phone"
                  id="phone"
                  required
                  placeholder="Ingresa tu nuevo número de contacto"
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Row>
                <Col
                  lg={6}
                  md={6}
                  sm={12}
                  className="text-center p-5 m-auto shadow-sm rounded-lg"
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Button onClick={(e) => handleBack(e)}>Atras</Button>
                  <Button type="submit">Listo</Button>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
        <h6 className="mt-5 p-5 text-center text-secondary ">
          © 2022 Bring it. All Rights Reserved | Design by Grupo 8 Soy Henry
        </h6>
      </Container>
    </div>
  );
}

export default PerfilUser;

// email: "",
//     password: "",
//     confirmPassword: "",
//     name: "",
//     lastname: "",
//     birthDate: "",
