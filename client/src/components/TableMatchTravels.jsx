import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import DataTable from "react-data-table-component";
import moment from "moment";
import { BsCheckCircleFill } from "react-icons/bs";
import { BsCardChecklist } from "react-icons/bs";
import { putMatch } from "../actions";
import swal from "sweetalert";
function TableMatchTravels() {
  const match = useSelector((state) => state.listTravelsMatch);
  const idPurchase = useSelector((state) => state.idPurchase)
  const gState = useSelector((state) => state);
  const tableMatch = match;
  const listMatch = tableMatch.map((e) => {
    return {
      arrivalCityId: gState.allCities.filter(
        (el) => parseInt(el.id) === parseInt(e.arrivalCityId)
      )[0].nombre,
      arrivalDate: e.arrivalDate,
      arrivalProvince: e.arrivalProvince,
      id: e.id,
      startDate: e.startDate,
      travelCityId: gState.allCities.filter(
        (el) => parseInt(el.id) === parseInt(e.travelCityId)
      )[0].nombre,
      travelProvince: e.travelProvince,
      userEmail: e.userEmail,
    };
  });
  const matchDef = (idPurchase, idTravels) => {
    dispatch(putMatch(idPurchase, idTravels));
    swal("Match correcto", "Felicitaciones", "success");
  };

  //   const allTravels = useSelector((state) => state.allTravels);
  function formatDate(value) {
    return value ? moment(value).format("DD/MM/YYYY") : "";
  }

  const columnasTravels = [
    {
      name: "Origen",
      selector: (row) => row.travelProvince,
      sortable: true,
    },
    {
      name: "Ciudad origen",
      selector: (row) => row.travelCityId,
      sortable: true,
    },

    { name: "Destino", selector: (row) => row.arrivalProvince, sortable: true },
    {
      name: "Ciudad destino",
      selector: (row) => row.arrivalCityId,
      sortable: true,
    },
    {
      name: "Fecha de inicio",
      selector: (row) => formatDate(row.startDate),
      sortable: true,
    },
    {
      name: "Fecha de llegada",
      selector: (row) => formatDate(row.arrivalDate),
      sortable: true,
    },
    { name: "Email", selector: (row) => row.userEmail, sortable: true },
    {
      button: true,
      cell: () => (
        <button style={{ display: "flex" }}>
          <BsCardChecklist
            style={{ marginRight: "15px", fontSize: "20px" }}
            onClick={(e) => editUsers(e)}
          />
          <BsCheckCircleFill
            style={{ fontSize: "20px" }}
            onClick={(e) => deleteUsers(e)}
          />
        </button>
      ),
    },
  ];
  return (
    <div>
      <DataTable
        columns={columnasTravels}
        data={listMatch}
        title="Viajeros disponibles"
        style={{ marginBottom: "30px" }}
      />
    </div>
  );
}

export default TableMatchTravels;
