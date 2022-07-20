import React, { useState } from 'react'
import styles from "../styles/ProductManager.module.css"
function ProductManager() {

    const [input, setInput] = useState({
        product: "",
    })
    const handleCategoriesChange = (event) => {



        event.preventDefault();
        // setInput((prevInput) => {
        //     if (event.target.value === "") {
        //         return {
        //             ...prevInput,
        //             page: 0,
        //             limit: 9,
        //             wait: false,
        //             activity: "",
        //         }
        //     } else {

        //         return {
        //             ...prevInput,
        //             page: 0,
        //             limit: 300,
        //             wait: true,
        //             activity: event.target.value,
        //         }
        //     }
        // });

    }
    return (
        <div className={styles.ProductManager}>
            <div className={styles.container}>
                <div className={styles.nameContainer}>
                    <label htmlFor='product'>Producto:</label>
                    <input
                        type="text"
                        name="product"
                        value={input.product}
                    // onChange={handleInputChange}
                    ></input>
                </div>

                <div className={styles.priceContainer}>
                    <label>Precio:</label>
                    <input></input>

                </div>
                <div className={styles.categoriesContainer}>
                    <div>
                        <select name="selectCategories" value="selectCategories" onChange={(e) => handleCategoriesChange(e)}>
                            {/* <option value="">{input.category}</option> */}
                            <option value="">xx</option>
                            <option value="">Categoria: </option>
                            {
                                // allActivities?.map(e => <option key={e.name} value={e.name}>{e.name}</option>)
                            }
                        </select>
                    </div>

                </div>
                <div className={styles.weightContainer}>
                    <label>Peso:</label>
                    <input></input>

                </div>
                <div className={styles.descriptionContainer}>
                    <label>Descripción:</label>
                    <textarea></textarea>

                </div>
                <div className={styles.imageContainer}>
                    <label>Imagen:</label>
                    <input></input>

                </div>
                <div className={styles.stockContainer}>
                    <label>Stock:</label>
                    <input></input>

                </div>
            </div>
        </div>


    )
}

export default ProductManager