import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import DataTable from "react-data-table-component";

function HomeUserPurchase() {
  function editUsers() {
    alert("PROXIMAMENTE!!!");
  }
  function editBusiness() {
    alert("PROXIMAMENTE!!!");
  }
  const columnas = [
    { name: "Image Product"/* , selector: "email" */, sortable: true },
    { name: "Producto"/* , selector: "password" */, sortable: true },
    { name: "Provincia elegida"/* , selector: "name" */, sortable: true },
    { name: "Ciudad elegida"/* , selector: "lastname" */, sortable: true },
    { name: "Fecha Limite"/* , selector: "birthDate" */, sortable: true },
    {
      button: true,
      cell: () => (
        <button>
          <FaPencilAlt
            style={{ marginRight: "15px", fontSize: "20px" }}
            onClick={(e) => editUsers(e)}
          />
          <FaTrashAlt
            style={{ fontSize: "20px" }}
            onClick={(e) => deleteUsers(e)}
          />
        </button>
      ),
    },
  ];
  return (
    <div>
      <Container>
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
              /* data={USERS} */
              title="Listado de compras"
            />
            <br />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default HomeUserPurchase;
