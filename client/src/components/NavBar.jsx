import { React, useEffect, useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styles from "../styles/NavBar.module.css";
import SearchBar from "./SearchBar"; //AGREGAR
import logo from "./img/logoCUT.png";
import { getUsers } from "../actions";
import userProfile from "./img/userPerfilImage.jpg";
import "bootstrap/dist/css/bootstrap.css";
import Cart from "./Cart";
import { getAllProducts } from "../actions";

//seba
export default function NavBar() {
  const [search, setSearch] = useState('');
  const gState = useSelector((state) => state);
  const stateCart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);
  const [opening, setOpening] = useState(false)
  const [input, setInput] = useState({
    perfil: "",
    user: {},
  });

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
    else if (input.perfil === "close") history.push("/");
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

  function onClick(e) {
    e.preventDefault();
    dispatch(getAllProducts())
  }

  return (
    <div className={styles.navbar}>
      <div className={styles.imagen}>
        <NavLink exact to="/">
          <img
            src={logo}
            style={{ width: "auto", height: "100px" }}
            alt="Logo no encontrado"
          />
        </NavLink>
      </div>
      <div className={styles.search}>
        <SearchBar />
      </div>
      <ul className="navbar-right">
        <li style={{listStyle: "none"}}>
          {/* <a href="#" id="cart" > */}
            
            <i className="fa fa-shopping-cart" onClick={() => setOpening(!opening)}>Cart </i>{' '}
            <span style={{ color: "black" }} className="badge">
              {stateCart.length}
            </span> 
            {opening &&
            <Cart/>}
          {/* </a> */}
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

        <select
          className={styles.selectPerfil}
          name="perfil"
          value="perfil"
          onChange={(e) => handleOnChange(e)}
        >
          <option value="">{input.perfil} </option>

          <option value="email">{input.user.email}</option>
          <option value="close">Cerrar sesión</option>
        </select>
      </div>
      <div>
        <button onClick={(e) => onClick(e)}>Volver</button>
      </div>
    </div>
  );
}
