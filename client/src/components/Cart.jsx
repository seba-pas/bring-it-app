import { useSelector, useDispatch } from "react-redux";
import { React, useEffect } from "react";
import "../styles/Cart.css";
import {
  removeOneFromCart,
  removeAllFromCart,
  clearCart,
  getCart,
} from "../actions";
import "bootstrap/dist/css/bootstrap.css";
import swal from "sweetalert";
import { useHistory } from "react-router-dom";

export default function Cart() {
  const dispatch = useDispatch();
  const history = useHistory();
  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(getCart());
  }, [dispatch]);

  function handleRemoveOne(productId, all = false) {
    if (all) {
      dispatch(removeAllFromCart(productId));
      swal("Buen trabajo!", "El producto fue eliminado con exito!", "success");
    } else {
      dispatch(removeOneFromCart(productId));
      swal("Buen trabajo!", "El producto fue eliminado con exito!", "success");
    }
  }

  function handleClearCart(e) {
    dispatch(clearCart(e.target.value));
  }
  function handleClick(e) {
    e.preventDefault();

    if (cart.length === 0) {
      swal(
        "No tienes productos en tu carrito",
        "Por favor primero agrega un producto!",
        "error"
      );
      return;
    } else {
      history.push("/compra");
    }
  }
  return (
    <div className="container">
      <div className="shopping-cart">
        <div className="shopping-cart-header"></div>
      </div>
      <div id="page">
        <table id="cart">
          <thead>
            <tr style={{ display: "flex", justifyContent: "space-around" }}>
              
              <th className="first">Imagen</th>
              <th className="second">Cant.</th>
              <th className="third">Product</th>
              <th className="fourth">Precio</th>
              <th className="fifth">&nbsp;</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((productGroup) => (
              <div style={{ width: "100%" }}>
                <tr className="productitm">
                  <td style={{ height: "125px", marginLeft: "33px" }}>
                    <img
                      src={productGroup.image}
                      className="thumb"
                      style={{
                        width: "100%",
                        height: "auto",
                        border: "none",
                        objectFit: "cover",
                      }}
                    />
                  </td>
                  <td>{productGroup.quantity}</td>
                  <td>{productGroup.name}</td>
                  <td>${productGroup.price * productGroup.quantity}</td>
                  <td>
                    <span className="remove">
                      <img
                        src="https://i.imgur.com/h1ldGRr.png"
                        alt="X"
                        onClick={() => handleRemoveOne(productGroup.id)}
                      />
                    </span>
                  </td>
                </tr>
              </div>
            ))}
            <tr style={{textAlign:"end",marginRight:"5px"}}>
              Precio total:{''}{cart
                .reduce((acc, item) => acc + item.quantity * item.price, 0)
                .toFixed(2)}
            </tr>
            <tr class="checkoutrow">
              <td colspan="5" class="checkout">
                <button id="submitbtn" onClick={(e) => handleClick(e)}>
                  COMPRAR
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
