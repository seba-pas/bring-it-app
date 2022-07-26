import React from "react";
import { NavLink, useHistory } from "react-router-dom";
import image from "../components/img/logoCUT.png";
import styles from "../styles/NavBar.module.css";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

export default function NavBarusiness() {
    const gState = useSelector((state) => state);
    const history = useHistory();
    const [input, setInput] = useState({

        perfil: "",
        allProducts: [],

    });
    const handleOnChange = (event) => {
        event.preventDefault();
        setInput((prevInput) => {
            return {
                ...prevInput,

                [event.target.name]: event.target.value,
            }
        });
    }
    useEffect(() => {

        if (input.perfil === "email") history.push("/perfil");  //   console.log("click en", input.perfil, " ", input.businessEmailState)
        else if (input.perfil === "close") history.push("/");  //   console.log("click en", input.perfil, " ", input.businessEmailState)
    }, [input.perfil]);

    useEffect(() => {
        setInput((prevInput) => {
            return {
                ...prevInput,
                businessEmailState: gState.businessEmail,
            }
        })
    }, [gState.businessEmail]);

    return (
        <div className={styles.navbar}>
          <div className={styles.imagen}>
            <NavLink exact to="/">
              <img
                src={image}
                style={{ width: "auto", height: "100px" }}
                alt="Logo no encontrado"
              />
            </NavLink>
          </div>
          <div className={styles.perfil}>
                        <img
                            src={gState.logo ? gState.logo : "https://p16-va-default.akamaized.net/img/musically-maliva-obj/1665282759496710~c5_720x720.jpeg"}
                            style={{ width: "100px", height: "100px", borderRadius: "150px", border: "solid 4px #41d4cf" }}
                            alt="Logo no encontrado"
                            />

                        <select className={styles.selectPerfil} name="perfil" value="perfil" onChange={(e) => handleOnChange(e)}>
                            {/* <option value="">{input.perfil} </option> */}
                            {/* <option value=""></option> */}
                            <option defaultValue="email">{input.businessEmailState}</option>
                            <option value="close">Cerrar sesión</option>

                        </select>
                    </div>

    </div>
  )
}