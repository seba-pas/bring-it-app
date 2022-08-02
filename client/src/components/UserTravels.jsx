import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllTravel } from "../actions";
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
  }, [dispatch]);
  const handleBack = (event) => {
    event.preventDefault();
    history.push("/persona");
  };
  useEffect(() => {
    setInput((prevInput) => {
      return {
        ...prevInput,
        travels: gState.allTravels.filter(
          (e) => e.userEmail === gState.user.others.dataValues.email
        ),
        // editTravels: input.travels.length > 0 ? input.travels.map(e => e.travelCityId = gState.allCities.filter(el => parseInt(el.id) === parseInt(e.travelCityId))[0].nombre) : [],
      };
    });
  }, gState.allTravels);

  let toChange = input.travels;
  let changedCityNames = toChange.map((e) => {
    return {
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
  console.log(changedCityNames);

  function deleteTravel() {
    alert("PROXIMAMENTE!!!");
  }

  function editUsers() {
    alert("PROXIMAMENTE!!!");
  }

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
          <FaPencilAlt
            style={{ marginRight: "15px", fontSize: "20px" }}
            onClick={(e) => editTravel(e)}
          />
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
      <Container>
        <h1 className="shadow-sm text-success mt-5 p-3 text-center rounded">
          Mis Viajes
        </h1>
        {changedCityNames.length > 0 ? (
          <div>
            <DataTable
              columns={columnas}
              data={changedCityNames}
              title="Listado de viajes"
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
                {/* <Button
                  onClick={() => history.goBack()}
                  style={{ marginLeft: "45%" }}
                >
                  ATRAS
                </Button> */}
              </Col>
            </Row>
          </div>
        ) : (

          <div></div>
        )}
        <Button onClick={(e) => handleBack(e)}>Atras</Button>
      </Container>



    </div>
  );
}

export default UserTravels;
// <div className={styles.travels} >
//     <div className={styles.container}>
//         <div className={styles.tableContainer}>
//             {<table>
//                 <thead>
//                     <tr className={styles.trStyle}>

//                         <th>Origen</th>
//                         <th>Destino</th>
//                         <th>Actions</th>

//                     </tr>
//                 </thead>
//                 <tbody>

//                     {input.travels?.map(c => {
//                         return (
//                             <ProducTravelCard key={c.id} id={c.id} arrivalCityId={c.arrivalCityId} arrivalDate={c.arrivalDate} arrivalProvince={c.arrivalProvince} startDate={c.startDate} travelCityId={c.travelCityId} travelProvince={c.travelProvince} />
//                         )
//                     })}
//                 </tbody>
//             </table>
//             }
//         </div>
//     </div>
// </div>
