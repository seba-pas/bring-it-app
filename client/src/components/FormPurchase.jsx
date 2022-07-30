import {React,useState, useEffect} from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useSelector,useDispatch } from "react-redux";
// import CheckOut from "./Stripe/CheckOut";
import axios from 'axios';
import {CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
// import NavBar from "./NavBar";

function FormPurchase() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  // const PROVINCES = useSelector((state) => state.uniqueProvinces);
  // const [province, setProvince] = useState("All");

  // const handleInputChange = (event) => {
  //   event.preventDefault();
  //   setInput((prevInput) => {
  //     return {
  //       ...prevInput,
  //       [event.target.name]: event.target.value,
  //     };
  //   });
  // };

  // console.log(cart);this.fechaDesde = moment().format("YYYY-MM-01");
  // function handleFilterByProvinces(e) {
  //   e.preventDefault();
  //   setProvince(e.target.value);
  //   dispatch(filterByProvinces(e.target.value));
  // }
  //funcion para filtrar por ciduades
  // function handleFilterByCities(e) {
  //   e.preventDefault();
  //   // setProvince(e.target.value);
  //   dispatch(filterByProvinceCity(e.target.value));
  // }
  // useEffect(() => {
  //   dispatch(getAllProvinces());
  //   dispatch(getAllCities());
  // }, [dispatch]);


  const stripe = useStripe();
  const elements = useElements();
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement)
    });


    if(!error) {

      
        const { id } = paymentMethod;
        console.log(id);
        const datos = await axios.post('http://localhost:3001/api/checkout/payment', {
          id: id,
          amount: (20 * 100) // son 20 dólares
      });
      
      console.log(datos)
      
      elements.getElement(CardElement).clear();
      
      
    } else {
      console.log("Hay un error en el handleSubmit")
    }
  }





  return (
    <div>
      {/* <NavBar/> */}
      <Container>
        <h1 className="shadow-sm text-success mt-5 p-3 text-center rounded">
          Finalizar Compra
        </h1>
        <Row>
          <Col>
            <ul>
              {cart.map((productGroup) => (
                <li
                  className="clearfix"
                  key={productGroup.id}
                  value={productGroup.id}
                  style={{ listStyle: "none" }}
                >
                  {/* <img
              src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/cart-item1.jpg"
              alt="item1"
            /> */}
                  <img
                    src={productGroup.image}
                    alt=""
                    style={{
                      width: "100px",
                      height: "90px",
                      objetFit: "cover",
                    }}
                  />
                  <span className="item-name">{productGroup.name}</span>
                  <span className="item-price">
                    ${productGroup.price * productGroup.quantity}
                  </span>
                  <span className="item-quantity">
                    Cantidad: {productGroup.quantity}
                  </span>
                  {/* <button onClick={() => handleRemoveOne(productGroup.id)}>
                    Eliminar uno
                  </button>
                  <button
                    onClick={() => handleRemoveOne(productGroup.id, true)}
                  >
                    Eliminar todos
                  </button> */}
                </li>
              ))}
            </ul>
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
                  // value={province}
                >
                 {/*  <option value="All">Todas</option>

                  {PROVINCES.map((province) => {
                    return (
                      <option value={province} key={province}>
                        {province}
                      </option>
                    );
                  })} */}
                </select>
              </Form.Group>
              <Form.Group>
                <Form.Label>Llegada a la ciudad</Form.Label>
                <select
                  name="cityId"
                  // value={input.cityId}
                  // onChange={(e) => handleInputChange(e)}
                >
                  {/* <option value="">{} </option>

                  {
                    // gState.cities?.map(e => <option key={e.id} value={e.nombre}>{e.nombre}</option>)
                    input.province
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
                      : ""
                  } */}
                </select>
              </Form.Group>
              <Form.Group>
                <Form.Label></Form.Label>
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
