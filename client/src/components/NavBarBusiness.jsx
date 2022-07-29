import React, { useEffect, useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import styles from "../styles/NavBar.module.css"


import { useDispatch, useSelector } from 'react-redux';
import { getAllBusiness, getCategories } from '../actions';
import logo from "./img/logoCUT.png";
import userProfile from "./img/userPerfilImage.jpg";


export default function NavBarusiness() {
    const gState = useSelector((state) => state);
    const dispatch = useDispatch();
    const history = useHistory();




    useEffect(() => {
        dispatch(getAllBusiness());
        dispatch(getCategories());
    }, [dispatch]);

    const [input, setInput] = useState({
        perfil: "",
        products: [],
        businessInfo: {},
    });

    useEffect(() => {
        setInput((prevInput) => {
            return {
                ...prevInput,
                businessInfo: { ...gState.businessEditInfo },
                products: gState.allProducts.filter(e => e.businessEmail === gState.businessEditInfo.email),
            }
        })
    }, [gState]);



    useEffect(() => {
        if (input.perfil === "email") history.push("/perfil");
        else if (input.perfil === "close") history.push("/");
    }, [input.perfil]);


    const handleOnChange = (event) => {
        event.preventDefault();
        setInput((prevInput) => {
            return {
                ...prevInput,
                [event.target.name]: event.target.value,
            }
        });
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
            <div className={styles.perfil}>
                <img
                    src={input.businessInfo.logo ? input.businessInfo.logo : userProfile}
                    style={{ width: "110px", height: "110px", borderRadius: "150px", border: "solid 4px transparent", }}
                    alt="Logo no encontrado"
                />

                <select className={styles.selectPerfil} name="perfil" value="perfil" onChange={(e) => handleOnChange(e)}>
                    <option value="">{input.perfil} </option>

                    <option value="email">{input.businessInfo.email}</option>
                    <option value="close">Cerrar sesión</option>

                </select>
            </div>

        </div>
    )
}