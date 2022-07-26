import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { editBusiness, getAllBusiness, getAllProvinces, getAllCities } from '../actions';
import styles from "../styles/PerfilBusiness.module.css";
import swal from "sweetalert";


function PerfilBusiness(props) {

    const gState = useSelector((state) => state);
    const dispatch = useDispatch();

    const emailState = gState.businessEmail;
    const infoBusiness = gState.businessEditInfo;

    useEffect(() => {
        dispatch(getAllProvinces());
        dispatch(getAllCities());
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

    useEffect(() => {
        validate();
    }, [input.businessName, input.password, input.address, input.city, input.cuit, input.logo, input.province, input.taxBracket]);

    const validate = () => {
        let errorbusinessName = "";
        let errorpassword = "";
        let erroraddress = "";
        let errorcity = "";
        let errorcuit = "";
        let errorlogo = "";
        let errorprovince = "";
        let errortaxBracket = "";


        if (input.businessName[0] === " " || input.businessName === "") errorbusinessName = "Debe escribir el nombre de la empresa";
        if (!/^[a-zA-Z0-9 ]{0,30}$/.test(input.password) || input.password[0] === " " || input.password === "") errorpassword = "Debe ingresar una contraseña";
        //todo para cambiar contraseña ir a otro formulario ?//usar el mismo de tomi

        if (input.address[0] === " " || input.address === "") erroraddress = "Debe ingresar una direccion";
        if (input.city[0] === " " || input.city === "") errorcity = "seleccione  una ciudad";
        if (input.cuit[0] === " " || input.cuit === "") errorcuit = "Debe ingresar un cuit";
        if (input.logo[0] === " " || input.logo === "") errorlogo = "Debe ingresar un logo";
        if (input.province[0] === " " || input.province === "") errorprovince = "Seleccione  una provincia";
        if (input.taxBracket[0] === " " || input.taxBracket === "") errortaxBracket = "seleccione taxBracket";

        setError((prevInput) => {
            return {
                errorbusinessName: errorbusinessName,
                errorpassword: errorpassword,
                erroraddress, erroraddress,
                errorcity, errorcity,
                errorcuit, errorcuit,
                errorlogo, errorlogo,
                errorprovince, errorprovince,
                errortaxBracket, errortaxBracket,

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
                            gState.allCities?.filter(e => e.provinceId === gState.provinces?.filter(e => e.nombre === input.province)[0].id)?.map(e => <option key={e.id} value={e.nombre}>{e.nombre}</option>)
                        }
                    </select>
                    {!error.errorcity ? <label> </label> : <label>          {error.errorcity}             </label>}
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
                    {!error.errorprovince ? <label> </label> : <label>          {error.errorprovince}             </label>}
                </div>
                <div className={styles.taxBracketContainer}>
                    <label htmlFor='taxBracket'>taxBracket:</label>
                    <select name="taxBracket" value={input.taxBracket} onChange={(e) => handleInputChange(e)}>
                        <option value="">{input.taxBracket} </option>
                        <option value="Categoría tributaria 1">Categoría tributaria 1</option>
                        <option value="Categoría tributaria 2">Categoría tributaria 2</option>
                        <option value="Categoría tributaria 3">Categoría tributaria 3</option>
                    </select>
                    {!error.errortaxBracket ? <label> </label> : <label>          {error.errortaxBracket}             </label>}
                </div>
                <div className={styles.subButton}>
                    <button className={styles.btn} type="submit" disabled={error.errorbusinessName || error.errorpassword || error.erroraddress || error.errorcity || error.errorcuit || error.errorprovince || error.errortaxBracket}>
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

