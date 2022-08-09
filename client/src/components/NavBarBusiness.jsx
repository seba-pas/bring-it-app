import React, { useEffect, useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import styles from "../styles/NavBar.module.css";
import { Avatar, AvatarBadge } from '@chakra-ui/avatar';


import { useDispatch, useSelector } from 'react-redux';
import { getAllBusiness, getCategories, desactivateBusiness, cleanBusiness, cleanBusinessState } from '../actions';
import logo from "./img/logo2-removebg-preview.png";
import userProfile from "./img/userPerfilImage.jpg";


export default function NavBarBusiness() {
    const gState = useSelector((state) => state);
    const dispatch = useDispatch();
    const history = useHistory();
    const token = gState.businessToken;
  
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
                products: gState.allProducts ? gState.allProducts.filter(e => e.businessEmail === gState.businessEditInfo.email) : [],
            }
        })
    }, [gState]);



    useEffect(() => {
        if (input.perfil === "email") {
            history.push("/empresas/perfil");
        } else if (input.perfil === "desactivarMiCuenta") {
            dispatch(desactivateBusiness(gState.business.email, token));
            dispatch(cleanBusinessState()); //no se esta limpiando el estado
            history.push('/');
        } else if (input.perfil === "close") { 
            dispatch(cleanBusinessState());
            history.push("/"); 
        }
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
        <div className={styles.navbar} style={{width: '100%',display: 'flex', flexDirection: 'row', flexWrap: 'wrap'}}>
            <div className={styles.imagen}>
                <NavLink exact to="/">
                    <img
                        src={logo}
                        style={{ width: "auto", height: "100%", objectFit: 'cover' }}
                        alt="Logo no encontrado"
                    />
                </NavLink>
            </div>
            <div className={styles.perfil}>
            <Avatar
          size='lg'
            onClick={() => history.push("/empresas/perfil")}
            name={gState.business.businesName}
            src={gState.businessEditInfo.logo}
          >
            <AvatarBadge boxSize="0.08m" bg="springgreen" borderColor='springgreen' />
          </Avatar>
                {/* <img
                    src={input.businessInfo.logo ? input.businessInfo.logo : userProfile}
                    style={{ width: "auto", height: "100px", borderRadius: "150px", border: "solid 4px transparent",marginLeft: '0px' }}
                    alt="Logo no encontrado"
                /> */}

                {/* <select className={styles.selectPerfil} name="perfil" value="perfil" onChange={(e) => handleOnChange(e)} style={{display: 'flex',width: 'auto', marginRight: '50px', marginTop: '33px'}}>
                    <option value="">Mi cuenta</option>
                    <option value="email">{input.businessInfo.email}</option>
                    <option value="desactivarMiCuenta">Desactivar mi cuenta</option>
                    <option value="close">Cerrar sesión</option>

                </select> */}
            </div>

        </div>
    )
}