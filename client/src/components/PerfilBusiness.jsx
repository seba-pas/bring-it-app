import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import {
  editBusiness,
  getAllBusiness,
  getAllProvinces,
  getAllCities,
  postBranch,
  editBranch,
} from "../actions";
import DataTable from "react-data-table-component";

import styles from "../styles/PerfilBusiness.module.css";
import swal from "sweetalert";
import BranchCard from "./BranchCard";
import { useHistory } from "react-router-dom";

function PerfilBusiness(props) {
  const gState = useSelector((state) => state);
  const dispatch = useDispatch();
  let id = props.match.params.id;
  let history = useHistory();

  const infoBusiness = gState.businessEditInfo;
  const branchId = gState.businessEditInfo.businessbranches.filter(
    (e) => e.id === parseInt(id)
  );

  useEffect(() => {
    dispatch(getAllProvinces());
    dispatch(getAllCities());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAllBusiness());
  }, [dispatch, gState.branchAdded, gState.brancDeleted, gState.branchPut]);

  const [input, setInput] = useState(
    id
      ? {
        businessEmail: infoBusiness.email,
        businessName: infoBusiness.businessName,
        businessbranches: infoBusiness.businessbranches,
        cuit: infoBusiness.cuit,
        email: infoBusiness.email,
        logo: infoBusiness.logo || "",
        phone: infoBusiness.phone,
        taxBracket: infoBusiness.taxBracket,
        arrayInfo: [],
        province: branchId[0].province || "",
        address: branchId[0].address || "",
        city: "", //gState.allCities.filter(e => parseInt(e.id) === parseInt(branchId[0].cityId))[0].nombre || "",
      }
      : {
        businessEmail: infoBusiness.email,
        businessName: infoBusiness.businessName,
        businessbranches: infoBusiness.businessbranches,
        cuit: infoBusiness.cuit,
        email: infoBusiness.email,
        logo: infoBusiness.logo || "",
        phone: infoBusiness.phone,
        taxBracket: infoBusiness.taxBracket,
        arrayInfo: [],
        province: "",
        address: "",
        city: "",
      }
  );

  const [error, setError] = useState({
    errorbusinessName: "",
    errorbusinessBranches: "",
    errorcuit: "",
    errorlogo: "",
    errorphone: "",
    errortaxBracket: "",
    erroraddress: "",
    errorprovince: "",
    errorcity: "",
  });

  useEffect(() => {
    validate();
  }, [
    input.businessName,
    input.cuit,
    input.logo,
    input.phone,
    input.taxBracket,
    input.address,
    input.province,
    input.city,
  ]);

  useEffect(() => {
    setInput((prevInput) => {
      return {
        ...prevInput,
        businessEmail: gState.businessEditInfo.email,
        businessName: gState.businessEditInfo.businessName,
        businessbranches: gState.businessEditInfo.businessbranches,
        cuit: gState.businessEditInfo.cuit,
        email: gState.businessEditInfo.email,
        logo: gState.businessEditInfo.logo || "",
        phone: gState.businessEditInfo.phone,
        taxBracket: gState.businessEditInfo.taxBracket,
      };
    });
  }, [gState.businessEditInfo]);

  useEffect(() => {
    setInput((prevInput) => {
      return {
        ...prevInput,
        province: id ? branchId[0].province : "",
        address: id ? branchId[0].address : "",
        city: "", //
      };
    });
  }, [id]);

  const validate = () => {
    let errorbusinessName = "";
    let errorbusinessBranches = "";
    let errorcuit = "";
    let errorlogo = "";
    let errorphone = "";
    let errortaxBracket = "";
    let erroraddress = "";
    let errorprovince = "";
    let errorcity = "";

    if (
      !input.businessName ||
      input.businessName[0] === " " ||
      input.businessName === ""
    )
      errorbusinessName = "Debe escribir el nombre de la empresa";
    if (!input.businessbranches.length)
      errorbusinessBranches =
        "Debe ingresar la información de la sede principal";
    if (!input.cuit || input.cuit[0] === " " || input.cuit === "")
      errorcuit = "Debe ingresar un cuit"; //todo mejorar
    if (!input.logo || input.logo[0] === " " || input.logo === "")
      errorlogo = "Ingresar un logo";
    if (!input.phone || input.phone[0] === " " || input.phone === "")
      errorphone = "Ingresar numero de telefono";
    if (
      !input.taxBracket ||
      input.taxBracket[0] === " " ||
      input.taxBracket === ""
    )
      errortaxBracket = "seleccione taxBracket";
    if (!input.address || input.address[0] === " " || input.address === "")
      erroraddress = "Ingrese Dirección";
    if (!input.province) errorprovince = "Seleccione una provincia";
    if (!input.city) errorcity = "Seleccione una Ciudad";

    setError((prevInput) => {
      return {
        errorbusinessName: errorbusinessName,
        errorbusinessBranches: errorbusinessBranches,
        errorcuit: errorcuit,
        errorlogo: errorlogo,
        errorphone: errorphone,
        errortaxBracket: errortaxBracket,
        erroraddress: erroraddress,
        errorprovince: errorprovince,
        errorcity: errorcity,
      };
    });
  };

  const handleInputChange = (event) => {
    event.preventDefault();
    setInput((prevInput) => {
      return {
        ...prevInput,
        [event.target.name]: event.target.value,
      };
    });
  };
  const handleBack = (event) => {
    event.preventDefault();
    history.push("/empresas")
    //props.history.goBack();
  };
  const handlePass = (event) => {
    event.preventDefault();
    //llama formulario para cambiar password
  };
  const handleBranch = (event) => {
    event.preventDefault();
    id
      ? dispatch(
        editBranch(id, {
          businessName: input.businessName,
          businessEmail: input.businessEmail,
          cityId: input.city,
          province: input.province,
          address: input.address,
        })
      )
      : dispatch(
        postBranch({
          businessName: input.businessName,
          businessEmail: input.businessEmail,
          cityId: input.city,
          province: input.province,
          address: input.address,
        })
      );
    history.push("/perfil")
  };

  const handleSubmit = (event) => {
    console.log("si")
    event.preventDefault();
    dispatch(
      editBusiness(input.email, {
        businessName: input.businessName,
        cuit: input.cuit,
        logo: input.logo,
        taxBracket: input.taxBracket,
        logo: input.logo,
        // phone: input.phone,
      })
    );
    swal("Buen trabajo!", "Editado satisfactoriamente!", "success");
  };
  return (
    <div>
      <Container>
        <h1 className="shadow-sm text-success mt-5 p-3 text-center rounded">
          Editar de empresa
        </h1>
        <Row>
          <Col
            lg={12}
            md={12}
            sm={12}
            className="text-center p-5 m-auto shadow-sm rounded-lg"
          >
            <Form onSubmit={handleSubmit}>
              <Row>
                <Col lg={6} md={6} sm={12}>
                  <Form.Group htmlFor="businessName" className="mb-3">
                    <Form.Label>Empresa: </Form.Label>
                    <Form.Control
                      type="text"
                      name="businessName"
                      value={input.businessName}
                      placeholder="Nombre"
                      onChange={handleInputChange}
                    />
                    {!error.errorbusinessName ? (
                      <label> </label>
                    ) : (
                      <label> {error.errorbusinessName} </label>
                    )}
                  </Form.Group>
                </Col>
                <Col lg={6} md={6} sm={12}>
                  <Form.Group className="mb-3">
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                      type="text"
                      name="address"
                      value={input.address}
                      placeholder="Dirección"
                      onChange={handleInputChange}
                    />
                    {!error.erroraddress ? (
                      <label> </label>
                    ) : (
                      <label> {error.erroraddress} </label>
                    )}
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col lg={6} md={6} sm={12}>
                  <Form.Group className="mb-3">
                    <Form.Label>Cuit: </Form.Label>
                    <Form.Control
                      type="text"
                      name="cuit"
                      value={input.cuit}
                      placeholder="Cuit"
                      onChange={handleInputChange}
                    />
                    {!error.errorcuit ? (
                      <label> </label>
                    ) : (
                      <label> {error.errorcuit} </label>
                    )}
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>Logo:</Form.Label>
                    <Form.Control
                      type="text"
                      name="logo"
                      value={input.logo}
                      placeholder="Logo"
                      onChange={handleInputChange}
                    />
                    {!error.errorlogo ? (
                      <label> </label>
                    ) : (
                      <label> {error.errorlogo} </label>
                    )}
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>Provincia: </Form.Label>
                    <Form.Select
                      name="province"
                      value={input.province}
                      onChange={(e) => handleInputChange(e)}
                    >
                      <option value="">{ } </option>
                      {gState.provinces?.map((e) => (
                        <option key={e.id} value={e.nombre}>
                          {e.nombre}
                        </option>
                      ))}
                    </Form.Select>
                    {!error.errorprovince ? (
                      <label> </label>
                    ) : (
                      <label> {error.errorprovince} </label>
                    )}
                  </Form.Group>
                </Col>
                <Col lg={4} md={4} sm={12}>
                  <Form.Group className="mb-3">
                    <Form.Label>Ciudad:</Form.Label>
                    <Form.Select
                      disabled={!input.province}
                      name="city"
                      value={input.city}
                      onChange={(e) => handleInputChange(e)}
                    >
                      <option value="">{ } </option>

                      {input.province
                        ? gState.allCities
                          ?.filter(
                            (e) =>
                              e.provinceId ===
                              gState.provinces?.filter(
                                (e) => e.nombre === input.province
                              )[0].id
                          )
                          ?.map((e) => (
                            <option key={e.id} value={e.id}>
                              {e.nombre}
                            </option>
                          ))
                        : ""}
                    </Form.Select>
                    {!error.errorcity ? (
                      <label> </label>
                    ) : (
                      <label> {error.errorcity} </label>
                    )}
                  </Form.Group>
                </Col>

                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>TaxBracket:</Form.Label>
                    <Form.Select
                      name="taxBracket"
                      value={input.taxBracket}
                      onChange={(e) => handleInputChange(e)}
                    >
                      <option value="">{input.taxBracket} </option>
                      <option value="Categoría tributaria 1">
                        Categoría tributaria 1
                      </option>
                      <option value="Categoría tributaria 2">
                        Categoría tributaria 2
                      </option>
                      <option value="Categoría tributaria 3">
                        Categoría tributaria 3
                      </option>
                    </Form.Select>
                    {!error.errortaxBracket ? (
                      <label> </label>
                    ) : (
                      <label> {error.errortaxBracket} </label>
                    )}
                  </Form.Group>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
        <h4 className="shadow-sm text-success mt-5 p-3 text-center rounded">
          Administración de sedes
        </h4>
        <Row>
          <Col>
            <div className={styles.branchContainer}>
              {
                <table>
                  <thead className={styles.titlleTableNonSt}>
                    <tr>
                      <th>Nombre</th>
                      {/* <th>Ciudad</th> */}
                      <th>Provincia</th>
                      <th>Dirección</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {input.businessbranches?.map((c) => {
                      return (
                        <BranchCard
                          key={c.id}
                          id={c.id}
                          name={c.businessBranchName}
                          city={c.cityId}
                          province={c.province}
                          address={c.address}
                        />
                      );
                    })}
                  </tbody>
                </table>
              }
            </div>
          </Col>
        </Row>
        <Row style={{ marginTop: "30px", marginBottom: "30px" }}>
          <Col>
            <Button
              // type="submit"
              disabled={
                error.errorbusinessName ||
                error.errorcuit ||
                error.errortaxBracket
              }
              onClick={(e) => handleSubmit(e)}
            >
              Editar Empresa
            </Button>
          </Col>
          <Col>
            <Button onClick={(e) => handlePass(e)}>Cambiar Contraseña</Button>
          </Col>
          <Col>
            <Button
              disabled={
                error.erroraddress ||
                error.errorcity ||
                error.errorprovince ||
                error.errorbusinessName
              }
              onClick={(e) => handleBranch(e)}
            >
              +
            </Button>
          </Col>
          <Col>
            <Button onClick={(e) => handleBack(e)}>Volver</Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default PerfilBusiness;
