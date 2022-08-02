import { React, useEffect, useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styles from "../styles/NavBar.module.css";
import SearchBar from "./SearchBar"; //AGREGAR


import logo from "./img/logo2.png";
import { getUsers, getCart, clearCart , desactivateUser, cleanUsers} from "../actions";


import userProfile from "./img/userPerfilImage.jpg";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.css";
import Button from "react-bootstrap/Button";
import { FaShoppingBag } from "react-icons/fa";
import Cart from "./Cart";
import { getAllProducts } from "../actions";
import { Avatar, AvatarBadge } from "@chakra-ui/react";

//seba
export default function NavBar() {
  const [search, setSearch] = useState("");
  const gState = useSelector((state) => state);
  const stateCart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const history = useHistory();
  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);
  const [opening, setOpening] = useState(false);
  const [input, setInput] = useState({
    perfil: "",
    user: {},
  });

  const userAvatar = gState.user.others.dataValues;
  useEffect(() => {
    dispatch(getCart());
  }, [dispatch]);

  useEffect(() => {
    setInput((prevInput) => {
      return {
        ...prevInput,
        user: { ...gState.user },
      };
    });
  }, [gState]);

  useEffect(() => {
    if (input.perfil === "email") {
      history.push("/perfilUser");
    }
    if (input.perfil === "misViajes") {
      history.push("/persona/misviajes");
    }
    if (input.perfil === "modificarPassword") {
      history.push("/persona/modificarPassword");
    }
    if (input.perfil === "desactivarMiCuenta") {
      dispatch(desactivateUser(input.user.others.dataValues.email));
      dispatch(cleanUsers());
      history.push("/");
    }

    if (input.perfil === "misCompras")
      history.push("/persona/homeUserPurchase");
    else if (input.perfil === "close") {
      dispatch(clearCart());
      history.push("/");
    }
  }, [input.perfil]);

  const handleOnChange = (event) => {
    event.preventDefault();
    setInput((prevInput) => {
      return {
        ...prevInput,
        [event.target.name]: event.target.value,
      };
    });
  };
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function handleClick(e) {
    e.preventDefault();
    history.push("/compra");
  }

  function onClick(e) {
    e.preventDefault();
    dispatch(getAllProducts());
  }

  return (
    <div className={styles.navbar}>
      <div className={styles.imagen}>
        <a onClick={() => history.goBack()} style={{ cursor: "pointer" }}>
          <img
            src={logo}
            style={{ width: "auto", height: "100px" }}
            alt="Logo no encontrado"
          />
        </a>
      </div>
      <div className={styles.search}>
        <SearchBar />
      </div>
      <ul className="navbar-right">
        <li
          style={{
            listStyle: "none",
            color: "#d2691E",
            fontSize: "18px",
            margin: "3px",
            marginTop: "33px",
          }}
        >

          

          <button id={styles.botonCart} onClick={handleShow} style={{backgroundColor: "black", fontSize: '12px', borderColor: '#8c52ff', marginTop: '0px', paddingBottom: '10px', paddingBottom: '10px', marginLeft:'70px'}}>

            {/* <FaShoppingBag/> */}
            <span
              style={{ color: "#D2691E", margin: "0px", fontSize: "18px" }}
              className="badge"
            >
              {"🛒 "}
              {stateCart.length}
            </span>
          </button>

          <Modal show={show} onHide={handleClose} style={{ width: "100%" }}>
            <Modal.Header closeButton>
              <Modal.Title>Productos seleccionados</Modal.Title>
              <span>
                {stateCart.length > 0
                  ? stateCart[0].businessbranch.businessBranchName
                  : ""}
              </span>
            </Modal.Header>
            <Modal.Body>
              <Cart />
            </Modal.Body>
            <Modal.Footer>
              <Button variant="danger" onClick={handleClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </li>
      </ul>
      <div className={styles.perfil}>
        {/* <img
          src={input.user.logo ? input.user.logo : userProfile}
          style={{
            width: "100px",
            height: "100px",
            borderRadius: "150px",
            border: "solid 4px transparent",
          }}
          alt="Logo no encontrado"
        /> */}

        {/* <select
          className={styles.selectPerfil}
          name="perfil"
          value="perfil"
          onChange={(e) => handleOnChange(e)}
          style={{
            marginTop: '33px',
            marginRight: '15px',
            fontSize: '18px',
            cursor:'pointer'

          }}
        >
          <option value="">Mi cuenta</option>
          <option value="misCompras">Mis compras</option>
          <option value="misViajes">Mis Viajes</option>
           <option value="email">Editar mi cuenta</option> 
            <option value="modificarPassword">Modificar contraseña</option>
          <option value="desactivarMiCuenta">Desactivar mi cuenta</option>
          <option value="close">Cerrar sesión</option>


        </select>  */}
        <div
          style={{
            height: "100%",
            paddingTop: "25px",
            paddingRight: "75px",
            cursor: "pointer",
          }}
        >
          <Avatar
            onClick={() => history.push("/usuarioE")}
            name={`${userAvatar.name} ${userAvatar.lastname}`}
            src=""
          >
            <AvatarBadge boxSize="1.25em" bg="green.500" />
          </Avatar>
        </div>
      </div>
      {/* <div>
        <button onClick={(e) => onClick(e)}>Volver</button>
      </div> */}
    </div>
  );
}
