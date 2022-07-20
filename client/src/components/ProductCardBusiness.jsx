import React from 'react'




function ProductCard({ image, productName, amount, description }) {
    return (
        <tr>
            <th><img src={image} alt={productName} width="100" height="90"></img></th>
            <th> <h5>{productName}</h5></th >
            <th><h5>{amount}</h5></th>
            <th><h5>{description}</h5></th>

        </tr>
    )
}

export default ProductCard



