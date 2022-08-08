import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DataTable from "react-data-table-component";
import moment from "moment";
import { BsCheckCircleFill } from "react-icons/bs";
import { BsCardChecklist } from "react-icons/bs";
import { putMatch , cleanMatch} from "../actions";
import swal from "sweetalert";
function TableMatchTravels() {
  const match = useSelector((state) => state.listTravelsMatch);
  const idPurchase = useSelector((state) => state.idPurchase)
  const gState = useSelector((state) => state);
  const tableMatch = match;
  const dispatch = useDispatch();
  const listMatch = tableMatch?.map((e) => {
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
  const matchDef = (idTravels) => {
    dispatch(putMatch(idPurchase, idTravels));
    
  };

  const matchOk = useSelector((state) => state.matchOk);
  const [didMount, setDidMount] = useState(true);
  useEffect(() => {
    if (didMount) {
      setDidMount(false);
      return;
    } else {
      if (matchOk === "clean") {
        return ;
      } else if (matchOk === "Matcheado con éxito") {
        swal("Match correcto", "Verifique su correo electronico asi podra contactarse con el viajero", "success");
        dispatch(cleanMatch());
      } else if (matchOk === "La compra ya cuenta con viajero") {
        swal("La compra ya cuenta con viajero", "Lo sentimos", "error");
        dispatch(cleanMatch());
      }
    }
  }, [matchOk]);

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
      cell: (row) => (
        <button style={{ display: "flex" }}>
          {/* <BsCardChecklist
            style={{ marginRight: "15px", fontSize: "20px" }}
            onClick={(e) => editUsers(e)}
          /> */}
          <BsCheckCircleFill
          title="Confirmar match"
            style={{ fontSize: "20px" }}
            onClick={() => matchDef(row.id)}
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
