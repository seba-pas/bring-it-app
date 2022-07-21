import React from 'react'
import styles from "../styles/ProductCardBusiness.module.css"
import { IoCreateOutline, IoCloseCircleOutline } from "react-icons/io5"
import { NavLink } from 'react-router-dom';



function ProductCardBusiness({ id, image, productName, amount, description }) {
    const handleClick = (event) => {
        event.preventDefault();


    }
    return (
        <tr>
            <th><img src={image} alt={productName} width="100" height="90"></img></th>
            <th><h6>{productName}</h6></th >
            <th><h6>{amount}</h6></th>
            <th><h6>{description}</h6></th>
            <th>
                <div className={styles.btncontainer}>
                    <NavLink to={`/productmanager/${id}`}>
                        <button className={styles.btn}>
                            <IoCreateOutline />
                        </button>
                    </NavLink>
                    <button className={styles.btn} onClick={(event) => { handleClick(event); }}>
                        <IoCloseCircleOutline />
                    </button>
                </div>
            </th>

        </tr>
    )
}

export default ProductCardBusiness