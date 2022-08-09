import React, { useState } from "react";
import { useDispatch } from 'react-redux'
import { recoverPassword } from '../actions/index'
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import NavBarLanding from "./NavBarLanding";

function OlvidastePassword() {

  const [input, setInput] = useState({
    email: ''
  })
  console.log(input)

  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(recoverPassword(input))
  }

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    })
  }

  const history = useHistory();
  return (
    <div>
      <NavBarLanding />
      <div>
        <Container>
          <Row>
            <Col
              lg={8}
              md={6}
              sm={12}
              className="text-center p-5 m-auto shadow-sm rounded-lg"
            >
              {/* <img className="iconImg" src={imgIcon} alt="icon" /> */}
              <Form
                onSubmit={(e) => handleSubmit(e)}
                // className={style.forms}
              >
                <Form.Group className="mb-3">
                  <Form.Label>Ingrese su mail</Form.Label>
                  <Form.Control
                    placeholder="Ingresa su email"
                    type="email"
                    value={input.email}
                    name="email"
                    required
                    onChange={(e) => handleChange(e)}
                  />
                </Form.Group>
                <Row>
                  <Col
                    lg={6}
                    md={6}
                    sm={12}
                    className="text-center p-5 m-auto rounded-lg"
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Button onClick={() => history.goBack()}>Atras</Button>
                    <Button type="submit" style={{marginLeft: "30%"}}>Recuperar</Button>
                    {/* <Button style={{width:"60%", marginRight:"10px"}} onClick={(e) => handleBack(e)}>Atras</Button> */}
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
    </div>
  );
}

export default OlvidastePassword;
