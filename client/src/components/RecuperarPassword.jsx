import React from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import NavBarLanding from "./NavBarLanding";

function RecuperarPassword() {
  return (
    <div>
      <NavBarLanding/>
      <div>
        <Container>
          <h1 className="shadow-sm text-success mt-5 p-3 text-center rounded">
            Recuperar contraseña
          </h1>
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
                  <Form.Label>Contraseña nueva</Form.Label>
                  <Form.Control
                    placeholder="Ingresa tu contraseña nueva"
                    type="password"
                    /* value={input.email} */
                    /* name="email"
                    id="email" */
                    required
                    // onChange={(e) => handleChange(e)}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Repite contraseña nueva</Form.Label>
                  <Form.Control
                    placeholder="Ingresa tu contraseña nueva"
                    type="password"
                    /* value={input.email} */
                    /* name="email"
                    id="email" */
                    required
                    // onChange={(e) => handleChange(e)}
                  />
                </Form.Group>
                <Button
                  variant="primary"
                  className="mt-3 mb-5 w-100 mt-3"
                  type="submit"
                >
                  CONFIRMAR CAMBIO DE PASSWORD
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

export default RecuperarPassword;
