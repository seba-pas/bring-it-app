import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "../styles/HomePersonas.module.css";
import { SpinnerCircularFixed } from "spinners-react";
import {
  getUsers,
  getAllBusiness,
  getAllProducts,
  getAllTravel,
  getByPurchaseEmail,
  deleteBusiness,
  deleteUser,
} from "../actions";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBarAdmin from "./NavBarAdmin";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import DataTable from "react-data-table-component";
import { FaPencilAlt } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";
import moment from "moment";
import { FaSearchLocation } from "react-icons/fa";
import swal from "sweetalert";

export default function HomeAdmin() {
  const [key, setKey] = useState("home");
  const dispatch = useDispatch();
  const userPurchase = useSelector((state) => state.user);
  const USERS = useSelector((state) => state.users);
  const gState = useSelector((state) => state);
  console.log(gState);
  const purchases = useSelector((state) => state.purchases);
  const products = useSelector((state) => state.products);
  const BUSINESS = useSelector((state) => state.business2);
  const allTravels = useSelector((state) => state.allTravels);
  const [orden, setOrden] = useState("");
  const userToken = useSelector((state) => state.userToken);
  const [q, setQ] = useState("");

  function formatDate(value) {
    return value ? moment(value).format("DD/MM/YYYY") : "";
  }

  function banearUsers(e, email) {
    e.preventDefault();
    dispatch(deleteUser(email, userToken));
    swal(
      "El usuario ha sido bloqueado con éxito",
      "Gracias por usar Bring it!",
      "success"
    );
  }

  function banearBusiness(e, email) {
    e.preventDefault();
    dispatch(deleteBusiness(email, userToken));
    swal(
      "La empresa ha sido bloqueada con éxito",
      "Gracias por usar Bring it!",
      "success"
    );
  }

  function editUsers() {
    alert("PROXIMAMENTE!!!");
  }
  function editBusiness() {
    alert("PROXIMAMENTE!!!");
  }

  useEffect(() => {
    dispatch(getByPurchaseEmail(userPurchase.email));
    dispatch(getAllProducts());
    dispatch(getUsers());
    dispatch(getAllBusiness());
    dispatch(getAllTravel());
  }, [dispatch]);

  function searchProduct(rows) {
    return rows.filter(
      (row) =>
        row.name.toLowerCase().indexOf(q) > -1 ||
        row.price.toString().toLowerCase().indexOf(q) > -1 ||
        row.weight.toString().toLowerCase().indexOf(q) > -1 ||
        row.stock.toString().toLowerCase().indexOf(q) > -1 ||
        row.description.toLowerCase().indexOf(q) > -1 ||
        row.businessbranch.businessBranchName.toLowerCase().indexOf(q) > -1
    );
  }

  function searchUsers(rows) {
    return rows.filter(
      (row) =>
        row.name.toLowerCase().indexOf(q) > -1 ||
        row.email.toLowerCase().indexOf(q) > -1 ||
        row.lastname.toLowerCase().indexOf(q) > -1 ||
        row.birthDate.toLowerCase().indexOf(q) > -1
    );
  }

  function searchBusiness(rows) {
    return rows.filter(
      (row) =>
        row.email.toLowerCase().indexOf(q) > -1 ||
        row.businessName.toLowerCase().indexOf(q) > -1 ||
        row.cuit.toLowerCase().indexOf(q) > -1 ||
        row.phone.toLowerCase().indexOf(q) > -1 ||
        row.taxBracket.toLowerCase().indexOf(q) > -1
    );
  }

  function searchTravels(rows) {
    return rows.filter(
      (row) =>
        row.travelProvince.toLowerCase().indexOf(q) > -1 ||
        row.arrivalProvince.toLowerCase().indexOf(q) > -1 ||
        row.startDate.toLowerCase().indexOf(q) > -1 ||
        row.arrivalDate.toLowerCase().indexOf(q) > -1 ||
        row.userEmail.toLowerCase().indexOf(q) > -1
    );
  }

   /* function searchPurchases(rows) {
     debugger;
    return rows.filter((row) => 
    console.log(row) && 
     row.id.toLowerCase().indexOf(q) > -1 ||
    row.purchaseitems.toLowerCase().indexOf(q) > -1 ||
    row.maxDeliveryDate.toLowerCase().indexOf(q) > -1 ||
    row.name.toLowerCase().indexOf(q) > -1 ||
    row.quantity.toLowerCase().indexOf(q) > - 1 ||
    row.totalPrice.toLowerCase().indexOf(q) > - 1
    );
  };  */

  const columnasPurchases = [
    { name: "Nro de orden", selector: (row) => row.id, sortable: true },
    {
      name: "Producto",
      selector: (row) => row.purchaseitems.map((e) => `${e.product.name}, `),
      sortable: true,
    },
    {
      name: "Fecha de max de espera",
      selector: (row) => row.maxDeliveryDate,
      sortable: true,
    },
    {
      name: "Cantidad",
      selector: (row) => row.purchaseitems.map((e) => e.quantity),
      sortable: true,
    },
    { name: "Precio total", selector: (row) => row.totalPrice, sortable: true },
    {
      button: true,
      cell: () => (
        <button style={{ display: "flex" }}>
          <FaPencilAlt
            style={{ marginRight: "15px", fontSize: "20px" }}
            onClick={(e) => editBusiness(e)}
          />
          <FaTrashAlt
            style={{ fontSize: "20px" }}
            onClick={(e) => deleteBusiness(e)}
          />
        </button>
      ),
    },
  ];
  const columnasTravels = [
    {
      name: "Provincia a viajar",
      selector: (row) => row.travelProvince,
      sortable: true,
    },
    { name: "Destino", selector: (row) => row.arrivalProvince, sortable: true },
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

  const columnasProducts = [
    { name: "Nombre", selector: (row) => row.name, sortable: true },
    { name: "Precio", selector: (row) => row.price, sortable: true },
    {
      name: "Peso del producto",
      selector: (row) => row.weight,
      sortable: true,
    },
    { name: "Stock", selector: (row) => row.stock, sortable: true },
    { name: "Descripcion", selector: (row) => row.description, sortable: true },
    {
      name: "Empresa asociada",
      selector: (row) => row.businessbranch.businessBranchName,
      sortable: true,
    },

    // { name: "Categorias", selector: "lastname", sortable: true },
    {
      button: true,
      cell: () => (
        <button style={{ display: "flex" }}>
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

  const columnas = [
    { name: "Email", selector: (row) => row.email, sortable: true },
    { name: "Nombre", selector: (row) => row.name, sortable: true },
    { name: "Apellido", selector: (row) => row.lastname, sortable: true },
    {
      name: "Fecha de nacimiento",
      selector: (row) => formatDate(row.birthDate),
      sortable: true,
    },
    /* { name: "Acciones", selector: "acciones", sortable: true }, */
    {
      button: true,
      cell: (row) => (
        <button style={{ display: "flex" }}>
          <FaPencilAlt
            style={{ marginRight: "15px", fontSize: "20px" }}
            onClick={(e) => editUsers(e)}
          />
          <FaTrashAlt
            style={{ fontSize: "20px" }}
            onClick={(e) => banearUsers(e, row.email)}
          />
        </button>
      ),
    },
  ];

  const columnsBusiness = [
    { name: "Email", selector: (row) => row.email, sortable: true },
    {
      name: "Nombre Empresa",
      selector: (row) => row.businessName,
      sortable: true,
    },
    { name: "CUIT", selector: (row) => row.cuit, sortable: true },
    { name: "Telefono", selector: (row) => row.phone, sortable: true },
    {
      name: "Categoria tributaria",
      selector: (row) => row.taxBracket,
      sortable: true,
    },
    {
      button: true,
      cell: (row) => (
        <button style={{ display: "flex" }}>
          <FaPencilAlt
            style={{ marginRight: "15px", fontSize: "20px" }}
            onClick={(e) => editBusiness(e)}
          />
          <FaTrashAlt
            style={{ fontSize: "20px" }}
            onClick={(e) => banearBusiness(e, row.email)}
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
          <div
            style={{
              marginTop: "40px",
              marginRight: "30px",
              marginLeft: "30px",
            }}
          >
            <Tabs
              id="controlled-tab-example"
              activeKey={key}
              onSelect={(k) => setKey(k)}
              /* className="mb-3" */
              justify
            >
              <Tab eventKey="home" title="Listado de usuarios">
                <div>
                  <input
                    type="text"
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                    style={{
                      background: "#8c52ff",
                      color: "white",
                      borderRadius: "20px",
                      margin: "20px",
                    }}
                  />
                </div>
                <DataTable
                  columns={columnas}
                  data={searchUsers(USERS)}
                  title="Listado de usuarios"
                />
                <br />
              </Tab>
              <Tab eventKey="profile" title="Listado de empresas">
                <div>
                  <input
                    type="text"
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                    style={{
                      background: "#8c52ff",
                      color: "white",
                      borderRadius: "20px",
                      margin: "20px",
                    }}
                  />
                </div>
                <DataTable
                  columns={columnsBusiness}
                  data={searchBusiness(BUSINESS)}
                  title="Listado de empresas"
                />
              </Tab>
              <Tab eventKey="profile2" title="Listado de productos">
                <div>
                  <input
                    type="text"
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                    style={{
                      background: "#8c52ff",
                      color: "white",
                      borderRadius: "20px",
                      margin: "20px",
                    }}
                  />
                </div>
                <DataTable
                  columns={columnasProducts}
                  data={searchProduct(products)}
                  title="Listado de productos"
                />
              </Tab>
              <Tab eventKey="profile3" title="Listado de viajes">
                <div>
                  <input
                    type="text"
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                    style={{
                      background: "#8c52ff",
                      color: "white",
                      borderRadius: "20px",
                      margin: "20px",
                    }}
                  />
                </div>
                <DataTable
                  columns={columnasTravels}
                  data={searchTravels(allTravels)}
                  title="Listado de viajeros"
                  style={{ marginBottom: "30px" }}
                />
              </Tab>
              <Tab eventKey="profile4" title="Listado de compras">
                <div>
                  <input
                    type="text"
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                    style={{
                      background: "#8c52ff",
                      color: "white",
                      borderRadius: "20px",
                      margin: "20px",
                    }}
                  />
                </div>
                <DataTable
                  columns={columnasPurchases}
                  data={purchases}
                  title="Listado de compras"
                />
              </Tab>
            </Tabs>
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
            size={250}
            thickness={90}
            speed={111}
            color="rgba(140, 82, 255, 1)"
            secondaryColor="rgba(74, 57, 172, 0.3)"
          />
        </div>
      )}
    </div>
  );
}
