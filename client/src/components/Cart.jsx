import { useSelector, useDispatch } from "react-redux";
import { React, useEffect } from "react";

import { removeOneFromCart, removeAllFromCart, clearCart, getCart } from "../actions";
import "bootstrap/dist/css/bootstrap.css";

export default function Cart() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(getCart())
  }, [dispatch])


 


  function handleRemoveOne(productId, all = false) {
    if (all) {
      dispatch(removeAllFromCart(productId));
    } else {
      dispatch(removeOneFromCart(productId));
    }
  }

  function handleClearCart(e) {
    dispatch(clearCart(e.target.value));
  }

  return (
    <div className="container">
      <div className="shopping-cart">
        <div className="shopping-cart-header">
          {/* <div className="shopping-cart-total">
            <span className="lighter-text">Total:</span>
            <span className="main-color-text">$2,229.97</span>
          </div> */}
        </div>
      </div>
      <ul>
        {cart.map((productGroup) => (
          <li
            className="clearfix"
            key={productGroup.id}
            value={productGroup.id}
          >
            {/* <img
              src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/cart-item1.jpg"
              alt="item1"
            /> */}
            <span className="item-name">{productGroup.name}</span>
            <span className="item-price">
              ${productGroup.price * productGroup.quantity}
            </span>
            <span className="item-quantity">
              Cantidad: {productGroup.quantity}
            </span>
            <button onClick={() => handleRemoveOne(productGroup.id)}>
              Eliminar uno
            </button>
            <button onClick={() => handleRemoveOne(productGroup.id, true)}>
              Eliminar todos
            </button>
          </li>
        ))}
      </ul>
      {cart.length > 0 ? (
        <button onClick={(e) => handleClearCart(e)}>Vaciar carrito</button>
      ) : (
        <p>No hay productos para mostrar</p>
      )}
    </div>
  );
}
