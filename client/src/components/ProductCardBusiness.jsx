import React from 'react'
import styles from "../styles/ProductCardBusiness.module.css"
import { IoCreateOutline, IoCloseCircleOutline } from "react-icons/io5"
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {getAllProducts , desactivateProduct} from '../actions';
import swal from "sweetalert";


function ProductCardBusiness({ id, image, productName, amount, description }) {
    if (!image) image = "https://thumbs.dreamstime.com/b/imagen-del-icono-de-la-u%C3%B1a-del-pulgar-de-la-fotograf%C3%ADa-o-del-bot%C3%B3n-de-la-galer%C3%ADa-de-la-imagen-84717969.jpg"
    const dispatch = useDispatch();
    const businessToken = useSelector((state) => state.businessToken);
    const businessEmail = useSelector((state) => state.businessEmail);

    async function handleClick(event) {
        event.preventDefault();
        dispatch(desactivateProduct(id, businessToken, businessEmail));
        swal("El producto ha sido eliminado con éxito", "Gracias por usar Bring it!", "success");
    }
    return (
        <tr>
            <th><img src={image} alt={productName} width="100" height="90"></img></th>
            <th>{productName}</th >
            <th>{amount}</th>
            <th>{description}</th>
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