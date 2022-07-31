import { React, useEffect, useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styles from "../styles/NavBar.module.css";
import SearchBar from "./SearchBar"; //AGREGAR
import logo from "./img/logoCUT.png";
import { getUsers, getCart, clearCart } from "../actions";
import userProfile from "./img/userPerfilImage.jpg";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.css";
import Button from "react-bootstrap/Button";
import Cart from "./Cart";
import { getAllProducts } from "../actions";

export default function NavBarProvince() {
  const stateCart = useSelector((state) => state.cart);
  const gState = useSelector((state) => state);
  const dispatch = useDispatch();
  const history = useHistory();
  const [show, setShow] = useState(false);
  const [input, setInput] = useState({
    perfil: "",
    user: {},
  });

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
    if (input.perfil === "email") history.push("/perfilUser");
    if (input.perfil === "misViajes") history.push("/persona/misviajes");
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

  return (
    <div className={styles.navbar}>
      <div className={styles.imagen}>
        <NavLink to='/'>
        <img
          src={logo}
          style={{ width: "auto", height: "100px" }}
          alt="Logo no encontrado"
        />
        </NavLink>
      </div>
      <SearchBar />
      <ul className="navbar-right">
        <li
          style={{
            listStyle: "none",
            color: "#d2691E",
            fontSize: "18px",
            margin: "3px",
            marginTop: "35px",
          }}
        >
          <button onClick={handleShow}>
            <i
              className="fa fa-shopping-cart"
              style={{ color: "#d2691e", fontSize: "30px", margin: "3px" }}
            ></i>{" "}
            <span
              style={{ color: "#D2691E", margin: "5px", fontSize: "18px" }}
              className="badge"
            >
              {stateCart.length}
            </span>
          </button>

          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Productos seleccionados</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Cart />
            </Modal.Body>
            <Modal.Footer>
              <Button variant="danger" onClick={handleClose} className='btn btn-primary'>
                Close
              </Button>
            </Modal.Footer>
          </Modal>

          {/* </a> */}
        </li>
      </ul>
      <NavLink to="/persona">
        <button className={styles.boton}>Ver todos los productos</button>
      </NavLink>
      <div>
        <select
          className={styles.selectPerfil}
          name="perfil"
          value="perfil"
          onChange={(e) => handleOnChange(e)}
        >
          <option value="">{input.perfil} </option>

          {/* <option value="email">{gState.user.others.dataValues.email}</option> */}
          <option value="misViajes">Mis Viajes</option>
          <option value="close">Cerrar sesión</option>
        </select>
      </div>
    </div>
  );
}
