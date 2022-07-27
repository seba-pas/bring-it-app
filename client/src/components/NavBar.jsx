import {React, useEffect,useState} from "react";
import { NavLink,useHistory  } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import styles from "../styles/NavBar.module.css";
import SearchBar from "./SearchBar"; //AGREGAR
import logo from "./img/logoCUT.png";
import { getUsers } from "../actions";
import userProfile from "./img/userPerfilImage.jpg";


//seba
export default function NavBar() {
  const gState = useSelector((state) => state);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

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
      <div>
      <SearchBar/>
      </div>
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
    </div>
  );
}
