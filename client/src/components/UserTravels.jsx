import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPurchases, getAllTravel } from "../actions";
import styles from "../styles/UserTravels.module.css";
import ProducTravelCard from "./ProducTravelCard";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { SpinnerCircularFixed } from "spinners-react";
import DataTable from "react-data-table-component";
import { FaPencilAlt } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";
import moment from "moment";
import { useHistory } from "react-router-dom";

function UserTravels() {
  const gState = useSelector((state) => state);
  const dispatch = useDispatch();
  const history = useHistory();
  const [input, setInput] = useState({
    travels: [],
  });
  function formatDate(value) {
    return value ? moment(value).format("DD/MM/YYYY") : "";
  }
  useEffect(() => {
    dispatch(getAllTravel());
    dispatch(getAllPurchases());
  }, [dispatch]);

  useEffect(() => {
    setInput((prevInput) => {
      return {
        ...prevInput,
        travels: gState.allTravels.filter(
          (e) => e.userEmail === gState.user.email
        ),
        // editTravels: input.travels.length > 0 ? input.travels.map(e => e.travelCityId = gState.allCities.filter(el => parseInt(el.id) === parseInt(e.travelCityId))[0].nombre) : [],
      };
    });
  }, gState.allTravels);

  let toChange = input.travels;
  let changedCityNames = toChange.map((e) => {
    return {
      id: e.id,
      startDate: e.startDate,
      travelProvince: e.travelProvince,
      travelCityId: gState.allCities.filter(
        (el) => parseInt(el.id) === parseInt(e.travelCityId)
      )[0].nombre,
      arrivalDate: e.arrivalDate,
      arrivalProvince: e.arrivalProvince,
      arrivalCityId: gState.allCities.filter(
        (el) => parseInt(el.id) === parseInt(e.arrivalCityId)
      )[0].nombre,
    };
  });

  const idsTravels = changedCityNames.map(e => e.id)
  // const allPurchasesA = gState.allPurchases.filter(e => e.travelId !== null).filter(el => idsTravels.includes(el.travelId)).map(ele => swal("Felicitaciones", `el usuario ${ele.user.email} acepto que transporte sus productos`, "success"))



  function deleteTravel(id) {

  }

  function editUsers() {
    alert("PROXIMAMENTE!!!");
  }

  const conditionalRowStyles = [
    {
      when: row => gState.allPurchases.filter(e => e.travelId !== null).filter(el => el.travelId === row.id).length > 0,
      style: {
        backgroundColor: '#8c52ff',
        color: 'white',
        '&:hover': {
          cursor: 'pointer',
        },
      },
    },

  ];
  const columnas = [
    {
      name: "Fecha",
      selector: (row) => formatDate(row.startDate),
      sortable: true,
    },
    {
      name: "Provincia",
      selector: (row) => row.travelProvince,
      sortable: true,
    },
    { name: "Ciudad", selector: (row) => row.travelCityId, sortable: true },
    {
      name: "Fecha Llegada",
      selector: (row) => formatDate(row.arrivalDate),
      sortable: true,
    },
    {
      name: "Provincia",
      selector: (row) => row.arrivalProvince,
      sortable: true,
    },
    { name: "Ciudad", selector: (row) => row.arrivalCityId, sortable: true },
    {
      button: true,
      cell: () => (
        <button>
          {/* <FaPencilAlt
            style={{ marginRight: "15px", fontSize: "20px" }}
            onClick={(e) => editTravel(e)}
          /> */}
          <FaTrashAlt
            style={{ fontSize: "20px" }}
            onClick={(e) => deleteTravel(e)}
          />
        </button>
      ),
    },
  ];

  return (
    <div>
      {changedCityNames?.length > 0 ? (
        <div>
          <DataTable
            columns={columnas}
            data={changedCityNames}
            title="Listado de viajes"
            conditionalRowStyles={conditionalRowStyles}
          />
          <br />
          <Row>
            <Col
              lg={6}
              md={6}
              sm={12}
              className="text-center p-5 m-auto rounded-lg"
              style={{ display: "flex" }}
            >
            </Col>
          </Row>
        </div>
      ) : (
        <div style={{ background: 'white', color:'#8c52ff', fontSize: '20px', height: '200px' }}>
          <br />
          <Row>
            <div style={{ marginTop: '50px' }}>
              <h1 >No se encontraron viajes asociados</h1>
            </div>
            <Col
              lg={6}
              md={6}
              sm={12}
              className="text-center p-5 m-auto rounded-lg"
              style={{ display: "flex" }}
            >
            </Col>
          </Row>
        </div>
      )}
    </div>
  );
}

export default UserTravels;
