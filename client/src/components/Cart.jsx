import { useSelector, useDispatch } from "react-redux";
import { React } from "react";

import { removeOneFromCart, removeAllFromCart, clearCart } from "../actions";

export default function Cart() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

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
    <div>
      <h1>Carrito</h1>
      <h2>Productos</h2>
      <div>
        {cart.map((productGroup) => (
          <div key={productGroup.id} value={productGroup.id}>
            <h3>{productGroup.name}</h3>
            <h3>id: {productGroup.id}</h3>
            <h3>${productGroup.price * productGroup.quantity}</h3>
            <h3>Cantidad: {productGroup.quantity}</h3>
            <button onClick={(e) => handleClearCart(e)}>Vaciar carrito</button>
            <button onClick={() => handleRemoveOne(productGroup.id)}>
              Eliminar uno
            </button>
            <button onClick={() => handleRemoveOne(productGroup.id, true)}>
              Eliminar todos
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
