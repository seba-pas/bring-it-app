import React, { useEffect, useState } from 'react'
import { IoArrowForward, IoChevronBackSharp, IoChevronForwardOutline, IoMenu } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { addTravel, getAllCities, getAllProvinces, getAllTravel } from '../actions';

import styles from '../styles/FormTravel.module.css';

function FormTravel() {


    const gState = useSelector((state) => state);
    const dispatch = useDispatch();
    const history = useHistory()

    // const emailState = gState.user.others.dataValues.email;
    // const emailState = "tomas@gmail.com";


    useEffect(() => {
        dispatch(getAllProvinces());
        dispatch(getAllCities());
    }, [dispatch]);

    let [input, setInput] = useState({
        sidebar: false,
        originProvince: "",
        originCity: "",
        dateTravel: "",
        arrivalProvince: "",
        arrivalCity: "",
        dateArrival: "",
    })

    let onClickHandler = (event) => {
        event.preventDefault();
       
        setInput((prevInput) => {
            return {
                ...prevInput,
                sidebar: !input.sidebar,
            }
        })
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

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(
            addTravel(
                {
                    travelProvince: input.originProvince,
                    arrivalProvince: input.arrivalProvince,
                    startDate: input.dateTravel,
                    arrivalDate: input.dateArrival,
                    userEmail: emailState,
                    travelCityId: input.originCity,
                    arrivalCityId: input.arrivalCity,

                }
            )
        )

        swal("Que tengas un excelente viaje!", "viaje agregado satisfactoriamente!", "success");


    }


    return (
        <div className={`${input.sidebar ? styles.sidebaron : styles.sidebaroff}`}>

            <button className={`${input.sidebar ? styles.btnon : styles.btnoff}`} onClick={(event) => onClickHandler(event)}>{input.sidebar ? <IoChevronBackSharp /> : <IoChevronForwardOutline />}</button>

            <ul className={styles.navList}>
                <li style={{ listStyle: "none" }}>
                    <span className={`${input.sidebar ? styles.whereSpan : styles.displaynone}`}>¿A dónde viajas? </span>
                    <span className={`${input.sidebar ? styles.fromSpan : styles.displaynone}`}>Desde: </span>
                    <select className={`${input.sidebar ? styles.inputFromProvince : styles.displaynone}`} name="originProvince" value={input.originProvince} onChange={(e) => handleInputChange(e)}>
                        <option value="">{"Provincia"} </option>
                        {
                            gState.provinces?.map(e => <option key={e.id} value={e.nombre}>{e.nombre}</option>)
                        }
                    </select>

                    <select className={`${input.sidebar ? styles.inputFromCity : styles.displaynone}`} name="originCity" value={input.originCity} onChange={(e) => handleInputChange(e)}>
                        <option value="">{"Ciudad"} </option>
                        {
                            input.originProvince ? gState.allCities?.filter(e => e.provinceId === gState.provinces?.filter(e => e.nombre === input.originProvince)[0].id)?.map(e => <option key={e.id} value={e.id}>{e.nombre}</option>) : ""
                        }
                    </select>

                    <span className={`${input.sidebar ? styles.dateTravelSpan : styles.displaynone}`}>Fecha de partida: </span>
                    <input
                        className={`${input.sidebar ? styles.inputDateTravel : styles.displaynone}`}
                        type="date"
                        name="dateTravel"
                        value={input.dateTravel}
                        placeholder="Date"
                        onChange={handleInputChange}
                    />
                    <span className={`${input.sidebar ? styles.toSpan : styles.displaynone}`}>Hacia: </span>
                    <select className={`${input.sidebar ? styles.inputToProvince : styles.displaynone}`} name="arrivalProvince" value={input.arrivalProvince} onChange={(e) => handleInputChange(e)}>
                        <option value="">{"Provincia"} </option>
                        {
                            gState.provinces?.map(e => <option key={e.id} value={e.nombre}>{e.nombre}</option>)
                        }
                    </select>
                    <select className={`${input.sidebar ? styles.inputToCity : styles.displaynone}`} name="arrivalCity" value={input.arrivalCity} onChange={(e) => handleInputChange(e)}>
                        <option value="">{"Ciudad"} </option>
                        {
                            input.arrivalProvince ? gState.allCities?.filter(e => e.provinceId === gState.provinces?.filter(e => e.nombre === input.arrivalProvince)[0].id)?.map(e => <option key={e.id} value={e.id}>{e.nombre}</option>) : ""
                        }
                    </select>

                    <span className={`${input.sidebar ? styles.arrivaldateSpan : styles.displaynone}`}>Fecha de llegada:</span>
                    <input
                        className={`${input.sidebar ? styles.inputDate : styles.displaynone}`}
                        type="date"
                        name="dateArrival"
                        value={input.dateArrival}
                        placeholder="Fecha"
                        onChange={handleInputChange}
                    />

                    <button className={`${input.sidebar ? styles.btnadd : styles.displaynone}`} onClick={(event) => handleSubmit(event)}>Agregar</button>
                </li>
            </ul>





            {/* </div> */}
        </div >
    )
}

export default FormTravel