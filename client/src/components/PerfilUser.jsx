import { React, useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";
import styles from "../styles/PerfilBusiness.module.css";

import { editUser, cleanPutUser, getUserByEmail,desactivateUser,cleanUsers ,saveImage} from "../actions";
import { useHistory } from "react-router-dom";


function PerfilUser(props) {
  const gState = useSelector((state) => state);
  const dispatch = useDispatch();
  const history = useHistory();
  const urlImage = useSelector((state) => state.images)

 
  const emailState = gState.email;
  const infoUser = gState.user;
  const tokenUser = gState.userToken;

  const [input, setInput] = useState({
    email: infoUser.email,
    password: infoUser.password,
    name: infoUser.name,
    lastname: infoUser.lastname,
    phone: infoUser.phone,
    arrayInfo: [],
    image: ""
  });


  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const uploadImage = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "Bringit");
    setLoading(true);
    dispatch(saveImage(data));

   
  };

  // NUEVO CELE Y AGUSES PARA MANEJAR LA RTA DE LA RUTA EDITAR (SI HIZO EL CAMBIO, EN POS DE LA AUTORIZACION)
  const putUser = gState.putUser; //xq se llama asi?

  const [didMount, setDidMount] = useState(true);
  useEffect(() => {
    if (didMount) {
      setDidMount(false);
      dispatch(cleanPutUser());
      return;
    } else {
      if (putUser === "clean") {
        return;
      } else if (putUser === "1 Usuarios modificados") {
        swal("Buen trabajo!", "El usuario fue editado con éxito!", "success");
        dispatch(getUserByEmail(infoUser.email));
        dispatch(cleanPutUser());
      }
    }
  }, [putUser]);

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
    if (
      infoUser.email === input.email &&
      infoUser.password === input.password &&
      infoUser.name === input.name &&
      infoUser.lastname === input.lastname &&
      infoUser.phone === input.phone 
    ) {
      swal("No se ha realizado ninguna modificación");
      return;
    }
    dispatch(
      editUser(
        input.email,
        {
          password: input.password,
          name: input.name,
          lastname: input.lastname,
          phone: input.phone,
          image: urlImage,
          arrayInfo: [],
        },
        tokenUser //envio de 3er parametro para enviar los headers en la accion (envio de token al back)
      )
    );
  };
  function handleDesactivate() {
    dispatch(desactivateUser(infoUser.email,tokenUser));
    history.push("/");
    dispatch(cleanUsers());
    
  }
  return (
    <div>
      <Container>
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

              <Form.Group>
                <label for="exampleFile">Logo</label>
                <Form.Control
                  // id="exampleFile"
                  name="image"
                  type="file"
                  // value={input.logo}
                  onChange={uploadImage}
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
                  {/* <Button onClick={(e) => handleBack(e)}>Atras</Button> */}
                  <Button type="submit">Listo</Button>
                  <Button
                    className="btn btn-primary"
                    onClick={(e) => handleDesactivate(e)}
                  >
                    Desactivar Cuenta
                  </Button>
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
