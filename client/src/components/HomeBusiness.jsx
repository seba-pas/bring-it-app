import React, { useEffect, useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import styles from "../styles/HomeBusiness.module.css"
import SoldProductCard from './SoldProductCard';
import ProductCardBusiness from './ProductCardBusiness';
import { useDispatch, useSelector } from 'react-redux';
import { getAllBusiness, getAllProducts, getCategories } from '../actions';
import NavBarBusiness from "./NavBarBusiness"
import { IoCaretDownOutline, IoCaretUpOutline } from 'react-icons/io5';

function HomeBusiness() {

    const gState = useSelector((state) => state);
    const dispatch = useDispatch();
    const history = useHistory();


    useEffect(() => {
        dispatch(getAllProducts());
    }, [dispatch, gState.deleteProduct]);

    useEffect(() => {
        dispatch(getAllBusiness());
        dispatch(getCategories());
    }, [dispatch]);

    const [input, setInput] = useState({
        perfil: "",
        products: [],
        businessInfo: {},
        asc: true,
    });

    useEffect(() => {
        setInput((prevInput) => {
            return {
                ...prevInput,
                businessInfo: { ...gState.businessEditInfo },
                products: gState.allProducts ? gState.allProducts.filter(e => e.businessbranch.businessEmail === gState.businessEmail) : [],//.filter(e => e.businessBranch.businessEmail === gState.businessEditInfo.email),
            }
        })
    }, [gState]);

    useEffect(() => {
        setInput((prevInput) => {
            return {
                ...prevInput,
                products: gState.allProducts ? gState.allProducts.filter(e => e.businessbranch.businessEmail === gState.businessEmail) : [],  //.filter(e => e.businessBranch.businessEmail === gState.businessEditInfo.email),
            }
        })

    }, [gState.allProducts]);

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

    // const orderName = (event)=>{
    //     event.preventDefault();
    //     setInput((prevInput) => {
    //         return {
    //             ...prevInput,
    //             asc: !asc,
    //         }
    //     });
    // }

    return (
        <div>
            <NavBarBusiness />
            <div className={styles.HomeBusiness} >
                <div className={styles.container}>
                    <div className={styles.btnContainer}>
                        <NavLink to='/productmanager'>
                            <button className={styles.btn}>+</button>
                        </NavLink>
                    </div>
                    {/* <div className={styles.btnFilterNameContainer}>
                        <NavLink to='/productmanager'>
                            <button onClick={(event) => orderName(event)}><IoCaretDownOutline /></button>  <IoCaretUpOutline />
                        </NavLink>
                    </div> */}

                    {/* <div className={styles.soldProductsContainer}>
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
                    </div> */}
                    <div className={styles.inventoryContainer}>
                        {<table>
                            <thead className={styles.titlleTable}>
                                <tr>
                                    <th>Imagen</th>
                                    <th>Producto</th>
                                    <th>Cantidad</th>
                                    <th>Descripción</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>

                                {input.products?.map(c => {
                                    return (
                                        <ProductCardBusiness key={c.id} id={c.id} image={c.image} productName={c.name} amount={c.stock} description={c.description} />
                                    )
                                })}
                            </tbody>
                        </table>
                        }
                    </div>
                    <div className={styles.noStockTitle}>
                        Inventario Bajo
                    </div>
                    <div className={styles.noStock}>
                        {<table>
                            <thead className={styles.titlleTableNonSt}>
                                <tr>
                                    <th>Imagen</th>
                                    <th>Producto</th>
                                    <th>cantidad</th>
                                    <th>Descripción</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {input.products?.filter(e => e.stock <= 3).map(c => {
                                    return (
                                        <ProductCardBusiness key={c.id} id={c.id} image={c.image} productName={c.name} amount={c.stock} description={c.description} />
                                    )
                                })}
                            </tbody>
                        </table>
                        }
                    </div>
                </div>
            </div>
        </div>

    )
}

export default HomeBusiness;
