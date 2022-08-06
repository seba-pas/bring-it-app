import React from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import NavBarLanding from "./NavBarLanding";

function RecuperarPasswordBusiness(props) {
  const handleBack = (event) => {
    event.preventDefault();
    props.history.goBack();
  };
  return (
    <div>
      {/* <NavBarLanding/> */}
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
                  <Form.Label>Contraseña anterior</Form.Label>
                  <Form.Control
                    placeholder="Ingresa tu contraseña antigua"
                    type="password"
                    /* value={input.email} */
                    /* name="email"
                    id="email" */
                    required
                    // onChange={(e) => handleChange(e)}
                  />
                </Form.Group>
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
                <Row>
                <Col
                  lg={6}
                  md={6}
                  sm={12}
                  className="text-center p-5 m-auto shadow-sm rounded-lg"
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Button style={{width:"60%", marginRight:"10px"}} onClick={(e) => handleBack(e)}>Atras</Button>
                  <Button type="submit">Confirmar compra</Button>
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

export default RecuperarPasswordBusiness;
