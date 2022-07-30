import React from 'react'
import styles from "../styles/ProducTravelCard.module.css"
import { IoCreateOutline, IoCloseCircleOutline } from "react-icons/io5"
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deleteProduct, getAllProducts } from '../actions';


function ProducTravelCard({ id, arrivalCityId, arrivalDate, arrivalProvince, startDate, travelCityId, travelProvince }) {
    return (
        <tr>

            <th><h3>{`${startDate} cityorigen ${travelProvince}`}</h3></th >
            <th><h3>{`${arrivalDate} citydestino ${arrivalProvince}`}</h3></th >

            <th>
                {/* <div className={styles.btncontainer}>
                    <NavLink to={`/productmanager/${id}`}>
                        <button className={styles.btn}>
                            <IoCreateOutline />
                        </button>
                    </NavLink>
                    <button className={styles.btn} onClick={(event) => { handleClick(event); }}>
                        <IoCloseCircleOutline />
                    </button>
                </div> */}
            </th>

        </tr>
    )
}

export default ProducTravelCard



// function ProductCardBusiness({ id, image, productName, amount, description }) {
//
//     const dispatch = useDispatch();

//     async function handleClick(event) {
//         event.preventDefault();
//         dispatch(deleteProduct(id));

//     }
//     return (
//
//     )
// }

// export default ProductCardBusiness