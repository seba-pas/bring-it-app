import React, { useEffect, useState } from 'react'
import styles from "../styles/ProductManager.module.css"
function ProductManager() {


    const [input, setInput] = useState({
        product: "",
        price: 0,
        description: "",
        category: "",
        weight: 0,
        image: "",
        stock: 0,
    })

    const [error, setError] = useState({
        errorProduct: "",
        errorPrice: "",
        errorCategory: "",
        errorWeight: "",
        errorImage: "",
        errorStock: "",
    });

    useEffect(() => {
        validate();
    }, [input.product, input.price, input.description, input.category, input.weight, input.image, input.stock]);

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
        let errorProduct = "";
        let errorPrice = "";
        let errorDescription = "";
        let errorWeight = "";
        let errorImage = "";
        let errorStock = "";


        if (!/^[a-zA-Z ]{0,30}$/.test(input.product) || input.product[0] === " " || input.product === "") errorProduct = "Debe ingresar el nombre del producto";
        if (!/^\d{1,2}$/.test(input.price)) errorPrice = "Debe ingresar un Precio";
        if (!/^[a-zA-Z0-9 ]{0,200}$/.test(input.description) || input.description[0] === " " || input.description === "") errorDescription = "Debe ingresar la descripcion del producto";
        if (!/^\d{1,2}$/.test(input.weight)) errorWeight = "Debe ingresar el peso del producto";
        if (!/^\d{1,2}$/.test(input.image)) errorImage = "Debe cargar una imagen";
        if (!/^[a-zA-Z0-9 ]{0,200}$/.test(input.stock) || input.stock[0] === " " || input.stock === "") errorStock = "Debe ingresar el stock del producto";

        setError((prevInput) => {
            return {
                errorProduct: errorProduct,
                errorPrice: errorPrice,
                errorDescription: errorDescription,
                errorWeight: errorWeight,
                errorimage: errorImage,
                errorStock: errorStock,
            }
        });


    }

    const handleSubmit = (event) => {
        event.preventDefault();

    }


    return (
        <div className={styles.ProductManager}>

            <form className={styles.container} onSubmit={handleSubmit}>
                <div className={styles.nameContainer}>
                    <label htmlFor='product'>Producto:</label>
                    <input
                        type="text"
                        name="product"
                        value={input.product}
                        onChange={handleInputChange}
                    />
                    {/* {!error.errorProduct ? <h3><pre>    {null}                                          </pre></h3> : <h3><pre>          {error.errorProduct}             </pre></h3>} */}
                    {!error.errorProduct ? <label> </label> : <label>          {error.errorProduct}             </label>}
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
                <div className={styles.imageContainer}>
                    <label htmlFor='image'>Imagen:</label>
                    <input
                        type="text"
                        name="image"
                        value={input.image}
                        onchange={handleInputChange}
                    />
                    {!error.errorImage ? <label> </label> : <label>          {error.errorImage}             </label>}

                </div>
                <div className={styles.stockContainer}>
                    <label htmlFor='stock'>Stock:</label>
                    <input
                        type="number"
                        name="stock"
                        value={input.stock}
                        onchange={handleInputChange}
                    />
                    {!error.errorStock ? <label> </label> : <label>          {error.errorStock}             </label>}

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
                        <select name="selectCategories" value="selectCategories" onChange={handleInputChange}>
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
                    <button className={styles.btn} type="submit" disabled={error.errorName || error.errorDifficulty || error.errorDuration || error.errorSeason || error.errorPaises}>
                        agregar al inventario
                    </button>


                </div>
            </form>
        </div>



    )
}

export default ProductManager