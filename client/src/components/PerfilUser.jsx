import { React, useEffect, useState } from "react";

import { useDispatch , useSelector } from "react-redux";
import styles from "../styles/PerfilBusiness.module.css";

import { editUser } from '../actions';

function PerfilUser(props) {
    const gState = useSelector((state) => state);
    const dispatch = useDispatch();

    const emailState = gState.email;
    const infoUser = gState.user;
    console.log(infoUser.others.dataValues)
    const [input, setInput] = useState({
        email: infoUser.others.dataValues.email,
        password: infoUser.others.dataValues.password,
        name: infoUser.others.dataValues.name,
        lastname: infoUser.others.dataValues.lastname,
        birthDate: infoUser.others.dataValues.birthDate,
        arrayInfo: [],
    })

    useEffect(() => {
    }, [input.email, input.password, input.name, input.lastname, input.birthDate]);


    const handleInputChange = (event) => {
        event.preventDefault();
        setInput((prevInput) => {
            return {
                ...prevInput,
                [event.target.name]: event.target.value,
            }
        });
    }
    const handleBack = (event) => {
        event.preventDefault();
        props.history.goBack();
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(editUser(input.email, {
            password: input.password,
            name: input.name,
            lastname: input.lastname,
            birthDate: input.birthDate,

            
            arrayInfo: [],
        }))
        swal("Buen trabajo!", "Editado satisfactoriamente!", "success");


    }
    return (
        <div className={styles.PerfilBusiness}>
            <form form className={styles.container} onSubmit={handleSubmit} >
                <div className={styles.emailContainer}>
                    {input.email}
                </div>
                
                <div className={styles.passwordContainer}>
                    <label htmlFor='password'>Password:</label>
                    <input
                        // className={}
                        type="text"
                        name="password"
                        value={input.password}
                        placeholder="Password"
                        onChange={handleInputChange}
                    />
                    {/* {!error.errorProduct ? <h3><pre>    {null}                                          </pre></h3> : <h3><pre>          {error.errorProduct}             </pre></h3>} */}
                </div>
                <div className={styles.nameContainer}>
                    <label htmlFor='name'>Nombre:</label>
                    <input
                        // className={}
                        type="text"
                        name="name"
                        value={input.name}
                        placeholder="Nombre"
                        onChange={handleInputChange}
                    />
                    {/* {!error.errorProduct ? <h3><pre>    {null}                                          </pre></h3> : <h3><pre>          {error.errorProduct}             </pre></h3>} */}
                </div>
                <div className={styles.addressContainer}>
                    <label htmlFor='lastname'>Apellido:</label>
                    <input
                        // className={}
                        type="text"
                        name="lastname"
                        value={input.lastname}
                        placeholder="Apellido"
                        onChange={handleInputChange}
                    />
                    {/* {!error.errorProduct ? <h3><pre>    {null}                                          </pre></h3> : <h3><pre>          {error.errorProduct}             </pre></h3>} */}
                </div>
  
                <div className={styles.subButton}>
                    <button className={styles.btn} type="submit" >
                        Listo
                    </button>
                </div>
                <div className={styles.backButton}>
                    <button className={styles.btn} onClick={e => handleBack(e)}>
                        Atras
                    </button>
                </div>
            </form >

        </div>
    ) 
}

export default PerfilUser

// email: "",
//     password: "",
//     confirmPassword: "",
//     name: "",
//     lastname: "",
//     birthDate: "",