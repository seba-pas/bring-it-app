import { React, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { useHistory } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "../styles/Usuario.module.css";
import { Avatar, AvatarBadge } from "@chakra-ui/react";
import { SpinnerCircularFixed } from "spinners-react";
import PerfilUser from "./PerfilUser";

import {
  desactivateUser,
  cleanUsers,
  cleanBusiness,
  cleanUserState,
  getActiveUser,
  getAllEmail,
  logoutGoogleSession,
  clearCart
} from "../actions";

import swal from "sweetalert";
import UserTravels from "./UserTravels";
import HomeUserPurchase from "./HomeUserPurchase.jsx";
import RecuperarPassword from "./RecuperarPassword.jsx";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Favourites from "./Favourites";

const Usuario = () => {
  const [key, setKey] = useState("home");
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const history = useHistory();
  const business = useSelector((state) => state.business);
  const email = useSelector((state) => state.allEmail);
  const userToken = useSelector((state) => state.userToken);
  // const isBusiness = email.find((e) => e.email == user.email) ? true : false

  useEffect(() => {
    dispatch(getActiveUser());
    dispatch(getAllEmail());
  }, [dispatch]);

  function handleDesactivate(e) {
    e.preventDefault();

    dispatch(desactivateUser(user.email));
    // dispatch(resetInitialState());

    history.push("/");
  }

  function handleCloseSessionBusiness(e) {
    e.preventDefault();
    dispatch(cleanBusiness());
    swal(
      "Tu sesión ha sido cerrada con éxito",
      "Gracias por usar Bring it!",
      "success"
    );
    history.push("/");
  }

  function handleCloseSesion(e) {
    e.preventDefault();
    dispatch(cleanUsers());
    dispatch(cleanUserState());
    dispatch(logoutGoogleSession());
    dispatch(clearCart());
    swal(
      "Tu sesión ha sido cerrada con éxito",
      "Gracias por usar Bring it!",
      "success"
    );
    history.push("/");
  }

  function handleRegisterBusiness(e) {
    e.preventDefault();
    if (!email.includes(user.email)) {
      history.push("/RegisterBusiness");
    } else {
      history.push("/empresas");
    }
  }

  return (
    <div style={{ height: "70vh", background: "white", marginTop: "30vh" }}>
      { user !== "clean" && Object.entries(user).length > 0 ? (

        <div>
          <div>
            <Avatar
              size="lg"
              name={`${user.name} ${user.lastname}`}
              src={user.image}
            >
              <AvatarBadge
                boxSize="0.08m"
                bg="springgreen"
                borderColor="springgreen"
              />
            </Avatar>
          </div>
          <div>
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
            <Tabs
              id="controlled-tab-example"
              activeKey={key}
              onSelect={(k) => setKey(k)}
              /* className="mb-3" */
              justify
            >
              <Tab eventKey="home" title="Datos generales">
                <PerfilUser />
              </Tab>
              <Tab eventKey="profile1" title="Mis compras">
                <HomeUserPurchase />
              </Tab>
              <Tab eventKey="profile2" title="Mis viajes">
                <UserTravels />
              </Tab>
              <Tab eventKey="profile3" title="Modificar contraseña">
                <RecuperarPassword />
              </Tab>
              <Tab eventKey="profile4" title="Mis Favoritos">
                <Favourites />
              </Tab>
            </Tabs>
          </div>

          <div className={styles.contBotones}>
            {/* <button
              className="btn btn-primary"
              onClick={() => history.push("/persona/misviajes")}
            >
              Mis Viajes
            </button> */}
            {/* <button
              className="btn btn-primary"
              onClick={() => history.push("/persona/homeUserPurchase")}
            >
              Mis Compras
            </button> */}
            {/* <button
              className="btn btn-primary"
              onClick={() => history.push("/persona/modificarPassword")}
            >
              Modificar Contraseña
            </button> */}

            {/*{console.log(
              email.find((e) => e.email == user.email) ? true : false
            )}*/}
            {/*{isBusiness ? (
              <button
                className="btn btn-primary"
                onClick={() => history.push("/empresas")}
              >
                Gestionar Productos
              </button>
            ) : (
              <button
                className="btn btn-primary"
                onClick={(e) => handleRegisterBusiness(e)}
              >
                Registrarme como Empresa
              </button>
            )}*/}
          </div>
        </div>
      ) : (
        <div className={styles.spinner}>
          <SpinnerCircularFixed
            size={250}
            thickness={90}
            speed={111}
            color="rgba(140, 82, 255, 1)"
            secondaryColor="rgba(74, 57, 172, 0.3)"
          />
        </div>
      )}
    </div>
  );
};

export default Usuario;
