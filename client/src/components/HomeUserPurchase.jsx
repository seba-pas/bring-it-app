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
  const [show, setShow] = useState(null);
  const history = useHistory();
  const purchases = useSelector((state) => state.purchases);
  const user = useSelector((state) => state.user);
  const [avgRating, setAvgRating] = useState(0);
  const [selectedData, setSelectedData] = useState();
  const handleRating = (input) => {
    setAvgRating(input);
    console.log(input)
  };

  function handleSubmit(e) {
    e.preventDefault();
  }
/*   const handleInputChange = (event) => {
    event.preventDefault();
    setInput((prevInput) => {
      return {
        ...prevInput,
        [event.target.name]: event.target.value,
      };
    });
  }; */
  
  const handleBack = (event) => {
    event.preventDefault();
    history.push("/filtro");
  };
  const changeCity = purchases;
  const nameCity = changeCity.map((e) => {
    return {
      idProducts: e.purchaseitems.map((e) => e.productId),
      id: e.id,
      maxDeliveryDate: e.maxDeliveryDate,
      totalPrice: e.totalPrice,
      cantidad: e.purchaseitems.reduce((a, e) => e.quantity + a, 0),
      producto: e.purchaseitems.map((e) => `${e.product.name}, `),
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
  function editUsers() {
    alert("PROXIMAMENTE!!!");
  }
  const handleChange = (state) => {
    setSelectedData(state.selectedRows);
  };
  function formatDate(value) {
    return value ? moment(value).format("DD/MM/YYYY") : "";
  }
  const columnasRating = [
    { name: "Nro de orden", selector: (row) => row.id, sortable: true },
    {
      name: "Producto",
      selector: (row) => row.producto,
      sortable: true,
    },
  ];
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
            onClick={(e) => editUsers(e)}
          />
          <BsFillBookmarkStarFill onClick={() => handleShow(row.id)} />
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
          <hr />
          <br />
        </Col>
      </Row>
      <Button onClick={(e) => history.goBack(e)}>Atras</Button>
      <Modal show={show !== null} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            Dejanos tu comentario sobre el producto que compraste
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <DataTable
            columns={columnasRating}
            data={nameCity.filter((item) => item.id === show)}
            title="Listado de compras"
          />
          <br />
          <Form onSubmit={(e) => handleSubmit(e)}>
            <Form.Label style={{ paddingBottom: "15px" }}>
              Indica del 1 al 5 que tan satisfecho esta con su compra
            </Form.Label>
            <ChangeRating
              rating={avgRating}
              handleRating={handleRating}
            />
            <br />
            <br />
            <StarRating stars={avgRating} />
            <Form.Group className="mb-3">
              <Form.Label>Deja tu comentario</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="comentario"
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
