import React from 'react'
import styles from "../styles/SoldProductCard.module.css"

function SoldProductCard({ image, productName, amount, description, clientName, clientPhone, date, BringerPending, BringerName, BringerContact }) {
    return (
        <tr>

            <th><h5>{productName}</h5></th>
            <th><h5>{amount}</h5></th>
            <th><h5>{description}</h5></th>
            <th><h5>{clientName}</h5></th>
            <th><h5>{clientPhone}</h5></th>
            <th><h5>{BringerName}</h5></th>
            <th><h5>{BringerContact}</h5></th>
            <th><input type="checkbox" id="cbox1" value="first_checkbox" /></th>
        </tr>
    )
}

export default SoldProductCard


    // < div className = { styles.cardContainer } >


    //         




