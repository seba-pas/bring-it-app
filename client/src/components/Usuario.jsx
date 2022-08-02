import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { useDispatch } from "react-redux";
import { getActiveUser } from "../actions/index";
import { useHistory } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "../styles/Usuario.module.css";
import { Avatar, AvatarBadge } from "@chakra-ui/react";
import { SpinnerCircularFixed } from "spinners-react";
import { desactivateUser, cleanUsers } from "../actions";
import Tab from "react-bootstrap/Tab";
import RecuperarPassword from "./RecuperarPassword.jsx";
import Tabs from "react-bootstrap/Tabs";
import HomeUserPurchase from "./HomeUserPurchase.jsx";
import UserTravels from "./UserTravels.jsx";

const Usuario = () => {
  const usuario = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const user = usuario.others.dataValues;
  const history = useHistory();
  const [key, setKey] = useState("home");

  useEffect(() => {
    dispatch(getActiveUser());
  }, [dispatch]);

  function handleDesactivate(e) {
    e.preventDefault();
    dispatch(desactivateUser(user.email));
    dispatch(cleanUsers());
    history.push("/");
  }

  function handleCloseSesion(e) {
    e.preventDefault();
    dispatch(cleanUsers());
    history.push("/");
  }
  return (
    <div style={{ height: "70vh", background: "white", marginTop: "5vh" }}>
      {console.log(user)}
      {Object.entries(user).length > 0 ? (
        <div>
          <div>
            <Avatar name={`${user.name} ${user.lastname}`} src="">
              <AvatarBadge boxSize="1.25em" bg="green.500" />
            </Avatar>
          </div>

          <Tabs
            id="controlled-tab-example"
            activeKey={key}
            onSelect={(k) => setKey(k)}
            className="mb-3"
            justify
          >
            <Tab eventKey="home" title="Datos generales">
              <div>
                <h1> {`Hola ${user.name} ${user.lastname} !`}</h1>
                <h1>Mi Email: {user.email}</h1>
                <h1>Mi Fecha De Nacimiento: {user.birthDate}</h1>
                <h1>Mi Número de Teléfono: {user.phone}</h1>
              </div>
              <button
                className="btn btn-primary"
                onClick={(e) => handleCloseSesion(e)}
              >
                Cerrar Sesion
              </button>
            </Tab>
            <Tab eventKey="profile3" title="Modificar contraseña">
              <RecuperarPassword />
            </Tab>
            <Tab eventKey="profile1" title="Mis compras">
              <HomeUserPurchase />
            </Tab>
            <Tab eventKey="profile2" title="Mis viajes">
              <UserTravels />
            </Tab>
          </Tabs>
          {/* <div className={styles.contBotones}>
            <button
              className="btn btn-primary"
              onClick={() => history.push("/persona/misviajes")}
            >
              Mis Viajes
            </button>
            <button
              className="btn btn-primary"
              onClick={() => history.push("/persona/homeUserPurchase")}
            >
              Mis Compras
            </button>
            <button
              className="btn btn-primary"
              onClick={() => history.push("/persona/modificarPassword")}
            >
              Modificar Contraseña
            </button>
            <button
              className="btn btn-primary"
              onClick={() => history.goBack()}
            >
              Volver
            </button>
            <button
              className="btn btn-primary"
              onClick={(e) => handleCloseSesion(e)}
            >
              Cerrar Sesion
            </button>
            <button
              className="btn btn-primary"
              onClick={(e) => handleDesactivate(e)}
            >
              Desactivar Cuenta
            </button>
          </div> */}
        </div>
      ) : (
        <div className={styles.spinner}>
          <SpinnerCircularFixed
            size={250}
            thickness={100}
            speed={100}
            color="rgba(210, 105, 30, 1)"
            secondaryColor="rgba(210, 105, 30, 0.23)"
          />
        </div>
      )}
    </div>
  );
};

export default Usuario;
