import { React, useState, useEffect } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import "../styles/FormPurchase.module.css";
// import CheckOut from "./Stripe/CheckOut";
import {
  getAllProvinces,
  getAllCities,
  postPurchase,
  clearCart,
} from "../actions/index.js";
import axios from "axios";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import swal from "sweetalert";
import moment from 'moment';
// import NavBar from "./NavBar";

function FormPurchase() {
  const dispatch = useDispatch();
  const history = useHistory();
  const cart = useSelector((state) => state.cart);
  const PROVINCES = useSelector((state) => state.uniqueProvinces);
  const [province, setProvince] = useState("All");
  const gState = useSelector((state) => state);
  const [input, setInput] = useState({
    arrivalCityId: "",
    name: "",
    maxDeliveryDate: moment().format("YYYY-MM-DD"),
    userEmail: gState.user.email,
    items: cart,
    totalPrice: cart
    .reduce((acc, item) => acc + item.quantity * item.price, 0)
    .toFixed(2)
  });
  const handleInputChange = (event) => {
    event.preventDefault();
    setInput((prevInput) => {
      return {
        ...prevInput,
        [event.target.name]: event.target.value,
      };
    });
  };
  /* const handleBack = (event) => {
    event.preventDefault();
    event.history.goBack()
  }; */
  useEffect(() => {
    dispatch(getAllProvinces());
    dispatch(getAllCities());
  }, [dispatch]);
  var totalAmount = 0;

  for (let i = 0; i < cart.length; i++) {
    totalAmount = totalAmount + cart[i].price * cart[i].quantity;
  }
  const cardStyle = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: 'Arial, sans-serif',
        fontSmoothing: "antialiased",
        fontSize: "25px",
        "::placeholder": {
          color: "#32325d"
        }
      },
      invalid: {
        fontFamily: 'Arial, sans-serif',
        color: "#fa755a",
        iconColor: "#fa755a"
      }
    }
  };
  const stripe = useStripe();
  const elements = useElements();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
      
    });

    if (!error) {
      const { id } = paymentMethod;
      const datos = await axios.post("/checkout/payment", {
        id: id,
        amount: totalAmount * 100,
        name: input.name, // son 20 dólares
        email: input.userEmail,
      });

      elements.getElement(CardElement).clear();
      dispatch(postPurchase(input));
      swal("Buen trabajo", "La compra fue realizada con exito", "success");
      history.push("/persona/homeUserPurchase");
      dispatch(clearCart());
    } else {
      console.log("Hay un error en el handleSubmit");
    }
  };

  return (
    <div>
      {/* <NavBar/> */}
      <Container>
        <h1 className="shadow-sm mt-5 p-3 text-center rounded" style={{color:"#8c52ff"}}>
          Finalizar Compra
        </h1>
        <Row>
          <Col>
            <div id="page">
              <table id="cart">
                <thead>
                  <tr
                    style={{ display: "flex", justifyContent: "space-around" }}
                  >
                    <th className="first">Imagen</th>
                    <th className="third">Product</th>
                    <th className="fourth">Precio</th>
                    <th className="second">Cant.</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((productGroup) => (
                    <div
                      style={{
                        width: "100%",
                      }}
                      className="containerTable"
                      key={productGroup.id}
                      value={productGroup.id}
                    >
                      <tr
                        style={{
                          width: "100%",
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <td>
                          <div style={{marginLeft: "70px"}}>
                          <img
                            src={productGroup.image}
                            alt=""
                            style={{
                              width: "100px",
                              height: "90px",
                              objetFit: "cover",
                            }}
                          />
                          </div>
                        </td>
                        <td
                          className="item-name"
                          style={{ paddingTop: "30px",marginRight: "50px" }}
                        >
                          {productGroup.name}
                        </td>
                        <td
                          className="item-price"
                          style={{ paddingTop: "30px",marginRight: "50px" }}
                        >
                          ${productGroup.price * productGroup.quantity}
                        </td>
                        <td
                          className="item-quantity"
                          style={{ paddingTop: "30px",marginRight:"100px" }}
                        >
                           {productGroup.quantity}
                        </td>
                      </tr>
                    </div>
                  ))}
                  <hr />
                  PRECIO TOTAL: $ {totalAmount}
                </tbody>
              </table>
            </div>
          </Col>
        </Row>
        <Row>
          <Col
            lg={8}
            md={6}
            sm={12}
            className="text-center p-5 m-auto shadow-sm rounded-lg"
          >
            {/* <img className="iconImg" src={imgIcon} alt="icon" /> */}
            <Form onSubmit={(e) => handleSubmit(e)}>
              <Form.Group>
                {" "}
                {/* WaitingTime */}
                <Form.Label>Fecha limite de espera</Form.Label>
                <Form.Control
                  type="date"
                  placeholder="Espera de producto"
                  value={input.maxDeliveryDate}
                  name="maxDeliveryDate"
                  id="maxDeliveryDate"
                  required
                  onChange={(e) => handleInputChange(e)}
                />
              </Form.Group>

              <Form.Group style={{ marginTop: "15px", marginBottom: "15px" }}>
                <label htmlFor="province">
                  Elija la provincia donde recibira su compra:
                </label>
                <Form.Select
                  name="province"
                  value={input.province}
                  onChange={(e) => handleInputChange(e)}
                >
                  <option value="">{} </option>
                  {gState.provinces?.map((e) => (
                    <option key={e.id} value={e.nombre}>
                      {e.nombre}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
              <Form.Group></Form.Group>
              <Form.Group>
                <Form.Label>
                  Elija la ciudad que desee recibir su compra
                </Form.Label>
                <Form.Select
                  name="arrivalCityId"
                  value={input.arrivalCityId}
                  onChange={(e) => handleInputChange(e)}
                >
                  <option value="">{} </option>

                  {input.province
                    ? gState.allCities
                        ?.filter(
                          (e) =>
                            e.provinceId ===
                            gState.provinces?.filter(
                              (e) => e.nombre === input.province
                            )[0].id
                        )
                        ?.map((e) => (
                          <option key={e.id} name={e.nombre} value={e.id}>
                            {e.nombre}
                          </option>
                        ))
                    : ""}
                </Form.Select>
              </Form.Group>

              <Form.Group style={{marginBottom:"30px"}}>
                <Form.Label></Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Indique su nombre completo"
                  value={input.name}
                  name="name"
                  id="name"
                  required
                  onChange={(e) => handleInputChange(e)}
                />
              </Form.Group>
              
                <CardElement className="tarjetaCredito" options={cardStyle} />
              
              <Row>
                <Col
                  lg={6}
                  md={6}
                  sm={12}
                  className="text-center p-5 m-auto rounded-lg"
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Button onClick={() => history.goBack()} style={{width: "50%"}}>ATRAS</Button>
                  <Button type="submit" >COMPRAR</Button>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
        <h6 className="mt-5 p-5 text-center text-secondary ">
          © 2022 Bring it. All Rights Reserved | Design by Grupo 8 Soy Henry
        </h6>
      </Container>
    </div>
  );
}

export default FormPurchase;
