import React, { useState } from "react";
import {useDispatch, useSelector} from 'react-redux';
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import NavBarLanding from "./NavBarLanding";
import { changePassword, recoverPassword, cleanRecoverPassword } from '../actions/index';
import swal from "sweetalert";


export default function RecuperarContrasenia(props) {

const recuperandoContraseña = useSelector((state) => state.recuperandoContraseña);
console.log(recuperandoContraseña)


  const [input,setInput] = useState({
    passwordN:''
  })
  const dispatch= useDispatch();

  const handleBack = (event) => {
    event.preventDefault();
    props.history.goBack();
  };

  function handleSubmit(e){
    e.preventDefault();
    dispatch(changePassword(recuperandoContraseña, input));
    swal('Su contraseña se modificó correctamente',"", "success")
    dispatch(cleanRecoverPassword())
  };
  function handleChange(e){
    setInput({
      ...input,
      [e.target.name]:e.target.value
    })
  }



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
                {/*<Form.Group className="mb-3">
                  <Form.Label>Contraseña actual</Form.Label>
                  <Form.Control
                    placeholder="Ingresa tu contraseña antigua"
                    type="password"
                    value={input.passwordV}
                    name="passwordV"
                    required
                    onChange={(e) => handleChange(e)}
                  />
                </Form.Group>*/}
                 <Form.Group className="mb-3">
                  <Form.Label>Contraseña nueva</Form.Label>
                  <Form.Control
                    placeholder="Ingresa tu contraseña nueva"
                    type="password"
                    // value={input.passwordN}
                    // name="passwordN"
                    required
                    // onChange={(e) => handleChange(e)}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Repite contraseña nueva</Form.Label>
                  <Form.Control
                    placeholder="Ingresa tu contraseña nueva"
                    type="password"
                    value={input.passwordN}
                    name="passwordN"
                    required
                    onChange={(e) => handleChange(e)}
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
                  <Button type="submit">Confirmar</Button>
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
	)
}