import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { addProduct, editProduct, getCategories } from '../actions';
import styles from "../styles/ProductManager.module.css"
import swal from "sweetalert";
import { IoCloseCircleOutline } from 'react-icons/io5';
function ProductManager(props) {

    const gState = useSelector((state) => state);
    const dispatch = useDispatch();
    const history = useHistory();
    let id = props.match.params.id;

    const tokenBusiness = gState.businessToken;

    useEffect(() => {
        dispatch(getCategories());
    }, [dispatch]);

    let product = gState.allProducts ? gState.allProducts.filter(e => e.id === parseInt(id))[0] : {}

    let categories = gState.categories;

    const [input, setInput] = useState(id ? {
        name: product.name || "",
        price: product.price || 0,
        weight: product.weight || 0,
        image: product.image || "",
        stock: product.stock || 0,
        description: product.description || "",
        categoryId: product.categories?.map(e => e.id) || [],
        allCategories: categories,
        branch: "",

    } : {
        name: "",
        price: 0,
        weight: 0,
        image: "",
        stock: 0,
        description: "",
        categoryId: [],
        allCategories: categories,
        branch: "",
    })






    const [error, setError] = useState({
        errorname: "",
        errorPrice: "",
        errorcategoryId: "",
        errorWeight: "",
        errorStock: "",
        errorbranch: "",
    });

    useEffect(() => {
        validate();
    }, [input.name, input.price, input.description, input.categoryId, input.weight, input.stock, input.branch]);

    const handleInputChange = (event) => {
        event.preventDefault();
        if (event.target.name === "categoryId") {
            if (!input.categoryId.includes(parseInt(event.target.value))) {

                setInput((prevInput) => {
                    return {
                        ...prevInput,
                        categoryId: [...input.categoryId, parseInt(event.target.value)],
                    }
                });
            }
        }
        else {
            setInput((prevInput) => {
                return {
                    ...prevInput,
                    [event.target.name]: event.target.value,
                }
            });

        }
    }



    const validate = () => {
        let errorname = "";
        let errorPrice = "";
        let errorDescription = "";
        let errorWeight = "";
        let errorStock = "";
        let errorcategoryId = "";
        let errorbranch = "";


        if (!/^[a-zA-Z ]{0,50}$/.test(input.name) || input.name[0] === " " || input.name === "") errorname = "Debe escribir el nombre del producto";
        if (!/^[0-9]{0,10}$/.test(input.price) || input.price < 0 || input.price === "") errorPrice = "Introduzca el precio";
        if (input.description[0] === " " || input.description === "") errorDescription = "Debe escribir descripcion del producto";
        if (input.categoryId.length < 1) errorcategoryId = "Seleccione  categorias";
        if (input.branch === "") errorbranch = "Seleccione  Sede";
        if (!/^[0-9]{0,10}$/.test(input.weight) || input.weight < 0 || input.weight === "") errorWeight = "Introduzca el peso del producto";
        if (!/^[0-9]{0,10}$/.test(input.stock) || input.stock < 0 || input.stock === "") errorStock = "Introduzca stock del producto";

        setError((prevInput) => {
            return {
                errorname: errorname,
                errorPrice: errorPrice,
                errorDescription: errorDescription,
                errorWeight: errorWeight,
                errorStock: errorStock,
                errorcategoryId: errorcategoryId,
                errorbranch: errorbranch,
            }
        });


    }



    const handleBack = (event) => {
        event.preventDefault();
        history.push("/empresas");
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        if (id !== undefined) {
            dispatch(editProduct(id, {
                name: input.name,
                price: input.price,
                weight: input.weight,
                image: input.image,
                stock: input.stock,
                description: input.description,
                categoryId: [...input.categoryId],
                businessEmail: gState.businessEmail, //hardcodeo para check
                businessbranchId: parseInt(input.branch),
            },
            tokenBusiness //envio de 3er parametro para enviar los headers en la accion (envio de token al back)
            ))
            swal("Buen trabajo!", "Editado satisfactoriamente!", "success"); 
        } else {

            dispatch(addProduct({
                name: input.name,
                price: input.price,
                weight: input.weight,
                image: input.image,
                stock: input.stock,
                description: input.description,
                categoryId: [...input.categoryId],
                businessEmail: gState.businessEmail,
                businessbranchId: parseInt(input.branch),
            },
            tokenBusiness //envio de 3er parametro para enviar los headers en la accion (envio de token al back)
            ))

            swal("Buen trabajo!", "Producto agregado satisfactoriamente!", "success"); 
            setInput((prevInput) => {
                return {
                    ...prevInput,
                    name: "",
                    price: 0,
                    weight: 0,
                    image: "",
                    stock: 0,
                    description: "",
                    categoryId: [],
                    branch: "",
                }
            })

        }
        //dispatch(editProduct(props.match.params.id, input));

    }
    const handleClick = (event, id) => {
        event.preventDefault();
        setInput((prevInput) => {
            return {
                ...prevInput,
                categoryId: input.categoryId.filter(e => e !== id),
            }
        });
    }


    return (
        <div className={styles.ProductManager}>
            <form className={styles.container} onSubmit={handleSubmit}>
                <div className={styles.nameContainer}>
                    <label htmlFor='name'>Producto:</label>
                    <input
                        // className={}
                        type="text"
                        name="name"
                        value={input.name}
                        placeholder="Producto"
                        onChange={handleInputChange}
                    />
                    {/* {!error.errorProduct ? <h3><pre>    {null}                                          </pre></h3> : <h3><pre>          {error.errorProduct}             </pre></h3>} */}
                    {!error.errorname ? <label> </label> : <label>          {error.errorname}             </label>}
                </div>

                <div className={styles.priceContainer}>
                    <label htmlFor='price'>Precio:</label>
                    <input
                        type="number"
                        name="price"
                        value={input.price}
                        placeholder="Precio"
                        onChange={handleInputChange}
                    />
                    {!error.errorPrice ? <label> </label> : <label>          {error.errorPrice}             </label>}

                </div>

                <div className={styles.weightContainer}>
                    <label htmlFor='weight'>Peso:</label>
                    <input
                        type="number"
                        name="weight"
                        value={input.weight}
                        placeholder="Peso"
                        onChange={handleInputChange}
                    />
                    {!error.errorWeight ? <label></label> : <label>          {error.errorWeight}             </label>}

                </div>
                <div className={styles.stockContainer}>
                    <label htmlFor='stock'>Stock:</label>
                    <input
                        type="number"
                        name="stock"
                        value={input.stock}
                        placeholder="Stock"
                        onChange={handleInputChange}
                    />
                    {!error.errorStock ? <label> </label> : <label>          {error.errorStock}             </label>}

                </div>
                <div className={styles.imageContainer}>
                    <label htmlFor='image'>Imagen:</label>
                    <textarea

                        type="text"
                        name="image"
                        value={input.image}
                        placeholder="Imagen"
                        onChange={handleInputChange}
                    />


                </div>
                <div className={styles.descriptionContainer}>
                    <label htmlFor='description'>Descripción:</label>
                    <textarea
                        type="text"
                        name="description"
                        value={input.description}
                        onChange={handleInputChange}
                    />
                    {!error.errorDescription ? <label> </label> : <label>          {error.errorDescription}             </label>}

                </div>
                <div className={styles.categoriesContainer}>
                    <div>
                        Categorias
                    </div>
                    <div>
                        <select name="categoryId" value="categoryId" onChange={handleInputChange}>
                            <option value="">{ }</option>
                            {
                                input.allCategories?.map(e => <option key={e.name} value={e.id}>{e.name}</option>)
                            }
                        </select>
                    </div>
                    {!error.errorcategoryId ? <label> </label> : <label>          {error.errorcategoryId}             </label>}
                </div>
                <div className={styles.branchesContainer}>
                    <div>
                        Sedes
                    </div>
                    <div>
                        <select name="branch" value={input.branch} onChange={handleInputChange}>
                            <option value="">{ }</option>
                            {
                                gState.businessEditInfo.businessbranches?.map(e => <option key={e.id} value={e.id}>{e.businessBranchName}</option>)
                            }
                        </select>
                    </div>
                    {!error.errorbranch ? <label> </label> : <label>          {error.errorbranch}             </label>}
                </div>
                <div className={styles.categoriesCardContainer}>
                    <div>
                        {
                            input.categoryId.length ? input.categoryId.map(e => <div className={styles.cardCategories}>{input.allCategories.filter(el => el.id === e)[0].name} <button className={styles.btnClose} currentTarget="1" onClick={(event,) => { handleClick(event, e); }}>
                                <IoCloseCircleOutline />
                            </button></div>) : ""
                        }
                    </div>
                </div>
                <div className={styles.subButton}>
                    <button className={styles.btn} type="submit" disabled={error.errorname || error.errorPrice || error.errorDescription || error.errorWeight || error.errorStock || error.errorcategoryId || error.errorbranch}>
                        Listo
                    </button>
                </div>
                <div className={styles.backButton}>
                    <button className={styles.btn} onClick={e => handleBack(e)}>
                        Volver
                    </button>
                </div>
            </form>
        </div>



    )
}

export default ProductManager