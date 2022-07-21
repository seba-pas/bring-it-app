import React from 'react'
import styles from "../styles/SoldProductCard.module.css"

function SoldProductCard({ image, productName, amount, description, clientName, clientPhone, date, BringerPending, BringerName, BringerContact }) {
    return (
        <tr>

            <th><h6>{productName}</h6></th>
            <th><h6>{amount}</h6></th>
            <th><h6>{description}</h6></th>
            <th><h6>{clientName}</h6></th>
            <th><h6>{clientPhone}</h6></th>
            <th><h6>{BringerName}</h6></th>
            <th><h6>{BringerContact}</h6></th>
            <th><input type="checkbox" id="cbox1" value="first_checkbox" /></th>
        </tr>
    )
}

export default SoldProductCard



