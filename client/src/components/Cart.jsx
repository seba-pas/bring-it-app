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
import { BsFillTrashFill } from "react-icons/bs";
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
        "warning"
      );
      return;
    } else {
      history.push("/persona/compra");
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
                  <td style={{ height: "125px"}}>
                    <div style={{width: "40px", marginLeft: "15px"}}>
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
                    </div>
                  </td>
                  
                  <td><div style={{marginLeft:"15px"}}>{productGroup.quantity}</div></td>
                  <td><div style={{marginLeft:"25px"}}>{productGroup.name}</div></td>
                  <td><div style={{marginLeft:"10px"}}>${productGroup.price * productGroup.quantity}</div></td>
                  <td>
                    <div>
                      <BsFillTrashFill onClick={() => handleRemoveOne(productGroup.id)}/>
{/*                       <img
                        src="https://i.imgur.com/h1ldGRr.png"
                        alt="X"
                        onClick={() => handleRemoveOne(productGroup.id)}
                      /> */}
                    </div>
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
