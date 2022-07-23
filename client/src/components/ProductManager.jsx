import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addProduct, editProduct } from '../actions';
import styles from "../styles/ProductManager.module.css"
function ProductManager(props) {

    const dispatch = useDispatch();


    const [input, setInput] = useState({
        name: "",
        price: 0,
        weight: 0,
        image: "",
        stock: 0,
        description: "",
        category: "",
    })

    const [error, setError] = useState({
        errorname: "",
        errorPrice: "",
        errorCategory: "",
        errorWeight: "",
        errorStock: "",
    });

    useEffect(() => {
        validate();
    }, [input.name, input.price, input.description, input.category, input.weight, input.stock]);

    const handleInputChange = (event) => {
        event.preventDefault();
        setInput((prevInput) => {
            return {
                ...prevInput,
                [event.target.name]: event.target.value,
            }
        });

    }

    const validate = () => {
        let errorname = "";
        let errorPrice = "";
        let errorDescription = "";
        let errorWeight = "";
        let errorStock = "";


        if (!/^[a-zA-Z ]{0,30}$/.test(input.name) || input.name[0] === " " || input.name === "") errorname = "Debe ingresar el nombre del producto";
        if (!/^\d{1,8}$/.test(input.price)) errorPrice = "Debe ingresar un Precio";
        if (!/^[a-zA-Z0-9 ]{0,250}$/.test(input.description) || input.description[0] === " " || input.description === "") errorDescription = "Debe ingresar la descripcion del producto";
        if (!/^\d{1,4}$/.test(input.weight)) errorWeight = "Debe ingresar el peso del producto";
        if (!/^[a-zA-Z0-9 ]{0,200}$/.test() || input.stock[0] === " " || input.stock === "")
            if (!/^\d{1,8}$/.test(input.stock)) errorStock = "Debe ingresar el stock del producto";;
        setError((prevInput) => {
            return {
                errorname: errorname,
                errorPrice: errorPrice,
                errorDescription: errorDescription,
                errorWeight: errorWeight,
                errorStock: errorStock,
            }
        });


    }
    const gState = useSelector((state) => state);
    const handleBack = (event) => {
        event.preventDefault();
        props.history.goBack();
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("click")
        console.log(gState.businessEmail)
        dispatch(addProduct({
            name: input.name,
            price: input.price,
            weight: input.weight,
            image: input.image,
            stock: input.stock,
            description: input.description,
            businessEmail: gState.businessEmail,
        }))
        //dispatch(editProduct(props.match.params.id, input));

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
                        <select name="category" value="category" onChange={handleInputChange}>
                            <option value="">{input.category}</option>
                            <option value="">xx</option>
                            <option value="">Categoria: </option>
                            {
                                // allActivities?.map(e => <option key={e.name} value={e.name}>{e.name}</option>)
                            }
                        </select>
                    </div>
                </div>
                <div className={styles.subButton}>
                    <button className={styles.btn} type="submit" disabled={error.errorname || error.errorPrice || error.errorDescription || error.errorWeight || error.errorStock}>
                        agregar al inventario
                    </button>
                </div>
                <div className={styles.backButton}>
                    <button className={styles.btn} onClick={e => handleBack(e)}>
                        Atras
                    </button>
                </div>
            </form>
        </div>



    )
}

export default ProductManager