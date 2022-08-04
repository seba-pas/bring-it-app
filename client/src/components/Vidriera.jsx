import React from "react";
import NavBarLanding from "./NavBarLanding";
import styles from "../styles/HomePersonas.module.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductCards from "./ProductCards";
import Pagination from "./Pagination";
import swal from "sweetalert";


import { SpinnerCircularFixed } from "spinners-react";
import "bootstrap/dist/css/bootstrap.css";

import {
  getAllProducts,
  orderByPrice,
  filterByCategory,
  getCategories,
  getAllBusiness,
  filterByBusiness,
  filterByProvinces,
  getAllProvinces,
  filterByCities,
  filterByProvinceCity,
  clearCart,
  getAllBranches,
} from "../actions";
import FormTravel from "./FormTravel";

export default function HomePersonas() {
  const dispatch = useDispatch();
  const PRODUCTS = useSelector((state) => state.products);
  const cart = useSelector((state) => state.cart);

  let CATEGORY = useSelector((state) => state.categories);

  CATEGORY = CATEGORY.sort((a, b) => {
    if(a.name > b.name) return  1;
    if(b.name > a.name) return -1;
    return 0;
  })
  
  const gState = useSelector((state) => state);

  let BRANCHES = useSelector((state) => state.branches);

  let businessOrder = BRANCHES.map((e) => e.businessBranchName);
  businessOrder = businessOrder.sort((a, b) => {
    if(a > b) return  1;
    if(b > a) return -1;
    return 0;
  })

  let provOrder = BRANCHES.map((e) => e.province);
  provOrder = provOrder.sort((a, b) => {
    if(a > b) return  1;
    if(b > a) return -1;
    return 0;
  })

  

  const [orden, setOrden] = useState("");
  const [category, setCategory] = useState("All");
  const [business, setBusinnes] = useState("All");
  const [province, setProvince] = useState("All");
  // const history = useHistory();

  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(8);
  const indexOfLastProduct = currentPage * productsPerPage; // 10
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage; // 0
  const currentProducts = PRODUCTS.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const [input, setInput] = useState({
    perfil: "",
    userInfo: {},
  });
  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  //Funcion para logueo

  useEffect(() => {
    setInput((prevInput) => {
      return {
        ...prevInput,
        userInfo: { ...gState.userInfo },
      };
    });
  }, [gState]);
  useEffect(() => {
    if (input.perfil === "email") history.push("/perfil");
    else if (input.perfil === "close") {
      cart = [];
      history.push("/");
    }
  }, [input.perfil]);

  useEffect(() => {
    dispatch(getAllProducts());
    dispatch(getCategories());
    dispatch(getAllBusiness());
    dispatch(getAllProvinces());
    dispatch(getAllBranches());
  }, [dispatch]);

  if (BRANCHES === "No se encontraron sedes en la bd") dispatch(getAllBranches());
  //funcion para volver a cargar los productos
  function handleClick(e) {
    e.preventDefault();
    setCategory("All");
    setBusinnes("All");
    setProvince("All");
    dispatch(getAllProducts());
    setCurrentPage(1);
  }

  //funcion para ordenar los precios
  function handleSort(e) {
    e.preventDefault();
    setCurrentPage(1);
    dispatch(orderByPrice(e.target.value));
    setOrden(`Ordenado ${e.target.value}`);
  }

  //funcion para filtrar por categorias
  function handleFilterByCategory(e) {
    e.preventDefault();
    setCategory(e.target.value);
    setCurrentPage(1);
    dispatch(filterByCategory(e.target.value));
    setOrden(`Ordenado ${e.target.value}`);
  }

  //funcion para filtrar por empresas
  const provUnica = [...new Set(provOrder)]
  function handleFilterByBusiness(e) {
    e.preventDefault();
    setBusinnes(e.target.value);
    setCurrentPage(1);
    dispatch(filterByBusiness(e.target.value));
    setOrden(`Ordenado ${e.target.value}`);
  }

  //funcion para filtrar por provincias
  function handleFilterByProvinces(e) {
    e.preventDefault();
    setProvince(e.target.value);
    setCurrentPage(1);
    dispatch(filterByProvinces(e.target.value));
    setOrden(`Ordenado ${e.target.value}`);
  }
  //funcion para filtrar por ciduades
  function handleFilterByCities(e) {
    e.preventDefault();
    // setProvince(e.target.value);
    setCurrentPage(1);
    dispatch(filterByCities(e.target.value));
    setOrden(`Ordenado ${e.target.value}`);
  }

  function handleLog(e){
    e.preventDefault();
    swal("No estas logueado", "Logueate para poder comprar y disfrutar de mas funciones de BI!", "error");
  }


  return (
    <div style={{background:'white'}}>
      {/* {console.log(...new Set(BRANCHES.map((e) => e.province)))} */}
      
      <NavBarLanding />
    
      {PRODUCTS.length > 0 ? (

        PRODUCTS == "No se encontraron productos asociados" ? (
          <div style={{color:'#8c52ff', background:'white', marginTop:'150px'}}>
            <h1>No se encontraron productos asociados</h1>
            <button className='btn btn-primary' style={{marginTop: '40px'}} onClick={(e) => handleClick(e)}>Volver</button>
          </div>
        ) : (
          <div>
            <div className={styles.layout}>
              <div className={styles.containerS}>
                <select onChange={(e) => handleSort(e)}>
                  <option value="Desordenado" hidden selected>
                    Ordenar por
                  </option>
                  <option value="asc">Menor Precio</option>
                  <option value="desc">Mayor Precio</option>
                </select>

                <select
                  value={category}
                  onChange={(e) => handleFilterByCategory(e)}
                >
                  <option hidden selected>
                    Categorias
                  </option>
                  <option value="All">Todas</option>
                  {CATEGORY.map((CATEGORY) => {
                    return (
                      <option value={CATEGORY.name} key={CATEGORY.id}>
                        {CATEGORY.name}
                      </option>
                    );
                  })}
                </select>

                <select
                  value={business}
                  onChange={(e) => handleFilterByBusiness(e)}
                >
                  <option value="All">Todas</option>
                  <option hidden selected>
                    Empresa
                  </option>
                  {businessOrder?.map((BRANCHES) => {
                    return (
                      <option value={BRANCHES} key={BRANCHES}>

                        {BRANCHES}
                      </option>
                    );
                  })}
                </select>
                <select
                  value={province}
                  onChange={(e) => handleFilterByProvinces(e)}
                >
                  <option value="All">Todas</option>

                  {provOrder?.map((e) => {
                    return (
                      <option value={e} key={e}>
                        {e}
                      </option>
                    );
                  })}
                </select>
                <button
                  className={styles.botonvol}
                  onClick={(e) => handleClick(e)}
                >
                  Limpiar Filtros
                </button>
              </div>
              <div className={styles.contcards} style={{ width: "100%" }}>
                <button onClick={(e) => handleLog(e)}>
                <ProductCards  currentProducts={currentProducts} />
                </button>
              </div>
            </div>
            <Pagination
              productsPerPage={productsPerPage}
              PRODUCTS={PRODUCTS.length}
              paginado={paginado}
            />
          </div>
        )
      ) : (
        <div className={styles.spinner}>
          <SpinnerCircularFixed
            size={250}
            thickness={100}
            speed={100}
            color="rgba(210, 105, 30, 1)"
            secondaryColor="rgba(210, 105, 30, 0.23)"
          />
        </div>
      )}
    </div>
  );
}
