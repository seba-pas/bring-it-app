import { React, useState, useEffect } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
// import CheckOut from "./Stripe/CheckOut";
import { getAllProvinces, getAllCities } from "../actions/index.js";
import axios from "axios";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
// import NavBar from "./NavBar";

function FormPurchase() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const PROVINCES = useSelector((state) => state.uniqueProvinces);
  const [province, setProvince] = useState("All");
  const gState = useSelector((state) => state);
  const [input, setInput] = useState({
    cityId: "",
    province: "",
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
  //funcion para filtrar por provincias
  // function handleFilterByProvinces(e) {
  //   e.preventDefault();
  //   setInput({
  //     ...input,
  //     province: e.target.value,
  //   });
  //   dispatch(filterByProvinceCity(e.target.value));
  // }

  useEffect(() => {
    dispatch(getAllProvinces());
    dispatch(getAllCities());
  }, [dispatch]);

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
      console.log(id);
      const datos = await axios.post(
        "/checkout/payment",
        {
          id: id,
          amount: 20 * 100, // son 20 dólares
        }
      );

      console.log(datos);

      elements.getElement(CardElement).clear();
    } else {
      console.log("Hay un error en el handleSubmit");
    }
  };

  return (
    <div>
      {/* <NavBar/> */}
      <Container>
        <h1 className="shadow-sm text-success mt-5 p-3 text-center rounded">
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
                          <img
                            src={productGroup.image}
                            alt=""
                            style={{
                              width: "100px",
                              height: "90px",
                              objetFit: "cover",
                            }}
                          />
                        </td>
                        <td
                          className="item-name"
                          style={{ paddingTop: "30px" }}
                        >
                          {productGroup.name}
                        </td>
                        <td
                          className="item-price"
                          style={{ paddingTop: "30px" }}
                        >
                          ${productGroup.price * productGroup.quantity}
                        </td>
                        <td
                          className="item-quantity"
                          style={{ paddingTop: "30px" }}
                        >
                          Cantidad: {productGroup.quantity}
                        </td>
                      </tr>
                    </div>
                  ))}
                  <hr />
                  PRECIO TOTAL:{" "}
                  {cart
                    .reduce((acc, item) => acc + item.quantity * item.price, 0)
                    .toFixed(2)}
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
                <Form.Label>Fecha limite de producto</Form.Label>
                <Form.Control
                  type="date"
                  placeholder="Espera de producto"
                  // value={input.birthDate}
                  name="birthDate"
                  id="birthDate"
                  required
                />
              </Form.Group>

              <Form.Label>Provincia</Form.Label>
              <Form.Group>
                <label htmlFor="province">Provincia:</label>
                <select
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
                </select>
              </Form.Group>
              <Form.Group>
                <Form.Label>Llegada a la ciudad</Form.Label>
              </Form.Group>
              <Form.Group>
                <Form.Label></Form.Label>
                <select
                  name="cityId"
                  value={input.cityId}
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
                </select>
              </Form.Group>

              <CardElement />
              <Button
                variant="primary"
                className="mt-3 mb-5 w-100 mt-3"
                type="submit"
              >
                FINALIZAR COMPRA
              </Button>
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
