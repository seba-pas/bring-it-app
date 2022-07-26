import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "../styles/HomePersonas.module.css";
import { SpinnerCircularFixed } from "spinners-react";
import { getUsers, getAllBusiness } from "../actions";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBarAdmin from "./NavBarAdmin";
import DataTable from "react-data-table-component";
import { FaPencilAlt } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";

export default function HomeAdmin() {
  const dispatch = useDispatch();
  const USERS = useSelector((state) => state.users);
  const BUSINESS = useSelector((state) => state.business2);
  const [orden, setOrden] = useState("");

  function deleteUsers() {
    alert("PROXIMAMENTE!!!");
  }
  function deleteBusiness() {
    alert("PROXIMAMENTE!!!");
  }

  function editUsers() {
    alert("PROXIMAMENTE!!!");
  }
  function editBusiness() {
    alert("PROXIMAMENTE!!!");
  }

  useEffect(() => {
    dispatch(getUsers());
    dispatch(getAllBusiness());
  }, [dispatch]);
  const columnas = [
    { name: "Email", selector: "email", sortable: true },
    { name: "Password", selector: "password", sortable: true },
    { name: "Nombre", selector: "name", sortable: true },
    { name: "Apellido", selector: "lastname", sortable: true },
    {
      name: "Fecha de nacimiento",
      selector: "birthDate",
      sortable: true,
    },
    /* { name: "Acciones", selector: "acciones", sortable: true }, */
    {
      button: true,
      cell: () => (
        <button>
          <FaPencilAlt style={{ marginRight: "15px", fontSize: "20px" }} onClick={(e) => editUsers(e)}/>
          <FaTrashAlt
            style={{ fontSize: "20px" }}
            onClick={(e) => deleteUsers(e)}
          />
        </button>
      ),
    },
  ];

  const columnsBusiness = [
    { name: "Email", selector: "email", sortable: true },
    { name: "Password", selector: "password", sortable: true },
    { name: "Nombre Empresa", selector: "businessName", sortable: true },
    { name: "CUIT", selector: "cuit", sortable: true },
    { name: "Provincia", selector: "province", sortable: true },
    { name: "Direccion", selector: "address", sortable: true },
    {
      button: true,
      cell: () => (
        <button>
          <FaPencilAlt style={{ marginRight: "15px", fontSize: "20px" }} onClick={(e) => editBusiness(e)}/>
          <FaTrashAlt
            style={{ fontSize: "20px" }}
            onClick={(e) => deleteBusiness(e)}
          />
        </button>
      ),
    },
  ];

  return (
    <div>
      <NavBarAdmin />
      {USERS.length > 0 ? (
        <div>
          <DataTable
            columns={columnas}
            data={USERS}
            title="Listado de usuarios"
          />
          <br />
          <DataTable
            columns={columnsBusiness}
            data={BUSINESS}
            title="Listado de empresas"
          />
        </div>
      ) : (
        <div className={styles.spinner}>
          <SpinnerCircularFixed
            size={150}
            thickness={100}
            speed={100}
            color="rgba(65, 212, 207, 1)"
            secondaryColor="rgba(0, 0, 0, 1)"
          />
        </div>
      )}
    </div>
  );
}
