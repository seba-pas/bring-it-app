import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import styles from "../styles/HomeBusiness.module.css"
import SoldProductCard from './SoldProductCard';
import ProductCardBusiness from './ProductCardBusiness';
import { useDispatch, useSelector } from 'react-redux';
import { addBusiness, getAllProducts, getProductBusiness } from '../actions';
import logo from "../components/img/logoCUT.png";

function HomeBusiness() {

    const gState = useSelector((state) => state);
    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(getAllProducts());
    }, [dispatch, gState.deleteProduct]);

    const [input, setInput] = useState({

        perfil: "",
        allProducts: [],

    });

    useEffect(() => {
        setInput((prevInput) => {
            return {
                ...prevInput,
                allProducts: gState.allProducts,
            }
        })
    }, [gState.allProducts]);

    useEffect(() => {
        setInput((prevInput) => {
            return {
                ...prevInput,
                businessEmailState: gState.businessEmail,
            }
        })
    }, [gState.businessEmail]);

    const handleOnChange = (event) => {
        event.preventDefault();
        setInput((prevInput) => {
            return {
                ...prevInput,

                [event.target.name]: event.target.value,
            }
        });
    }


    let products = input.allProducts.filter(e => e.businessEmail === input.businessEmailState);


    let soldProducts = [
        {
            id: 1,
            productImage: "https://thumbs.dreamstime.com/b/imagen-del-icono-de-la-u%C3%B1a-del-pulgar-de-la-fotograf%C3%ADa-o-del-bot%C3%B3n-de-la-galer%C3%ADa-de-la-imagen-84717969.jpg",
            productName: "zapatos>",
            amount: 2,
            description: "size:41",
            clientName: "Agustina Eciolaza",
            clientPhone: 555 - 5555 - 5555,
            date: "19-07-22",
            BringerPending: true,
            BringerName: "",
            BringerContact: null,
        },
        {
            id: 2,
            productImage: "https://thumbs.dreamstime.com/b/imagen-del-icono-de-la-u%C3%B1a-del-pulgar-de-la-fotograf%C3%ADa-o-del-bot%C3%B3n-de-la-galer%C3%ADa-de-la-imagen-84717969.jpg",
            productName: "bag",
            amount: 1,
            description: "color:brown",
            clientName: "Cele Chelu",
            clientPhone: 222 - 2222 - 2222,
            date: "18-07-22",
            BringerPending: false,
            BringerName: "Sebastian",
            BringerContact: 333 - 33333 - 333,
        },
        {
            id: 3,
            productImage: "https://thumbs.dreamstime.com/b/imagen-del-icono-de-la-u%C3%B1a-del-pulgar-de-la-fotograf%C3%ADa-o-del-bot%C3%B3n-de-la-galer%C3%ADa-de-la-imagen-84717969.jpg",
            productName: "vino tinto",
            amount: 10,
            description: "asd",
            clientName: "Felipe Aviani",
            clientPhone: 777 - 5555 - 5555,
            date: "07-07-22",
            BringerPending: true,
            BringerName: "",
            BringerContact: null,
        },
        {
            id: 4,
            productImage: "https://thumbs.dreamstime.com/b/imagen-del-icono-de-la-u%C3%B1a-del-pulgar-de-la-fotograf%C3%ADa-o-del-bot%C3%B3n-de-la-galer%C3%ADa-de-la-imagen-84717969.jpg",
            productName: "vino tinto",
            amount: 10,
            description: "asd",
            clientName: "Guillermo Ahrens",
            clientPhone: 777 - 5555 - 5555,
            date: "07-07-22",
            BringerPending: false,
            BringerName: "Agustín Farias",
            BringerContact: 3213 - 5445 - 55,
        },
        {
            id: 5,
            productImage: "https://thumbs.dreamstime.com/b/imagen-del-icono-de-la-u%C3%B1a-del-pulgar-de-la-fotograf%C3%ADa-o-del-bot%C3%B3n-de-la-galer%C3%ADa-de-la-imagen-84717969.jpg",
            productName: "reloj",
            amount: 10,
            description: "asd",
            clientName: "Tomas Gelvez",
            clientPhone: 777 - 5555 - 5555,
            date: "07-07-22",
            BringerPending: true,
            BringerName: "",
            BringerContact: null,
        },
        {
            id: 6,
            productImage: "https://thumbs.dreamstime.com/b/imagen-del-icono-de-la-u%C3%B1a-del-pulgar-de-la-fotograf%C3%ADa-o-del-bot%C3%B3n-de-la-galer%C3%ADa-de-la-imagen-84717969.jpg",
            productName: "gafas",
            amount: 1,
            description: "asd",
            clientName: "Sebastina",
            clientPhone: 777 - 5555 - 5555,
            date: "07-07-22",
            BringerPending: false,
            BringerName: "Cele ",
            BringerContact: 3213 - 5445 - 55,
        },
        {
            id: 7,
            productImage: "https://thumbs.dreamstime.com/b/imagen-del-icono-de-la-u%C3%B1a-del-pulgar-de-la-fotograf%C3%ADa-o-del-bot%C3%B3n-de-la-galer%C3%ADa-de-la-imagen-84717969.jpg",
            productName: "gafas",
            amount: 1,
            description: "asd",
            clientName: "Agustín Farias",
            clientPhone: 777 - 5555 - 5555,
            date: "07-07-22",
            BringerPending: false,
            BringerName: "Agustina",
            BringerContact: 3213 - 5445 - 55,
        },
    ]



    return (

        <div className={styles.home} >
            <div className={styles.container}>

                <div className={styles.welcomeContainer}>

                    <div className={styles.imgContainer}>

                        <img
                            src={logo}
                            style={{ width: "auto", height: "100px" }}
                            alt="Logo no encontrado"
                        />
                    </div>
                    <div className={styles.perfil}>
                        <img
                            src={"https://p16-va-default.akamaized.net/img/musically-maliva-obj/1665282759496710~c5_720x720.jpeg"}
                            style={{ width: "auto", height: "100px", borderRadius: "150px", border: "solid 4px #41d4cf" }}
                            alt="Logo no encontrado"
                        />

                        <select name="perfil" value="perfil" onChange={(e) => handleOnChange(e)}>
                            <option value="">{input.perfil} </option>
                            {/* <option value=""></option> */}
                            <option value="Email">{input.businessEmailState}</option>
                            <option value="close">Cerrar sesión</option>

                        </select>
                    </div>
                </div>

                {/* <div className={styles.perfil}>
                    <div>
                       
                    </div>

                </div> */}

                <div className={styles.soldProductsContainer}>


                    {<table>
                        <thead>
                            <tr>
                                <th>Producto</th>
                                <th>Cantidad</th>
                                <th>Descripción</th>
                                <th>Nombre</th>
                                <th>Teléfono</th>
                                <th>Viajero</th>
                                <th>Teléfono</th>
                                <th>Enviado</th>
                            </tr>
                        </thead>
                        <tbody>

                            {soldProducts.map(c => {
                                return (


                                    <SoldProductCard image={c.productImage} productName={c.productName} amount={c.amount} description={c.description} clientName={c.clientName} clientPhone={c.clientPhone} date={c.date} BringerPending={c.BringerPending} BringerName={c.BringerName} BringerContact={c.BringerContact} />



                                )
                            })}
                        </tbody>

                    </table>
                    }
                </div>
                <div className={styles.inventoryContainer}>
                    {<table>
                        <thead>
                            <tr>
                                <th>Imagen</th>
                                <th>Producto</th>
                                <th>Cantidad</th>
                                <th>Descripción</th>
                                <th>Actions</th>

                            </tr>
                        </thead>
                        <tbody>

                            {products?.map(c => {
                                return (

                                    <ProductCardBusiness id={c.id} image={c.image} productName={c.name} amount={c.stock} description={c.description} />



                                    // <div key={c.id}>

                                    // </div>
                                )
                            })}
                        </tbody>

                    </table>
                    }
                </div>
                <div className={styles.noStockTitle}>
                    <h2>Inventario Bajo</h2>
                </div>
                <div className={styles.noStock}>
                    {<table>
                        <thead>
                            <tr>
                                <th>Imagen</th>
                                <th>Producto</th>
                                <th>cantidad</th>
                                <th>Descripción</th>
                                <th>Actions</th>

                            </tr>
                        </thead>
                        <tbody>

                            {products?.filter(e => e.stock <= 3).map(c => {
                                return (

                                    <ProductCardBusiness id={c.id} image={c.image} productName={c.name} amount={c.stock} description={c.description} />


                                    // <div key={c.id}>

                                    // </div>
                                )
                            })}
                        </tbody>

                    </table>
                    }
                </div>
                <div className={styles.btnContainer}>
                    <NavLink to='/productmanager'>

                        <button className={styles.btn}>+</button>
                    </NavLink>
                </div>


            </div>

        </div>
    )
}

export default HomeBusiness