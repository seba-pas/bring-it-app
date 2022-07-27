
import { useSelector, useDispatch } from "react-redux";

import { incrementOneInCart, removeOneFromCart, removeAllFromCart, clearCart } from "../actions"

export default function Cart () {

    const cart = useSelector ((state) => state.cart);
    const dispatch = useDispatch();
    console.log(cart);
    

    function handleRemoveOne(e) {
        dispatch(removeOneFromCart(e.target.value));
        debugger;
    }

    function handleIncrementOne(e) {
        
        dispatch(incrementOneInCart(e.target.value)); //no esta enviando el id
        debugger;
    }

    function handleRemoveAll(e) {
        dispatch(removeAllFromCart(e.target.value));
        debugger;
    }

    function handleClearCart(e) {
        dispatch(clearCart(e.target.value));
        debugger;
    }

    // cart: [ [{producto1 con todos sus datos}, cantidad], [{producto2 con todos sus datos}, cantidad] ]
    // cart: [ [productGroup], [productGroup], [productGroup]]
    // productGroup = [productGroup[0], productGroup[1]]
    return (
        <div>
            <h1>Carrito</h1>
            <h2>Productos</h2>            
            <div>                
                {cart.map (productGroup => (
                    <div key={productGroup[0].id} value={productGroup[0].id}>
                        <h3>{productGroup[0].name}</h3>
                        <h3>id: {productGroup[0].id}</h3>
                        <h3>${productGroup[0].price}</h3>
                        <h3>Cantidad: {productGroup[1]}</h3>
                        <button onClick={e => handleRemoveOne(e)}>-</button>
                        <button onClick={e => handleIncrementOne(e)}>+</button>
                        <button onClick={e => handleRemoveAll(e)}>X</button>
                    </div>
                    ))}                       
            </div>
                  
            <button onClick={e => handleClearCart(e)}>Vaciar carrito</button>
        </div>
    )
}