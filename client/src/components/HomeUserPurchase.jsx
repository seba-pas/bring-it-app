import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import DataTable from "react-data-table-component";
import { useDispatch, useSelector } from "react-redux";
import { getByPurchaseEmail, getAllCities } from "../actions";
import { FaSearchLocation } from "react-icons/fa";
import Modal from "react-bootstrap/Modal";
import { BsFillBookmarkStarFill } from "react-icons/bs";
import { useHistory } from "react-router-dom";
import ChangeRating from "./ChangeRating";
import StarRating from "./StarRating";

import moment from "moment";
function HomeUserPurchase() {
  const dispatch = useDispatch();
  const gState = useSelector((state) => state);
  const [show, setShow] = useState(false);
  const history = useHistory();
  const purchases = useSelector((state) => state.purchases);
  const user = useSelector((state) => state.user);
  const [avgRating, setAvgRating] = useState(0);

  const handleRating = (input) => {
    setAvgRating(input);
  };
  const [input, setInput] = useState({
    city: [],
  });
  // console.log(gState);
  const handleBack = (event) => {
    event.preventDefault();
    history.push("/filtro");
  };
  console.log("purchases", purchases);
  const changeCity = purchases;
  console.log("soy changeCity", changeCity);
  const nameCity = changeCity.map((e) => {
    return {
      id: e.id,
      maxDeliveryDate: e.maxDeliveryDate,
      totalPrice: e.totalPrice,
      cantidad: e.purchaseitems.map((e) => e.quantity),
      producto: e.purchaseitems.map((e) => `${e.product.name}, `),
      arrivalCityId: gState.allCities.filter(
        (el) => parseInt(el.id) === parseInt(e.arrivalCityId)
      )[0].nombre,
    };
  });

  console.log("nameCity :>> ", nameCity);
  useEffect(() => {
    dispatch(getByPurchaseEmail(user.email));
    dispatch(getAllCities());
  }, [dispatch]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  function editUsers() {
    alert("PROXIMAMENTE!!!");
  }
  function formatDate(value) {
    return value ? moment(value).format("DD/MM/YYYY") : "";
  }
  // { name: "Fecha de compra" , selector: "last update", sortable: true },
  const columnas = [
    { name: "Nro de orden", selector: (row) => row.id, sortable: true },
    {
      name: "Producto",
      selector: (row) => row.producto,
      sortable: true,
    },
    {
      name: "Fecha de max de espera",
      selector: (row) => formatDate(row.maxDeliveryDate),
      sortable: true,
    },
    { name: "Ciudad", selector: (row) => row.arrivalCityId, sortable: true },
    {
      name: "Cantidad",
      selector: (row) => row.cantidad,
      sortable: true,
    },
    { name: "Precio total", selector: (row) => row.totalPrice, sortable: true },
    {
      button: true,
      cell: () => (
        <button style={{ display: "flex", fontSize: "20px" }}>
          <FaSearchLocation
            title="Encontrar viajero"
            style={{ marginRight: "15px", fontSize: "30px" }}
            onClick={(e) => editUsers(e)}
          />
          <BsFillBookmarkStarFill onClick={handleShow} />
        </button>
      ),
    },
  ];

  return (
    <div>
      <h1 className="shadow-sm text-success mt-5 p-3 text-center rounded">
        Registros de compras
      </h1>
      <Row>
        <Col
          lg={12}
          md={12}
          sm={12}
          className="text-center p-5 m-auto shadow-sm rounded-lg"
        >
          <DataTable
            columns={columnas}
            data={nameCity}
            title="Listado de compras"
          />
          <br />
        </Col>
      </Row>
      <Button onClick={(e) => history.goBack(e)}>Atras</Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            Dejanos tu comentario sobre el producto que compraste
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Productos que adquiriste</h4>
          <Form>
            <h1>Star Rating</h1>
            <ChangeRating rating={avgRating} handleRating={handleRating} />
            <br />
            <br />
            <StarRating stars={avgRating} />
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Deja tu comentario</Form.Label>
              <Form.Control as="textarea" rows={3} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default HomeUserPurchase;
