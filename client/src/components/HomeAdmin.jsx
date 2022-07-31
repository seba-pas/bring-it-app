import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "../styles/HomePersonas.module.css";
import { SpinnerCircularFixed } from "spinners-react";
import { getUsers, getAllBusiness,getAllProducts,getAllTravel} from "../actions";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBarAdmin from "./NavBarAdmin";
import DataTable from "react-data-table-component";
import { FaPencilAlt } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";
import moment from 'moment'

export default function HomeAdmin() {
  const dispatch = useDispatch();
  const USERS = useSelector((state) => state.users);
  const products = useSelector((state) => state.products);
  const BUSINESS = useSelector((state) => state.business2);
  const allTravels = useSelector((state) => state.allTravels)
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
    dispatch(getAllProducts());
    dispatch(getUsers());
    dispatch(getAllBusiness());
    dispatch(getAllTravel())
  }, [dispatch]);


  const columnasTravels = [
    { name: "Provincia a viajar", selector:row => row.travelProvince, sortable: true },
    { name: "Destino", selector: row => row.arrivalProvince, sortable: true },
    { name: "Fecha de inicio", selector: row => row.startDate, sortable: true },
    { name: "Fecha de llegada", selector:row => row.arrivalDate, sortable: true },
    { name: "Email", selector: row => row.userEmail, sortable: true },
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
  ]

  const columnasProducts = [
    { name: "Nombre", selector: row => row.name, sortable: true },
    { name: "Precio", selector: row => row.price, sortable: true },
    { name: "Peso del producto", selector: row => row.weight, sortable: true },
    { name: "Stock", selector: row => row.stock, sortable: true },
    { name: "Descripcion", selector: row => row.description, sortable: true },
    { name: "Empresa asociada", selector: row => row.businessbranch.businessBranchName, sortable: true },

    // { name: "Categorias", selector: "lastname", sortable: true },
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

  ]

  const columnas = [
    { name: "Email", selector: row => row.email, sortable: true },
    { name: "Nombre", selector: row => row.name, sortable: true },
    { name: "Apellido", selector: row => row.lastname, sortable: true },
    {
      name: "Fecha de nacimiento",
      selector: row => row.birthDate,
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
    { name: "Email", selector: row => row.email, sortable: true },
    { name: "Nombre Empresa", selector: row => row.businessName, sortable: true },
    { name: "CUIT", selector: row => row.cuit, sortable: true },
    { name: "Telefono", selector: row => row.phone, sortable: true },
    { name: "Categoria tributaria", selector: row => row.taxBracket, sortable: true },
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
        <>
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
          <DataTable
            columns={columnasProducts}
            data={products}
            title="Listado de productos"
          />
          <DataTable
            columns={columnasTravels}
            data={allTravels}
            title="Listado de viajeros"
            style={{marginBottom:"30px"}}
          />
        </div>
        <h6 className="mt-5 p-5 text-center text-secondary ">
          © 2022 Bring it. All Rights Reserved | Design by Grupo 8 Soy Henry
        </h6>
        {/* <div style={{marginTop:"80px"}}>
        
        </div> */}
        </>
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
