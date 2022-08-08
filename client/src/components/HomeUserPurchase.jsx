import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import DataTable from "react-data-table-component";
import { useDispatch, useSelector } from "react-redux";
import {
  getByPurchaseEmail,
  getAllCities,
  postReview,
  getMatch,
  cleanGetMatch,
  setProduct,
} from "../actions";
import { FaSearchLocation } from "react-icons/fa";
import Modal from "react-bootstrap/Modal";
import { BsFillBookmarkStarFill } from "react-icons/bs";

import { useHistory } from "react-router-dom";
// import ChangeRating from "./ChangeRating";
import StarRating from "./StarRating";
import moment from "moment";
function HomeUserPurchase() {
  const dispatch = useDispatch();
  const gState = useSelector((state) => state);
  const [show, setShow] = useState(null);
  const history = useHistory();
  const purchases = useSelector((state) => state.purchases);
  const user = useSelector((state) => state.user);
  const [avgRating, setAvgRating] = useState(0);
  const [selectedData, setSelectedData] = useState();
  const listMatch = useSelector((state) => state.listTravelsMatch);
  const [input, setInput] = useState({
    comment: "",
    rating: "",
    userEmail: user.email,
    // productId: purchases.filter(e => e.id === e)
  });

  const handleRating = (input) => {
    setAvgRating(input);
  };
  function handleSubmit(e) {
    e.preventDefault();
    dispatch(postReview(input));
    swal(
      "Muchas gracias por tu feedback",
      "Esperemos que sigas eligiendo Bring it",
      "success"
    );
  }
  const handleInputChange = (event) => {
    event.preventDefault();

    setInput((prevInput) => {
      return {
        ...prevInput,
        [event.target.name]: event.target.value,
      };
    });
  };
  useEffect(() => {
    handleRating(input.rating);
  }, [input.rating]);
  const handleBack = (event) => {
    event.preventDefault();
    history.push("/persona/filtro");
  };
  const changeCity = purchases;
  const nameCity = changeCity.map((e) => {
    return {
      productId: e.purchaseitems.map((e) => e.productId),
      id: e.id,
      maxDeliveryDate: e.maxDeliveryDate,
      lastUpdate: e.lastUpdate,
      province: e.province,
      totalPrice: e.totalPrice,
      cantidad: e.purchaseitems.reduce((a, e) => e.quantity + a, 0),
      producto: e.purchaseitems.map((e) => `${e.productName}, `),
      arrivalCityId: gState.allCities.filter(
        (el) => parseInt(el.id) === parseInt(e.arrivalCityId)
      )[0].nombre,
    };
  });

  useEffect(() => {
    dispatch(getByPurchaseEmail(user.email));
    dispatch(getAllCities());
  }, [dispatch]);

  const handleClose = () => setShow(null);
  const handleShow = (id) => {
    setShow((showId) => (showId === id ? null : id));
  };
  const searchMatch = (idPurchase) => {
    dispatch(getMatch(idPurchase));
    history.push("/persona/matchTravelsPurchases");
    // dispatch(cleanGetMatch());
  };
  const handleChange = (state) => {
    setSelectedData(state.selectedRows);
  };
  function formatDate(value) {
    return value ? moment(value).format("DD/MM/YYYY") : "";
  }
  const columnasRating = [
    { name: "Nro de orden", selector: (row) => row.id, sortable: true },
    {
      name: "Fecha de compra",
      selector: (row) => formatDate(row.lastUpdate),
      sortable: true,
    },

    {
      name: "Producto",
      selector: (row) => row.producto,
      sortable: true,
    },
  ];
  const columnas = [
    { name: "Nro de orden", selector: (row) => row.id, sortable: true },
    {
      name: "Fecha de compra",
      selector: (row) => formatDate(row.lastUpdate),
      sortable: true,
    },

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
    { name: "Provincia", selector: (row) => row.province, sortable: true },
    { name: "Ciudad", selector: (row) => row.arrivalCityId, sortable: true },
    {
      name: "Cantidad Total",
      selector: (row) => row.cantidad,
      sortable: true,
    },
    { name: "Precio total", selector: (row) => row.totalPrice, sortable: true },
    {
      button: true,
      cell: (row) => (
        <button style={{ display: "flex", fontSize: "20px" }}>
          <FaSearchLocation
            title="Encontrar viajero"
            style={{ marginRight: "15px", fontSize: "30px" }}
            onClick={() => searchMatch(row.id)}
          />
          <BsFillBookmarkStarFill
            onClick={() => handleShow(row.id)}
            style={{ fontSize: "30px" }}
          />
        </button>
      ),
    },
  ];
  var filterByProduct = purchases.filter((item) => item.id === show);
  console.log(nameCity.productId);
  // console.log('soy filterByProduct',filterByProduct[0][purchaseitems]);
  /* var filtrado = filterByProduct.forEach((e) => { */
  /* console.log(e.purchaseitems); */ /* .map((y) => {
      var products = { productId: y.productId, productName: y.productName };
      debugger;
    }); */
  /* }); */

  return (
    <div>
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
          <hr />
          <br />
        </Col>
      </Row>
      {/* <Button onClick={(e) => history.goBack(e)}>Atras</Button> */}
      <Modal show={show !== null} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            Dejanos tu comentario sobre el producto que compraste
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* <select> */}
          {/*  {console.log(filterByProduct[0].id)} */}{" "}
          {/* /* && filterByProduct[0].purchaseitems.map((e) => (
              <option key={e.productId} value={e.productId}>
                {e.productName}
              </option>
            ))} */}
          {/* </select> */}
          {/* <DataTable
            columns={columnasRating}
           
            title="Listado de compras"
          /> */}
          <br />
          <Form onSubmit={(e) => handleSubmit(e)}>
            <Form.Label style={{ paddingBottom: "15px" }}>
              Indica del 1 al 5 que tan satisfecho esta con su compra
            </Form.Label>
            <input
              type="number"
              step="0.1"
              min="0"
              max="5"
              name="rating"
              rating={avgRating}
              value={input.rating}
              handleRating={handleRating}
              onChange={(e) => handleInputChange(e)}
            />
            <br />
            <br />
            <StarRating stars={avgRating} />
            <Form.Group className="mb-3">
              <Form.Label>Deja tu comentario</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={input.comment}
                name="comment"
                required
                onChange={(e) => handleInputChange(e)}
              />
            </Form.Group>
            <Button className="mt-3 mb-5 w-100 mt-3" type="submit">
              Enviar comentario
            </Button>
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
