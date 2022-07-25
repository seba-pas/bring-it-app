import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { editBusiness, getAllBusiness, getAllProvinces, getCities } from '../actions';
import styles from "../styles/PerfilBusiness.module.css";
import swal from "sweetalert";


function PerfilBusiness(props) {
    const dispatch = useDispatch();
    const gState = useSelector((state) => state);
    const emailState = gState.businessEmail;
    const infoBusiness = gState.businessEditInfo;


    useEffect(() => {
        dispatch(getAllProvinces());
        dispatch(getCities());
    }, [dispatch]);



    const [input, setInput] = useState({
        email: infoBusiness.email,
        businessName: infoBusiness.businessName,
        password: infoBusiness.password,
        address: infoBusiness.address,
        city: infoBusiness.city.nombre,
        cuit: infoBusiness.cuit,
        logo: infoBusiness.logo,
        province: infoBusiness.province,
        taxBracket: infoBusiness.taxBracket,
        arrayInfo: [],
    })



    const [error, setError] = useState({
        errorbusinessName: "",
        errorpassword: "",
        erroraddress: "",
        errorcity: "",
        errorcuit: "",
        errorlogo: "",
        errorprovince: "",
        errortaxBracket: "",
    });
    const validate = () => {
        let errorbusinessName = "";
        let errorpassword = "";
        let erroraddress = "";
        let errorcity = "";
        let errorcuit = "";
        let errorlogo = "";
        let errorprovince = "";

        if (!/^[a-zA-Z ]{0,30}$/.test(input.businessName) || input.businessName[0] === " " || input.businessName === "") errorbusinessName = "Debe ingresar el nombre del producto";
        if (!/^[a-zA-Z0-9 ]{0,30}$/.test(input.password) || input.password[0] === " " || input.password === "") errorpassword = "Debe ingresar una contraseña";
        if (!/^[a-zA-Z0-9 ]{0,30}$/.test(input.address) || input.address[0] === " " || input.address === "") erroraddress = "Debe ingresar una direccion";
        if (!/^[a-zA-Z0-9 ]{0,30}$/.test(input.errorcity) || input.errorcity[0] === " " || input.errorcity === "") errorcity = "Debe ingresar una ciudad";
        if (!/^[a-zA-Z0-9 ]{0,30}$/.test(input.errorcuit) || input.errorcuit[0] === " " || input.errorcuit === "") errorcuit = "Debe ingresar un cuit";
        if (!/^[a-zA-Z0-9 ]{0,30}$/.test(input.errorlogo) || input.errorlogo[0] === " " || input.errorlogo === "") errorlogo = "Debe ingresar un logo";
        if (!/^[a-zA-Z0-9 ]{0,30}$/.test(input.errorprovince) || input.errorprovince[0] === " " || input.errorprovince === "") errorprovince = "Debe ingresar una province";

        setError((prevInput) => {
            return {
                errorbusinessName: errorbusinessName,
                errorpassword: errorpassword,
                erroraddress, erroraddress,
                errorcity, errorcity,
                errorcuit, errorcuit,
                errorlogo, errorlogo,
                errorprovince, errorprovince,

            }
        });


    }




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
        dispatch(editBusiness(input.email, {

            password: input.password,
            businessName: input.businessName,
            cuit: input.cuit,
            taxBracket: input.taxBracket,
            logo: input.logo,
            province: input.province,
            address: input.address,
            city: infoBusiness.city,
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
                <div className={styles.nameContainer}>
                    <label htmlFor='businessName'>Empresa:</label>
                    <input
                        // className={}
                        type="text"
                        name="businessName"
                        value={input.businessName}
                        placeholder="Nombre"
                        onChange={handleInputChange}
                    />
                    {/* {!error.errorProduct ? <h3><pre>    {null}                                          </pre></h3> : <h3><pre>          {error.errorProduct}             </pre></h3>} */}
                    {!error.errorbusinessName ? <label> </label> : <label>          {error.errorbusinessName}             </label>}
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
                    {!error.errorpassword ? <label> </label> : <label>          {error.errorpassword}             </label>}
                </div>
                <div className={styles.addressContainer}>
                    <label htmlFor='address'>Dirección:</label>
                    <input
                        // className={}
                        type="text"
                        name="address"
                        value={input.address}
                        placeholder="Address"
                        onChange={handleInputChange}
                    />
                    {/* {!error.errorProduct ? <h3><pre>    {null}                                          </pre></h3> : <h3><pre>          {error.errorProduct}             </pre></h3>} */}
                    {!error.erroraddress ? <label> </label> : <label>          {error.erroraddress}             </label>}
                </div>
                <div className={styles.cityContainer}>
                    <label htmlFor='city'>Ciudad:</label>
                    <select name="city" value={input.city} onChange={(e) => handleInputChange(e)}>
                        <option value="">{ } </option>

                        {
                            // gState.cities?.map(e => <option key={e.id} value={e.nombre}>{e.nombre}</option>)
                            gState.cities?.filter(e => e.provinceId === gState.provinces?.filter(e => e.nombre === input.province)[0].id)?.map(e => <option key={e.id} value={e.nombre}>{e.nombre}</option>)
                        }
                    </select>

                </div>
                <div className={styles.cuitContainer}>
                    <label htmlFor='cuit'>Cuit:</label>
                    <input
                        // className={}
                        type="text"
                        name="cuit"
                        value={input.cuit}
                        placeholder="Cuit"
                        onChange={handleInputChange}
                    />
                    {/* {!error.errorProduct ? <h3><pre>    {null}                                          </pre></h3> : <h3><pre>          {error.errorProduct}             </pre></h3>} */}
                    {!error.errorcuit ? <label> </label> : <label>          {error.errorcuit}             </label>}
                </div>
                <div className={styles.logoContainer}>
                    <label htmlFor='logo'>Logo:</label>
                    <input
                        // className={}
                        type="text"
                        name="logo"
                        value={input.logo}
                        placeholder="Logo"
                        onChange={handleInputChange}
                    />
                    {/* {!error.errorProduct ? <h3><pre>    {null}                                          </pre></h3> : <h3><pre>          {error.errorProduct}             </pre></h3>} */}
                    {!error.errorlogo ? <label> </label> : <label>          {error.errorlogo}             </label>}
                </div>
                <div className={styles.logoProvince}>
                    <label htmlFor='province'>Provincia:</label>
                    <select name="province" value={input.province} onChange={(e) => handleInputChange(e)}>
                        <option value="">{ } </option>
                        {
                            gState.provinces?.map(e => <option key={e.id} value={e.nombre}>{e.nombre}</option>)
                        }
                    </select>

                </div>
                <div className={styles.taxBracketContainer}>
                    <label htmlFor='taxBracket'>taxBracket:</label>
                    <select name="taxBracket" value={input.taxBracket} onChange={(e) => handleInputChange(e)}>
                        <option value="">{input.taxBracket} </option>
                        <option value="Categoría tributaria 1">Categoría tributaria 1</option>
                        <option value="Categoría tributaria 2">Categoría tributaria 2</option>
                        <option value="Categoría tributaria 3">Categoría tributaria 3</option>
                    </select>
                </div>
                <div className={styles.subButton}>
                    <button className={styles.btn} type="submit" disabled={error.errorbusinessName || error.errorpassword || error.erroraddress || error.errorcity || error.errorcuit || error.errorlogo || error.errorprovince}>
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

export default PerfilBusiness

