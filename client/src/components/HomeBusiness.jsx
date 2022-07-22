import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import styles from "../styles/HomeBusiness.module.css"
import SoldProductCard from './SoldProductCard';
import ProductCardBusiness from './ProductCardBusiness';
import { useDispatch, useSelector } from 'react-redux';
import { addBusiness } from '../actions';

function HomeBusiness() {

    const gState = useSelector((state) => state);
    const dispatch = useDispatch();
    const user = {
        email: "wfDD@gmail.com",
        password: "123456",
        businessName: "bring it app",
        cuit: "asd",
        taxBracket: "Categoría tributaria 1",
        logo: "21213132asdfadfa",
        province: "Buenos Aires",
        address: "1213213"
    }

    useEffect(() => {
        dispatch(addBusiness(user));

    }, [dispatch]);

    const [input, setInput] = useState({

        perfil: ""
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


    let products = [
        {
            id: 0,
            name: "zapatos",
            amount: 35,
            description: "assdd",
            productImage: "https://thumbs.dreamstime.com/b/imagen-del-icono-de-la-u%C3%B1a-del-pulgar-de-la-fotograf%C3%ADa-o-del-bot%C3%B3n-de-la-galer%C3%ADa-de-la-imagen-84717969.jpg",
        },
        {
            id: 1,
            name: "vinos",
            amount: 2,
            description: "assdd",
            productImage: "https://thumbs.dreamstime.com/b/imagen-del-icono-de-la-u%C3%B1a-del-pulgar-de-la-fotograf%C3%ADa-o-del-bot%C3%B3n-de-la-galer%C3%ADa-de-la-imagen-84717969.jpg",
        },
        {
            id: 2,
            name: "cerveza",
            amount: 1,
            description: "assdd",
            productImage: "https://thumbs.dreamstime.com/b/imagen-del-icono-de-la-u%C3%B1a-del-pulgar-de-la-fotograf%C3%ADa-o-del-bot%C3%B3n-de-la-galer%C3%ADa-de-la-imagen-84717969.jpg",
        },
        {
            id: 3,
            name: "reloj",
            amount: 35,
            description: "assdd",
            productImage: "https://thumbs.dreamstime.com/b/imagen-del-icono-de-la-u%C3%B1a-del-pulgar-de-la-fotograf%C3%ADa-o-del-bot%C3%B3n-de-la-galer%C3%ADa-de-la-imagen-84717969.jpg",
        },
        {
            id: 4,
            name: "cadena",
            amount: 3,
            description: "assdd",
            productImage: "https://thumbs.dreamstime.com/b/imagen-del-icono-de-la-u%C3%B1a-del-pulgar-de-la-fotograf%C3%ADa-o-del-bot%C3%B3n-de-la-galer%C3%ADa-de-la-imagen-84717969.jpg",
        },
        {
            id: 5,
            name: "pantalon",
            amount: 10,
            description: "assdd",
            productImage: "https://thumbs.dreamstime.com/b/imagen-del-icono-de-la-u%C3%B1a-del-pulgar-de-la-fotograf%C3%ADa-o-del-bot%C3%B3n-de-la-galer%C3%ADa-de-la-imagen-84717969.jpg",
        },
        {
            id: 6,
            name: "audifonos",
            amount: 17,
            description: "assdd",
            productImage: "https://thumbs.dreamstime.com/b/imagen-del-icono-de-la-u%C3%B1a-del-pulgar-de-la-fotograf%C3%ADa-o-del-bot%C3%B3n-de-la-galer%C3%ADa-de-la-imagen-84717969.jpg",
        },
        {
            id: 7,
            name: "guitarra",
            amount: 8,
            description: "assdd",
            productImage: "https://thumbs.dreamstime.com/b/imagen-del-icono-de-la-u%C3%B1a-del-pulgar-de-la-fotograf%C3%ADa-o-del-bot%C3%B3n-de-la-galer%C3%ADa-de-la-imagen-84717969.jpg",
        },
        {
            id: 8,
            name: "libro",
            amount: 1,
            description: "assdd",
            productImage: "https://thumbs.dreamstime.com/b/imagen-del-icono-de-la-u%C3%B1a-del-pulgar-de-la-fotograf%C3%ADa-o-del-bot%C3%B3n-de-la-galer%C3%ADa-de-la-imagen-84717969.jpg",
        },
        {
            id: 9,
            name: "camara",
            amount: 11,
            description: "assdd",
            productImage: "https://thumbs.dreamstime.com/b/imagen-del-icono-de-la-u%C3%B1a-del-pulgar-de-la-fotograf%C3%ADa-o-del-bot%C3%B3n-de-la-galer%C3%ADa-de-la-imagen-84717969.jpg",
        },
        {
            id: 10,
            name: "teclado",
            amount: 18,
            description: "assdd",
            productImage: "https://thumbs.dreamstime.com/b/imagen-del-icono-de-la-u%C3%B1a-del-pulgar-de-la-fotograf%C3%ADa-o-del-bot%C3%B3n-de-la-galer%C3%ADa-de-la-imagen-84717969.jpg",
        },
    ]
    return (

        <div className={styles.home} >
            <div className={styles.container}>

                <div className={styles.welcomeContainer}>
                    <h1>Bienvenido a Bring-It</h1>
                    <h2>Empresas</h2>
                </div>


                <div className={styles.perfil}>
                    <div>
                        <div>
                            <select name="perfil" value="perfil" onChange={(e) => handleOnChange(e)}>
                                <option value="">{input.perfil} </option>
                                <option value="">perfil</option>
                                <option value="op1">xxx</option>
                                <option value="op2">xxx</option>
                                <option value="op3">xxx</option>
                                <option value="op4">xxx</option>
                                <option value="op5">xxx</option>
                            </select>
                        </div>
                    </div>

                </div>

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

                            {products.map(c => {
                                return (

                                    <ProductCardBusiness id={c.id} image={c.productImage} productName={c.name} amount={c.amount} description={c.description} />



                                    // <div key={c.id}>

                                    // </div>
                                )
                            })}
                        </tbody>

                    </table>
                    }
                </div>
                <div className={styles.noStock}>
                    <h2>alerta de inventario bajo</h2>
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

                            {products.filter(e => e.amount <= 3).map(c => {
                                return (

                                    <ProductCardBusiness id={c.id} image={c.productImage} productName={c.name} amount={c.amount} description={c.description} />


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