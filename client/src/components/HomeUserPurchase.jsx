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
    userEmail: gState.user.email,
    productId: 0,
  });
  const handleRating = (input) => {
    setAvgRating(input);
  };
  function handleSubmit(e) {
    e.preventDefault();
    console.log("esto envio ", input);
    dispatch(postReview(input));
    swal(
      "Muchas gracias por tu feedback",
      "Esperemos que sigas eligiendo Bring it",
      "success"
    );
    setInput({
      comment: "",
      rating: "",
    });
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
  useEffect(() => {
    input.userEmail = gState.user.email;
  }, [input.productId]);
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
      status: e.status,
      totalPrice: e.totalPrice,
      cantidad: e.purchaseitems.reduce((a, e) => e.quantity + a, 0),
      producto: e.purchaseitems.map((e) => `${e.productName}, `),
      travel: e.travelId,
      arrivalCityId: gState.allCities.filter(
        (el) => parseInt(el.id) === parseInt(e.arrivalCityId)
      )[0].nombre,
    };
  });

  console.log("nameCity", nameCity);

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
  };

  //manejo de estado listMatch
  const [didMount, setDidMount] = useState(true);
  useEffect(() => {
    if (didMount) {
      setDidMount(false);
      return;
    } else {
      if (listMatch === "clean") {
        return;
      } else if (listMatch === "No existen coincidencias") {
        swal(
          "Todavía no tienes viajeros disponibles",
          "Inténtalo más tarde",
          "error"
        );
        dispatch(cleanGetMatch());
      } else if (typeof listMatch === "object") {
        history.push("/persona/matchTravelsPurchases");
      }
    }
  }, [listMatch]);

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
  const conditionalRowStyles = [
    {
      when: (row) => row.travel !== null,
      style: {
        backgroundColor: "#8c52ff",
        color: "white",
        "&:hover": {
          cursor: "pointer",
        },
      },
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
    {
      name: "Estado de compra",
      selector: (row) => row.status,
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

  var filterByProduct = purchases
    .filter((item) => item.id === show)
    .map((e) => e.purchaseitems)[0];

  return (
    <div>
      {nameCity?.length > 0 ? (
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
                conditionalRowStyles={conditionalRowStyles}
              />
              <hr />
              <br />
              <Modal show={show !== null} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>
                    Dejanos tu comentario sobre el producto que compraste
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form onSubmit={(e) => handleSubmit(e)}>
                    <select
                      name="productId"
                      value={input.productId}
                      onChange={handleInputChange}
                    >
                      <option value="">{}</option>
                      {filterByProduct?.map((e) => (
                        <option key={e.productId} value={e.productId}>
                          {e.productName}
                        </option>
                      ))}
                    </select>
                    <br />
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
            </Col>
          </Row>
          <Row>
            <Button style={{marginLeft:"45%"}} onClick={() => history.push(`/persona`)} >VOLVER</Button>
          </Row>
        </div>
      ) : (
        <div
          style={{
            background: "white",
            color: "#8c52ff",
            fontSize: "20px",
            height: "200px",
          }}
        >
          <br />
          <Row>
            <div style={{ marginTop: "50px" }}>
              <h1>No se encontraron compras asociadas</h1>
            </div>
            <Col
              lg={6}
              md={6}
              sm={12}
              className="text-center p-5 m-auto rounded-lg"
              style={{ display: "flex" }}
            ></Col>
          </Row>
        </div>
      )}
    </div>
  );
}

export default HomeUserPurchase;
