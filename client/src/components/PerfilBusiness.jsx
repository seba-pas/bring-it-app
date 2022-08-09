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
  saveImage,
  desactivateBusiness,
  cleanBusinessState,
} from "../actions";
import DataTable from "react-data-table-component";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "../styles/PerfilBusiness.module.css";
import swal from "sweetalert";
import BranchCard from "./BranchCard";
import { useHistory } from "react-router-dom";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import RecuperarPasswordBusiness from "./RecuperarPasswordBusiness";
import { Avatar, AvatarBadge } from "@chakra-ui/avatar";

function PerfilBusiness(props) {
  const [key, setKey] = useState("home");
  const gState = useSelector((state) => state);
  const dispatch = useDispatch();
  const id = props.match.params.id;
  const history = useHistory();
  const infoBusiness = gState.businessEditInfo;
  const branchId = gState.businessEditInfo.businessbranches.filter(
    (e) => e.id === parseInt(id)
  );

  const tokenBusiness = gState.businessToken;

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
          logo: "",
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
          logo: "",
          phone: infoBusiness.phone,
          taxBracket: infoBusiness.taxBracket,
          arrayInfo: [],
          province: "",
          address: "",
          city: "",
        }
  );
  //console.log("input", input)
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
        logo: "",
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
    history.push("/empresas");
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
          editBranch(
            id,
            {
              businessName: input.businessName,
              businessEmail: input.businessEmail,
              cityId: input.city,
              province: input.province,
              address: input.address,
            },
            tokenBusiness //envio de 3er parametro para enviar los headers en la accion (envio de token al back)
          )
        )
      : dispatch(
          postBranch(
            {
              businessName: input.businessName,
              businessEmail: input.businessEmail,
              cityId: input.city,
              province: input.province,
              address: input.address,
            },
            tokenBusiness //envio de 3er parametro para enviar los headers en la accion (envio de token al back)
          )
        );

    history.push("/empresas/perfil");
  };

  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);

  const uploadImage = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "Bringit");
    setLoading(true);
    dispatch(saveImage(data));
    console.log("si");
  };

  useEffect(() => {
    setInput({
      ...input,
      logo: gState.images,
    });
  }, [gState.images]);

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(
      editBusiness(
        input.email,
        {
          businessName: input.businessName,
          cuit: input.cuit,
          taxBracket: input.taxBracket,
          logo: input.logo,
          phone: input.phone,
        },

        tokenBusiness //envio de 3er parametro para enviar los headers en la accion (envio de token al back)
      )
    );

    swal("Buen trabajo!", "Editado satisfactoriamente!", "success");
  };
  function handleDesactivate() {
    swal({
      title: "¿Está seguro que quiere desactivar su cuenta?",
      text: "Si desactiva su cuenta ya no tendrá acceso a la misma.",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        swal("Su cuenta ha sido desactivada!", {
          icon: "success",
        });
        dispatch(desactivateBusiness(infoBusiness.email, tokenBusiness));
        history.push("/");
        dispatch(cleanBusinessState());
      } else {
        swal("Su cuenta no ha sido desactivada");
      }
    });
  }

  function closeSesion() {
    dispatch(cleanBusinessState());
    swal(
      "Tu sesión ha sido cerrada con éxito",
      "Gracias por usar Bring it!",
      "success"
    );
    history.push("/");
  }
  return (
    <div>
      <Avatar
        size="lg"
        name={gState.business.businesName}
        src={gState.businessEditInfo.logo}
      >
        <AvatarBadge
          boxSize="0.08m"
          bg="springgreen"
          borderColor="springgreen"
        />
      </Avatar>
      <Container>
        <Tabs
          id="controlled-tab-example"
          activeKey={key}
          onSelect={(k) => setKey(k)}
          /* className="mb-3" */
          justify
        >
          <Tab eventKey="home" title="Editar empresa">
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
                        <Form.Label>Teléfono</Form.Label>
                        <Form.Control
                          type="text"
                          name="phone"
                          value={input.phone}
                          placeholder="Telefono"
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
                    {/* <Col> */}
                    <Col>
                      <Form.Group>
                        <label for="exampleFile">Logo</label>
                        <Form.Control
                          // id="exampleFile"
                          name="logo"
                          type="file"
                          // value={input.logo}
                          onChange={uploadImage}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
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
                  <Row>
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
                      <Button onClick={(e) => handleDesactivate(e)}>
                        Desactivar cuenta
                      </Button>
                    </Col>
                    <Col>
                      <Button onClick={closeSesion}>Cerrar sesión</Button>
                    </Col>
                  </Row>
                </Form>
              </Col>
            </Row>
          </Tab>
          <Tab eventKey="profile" title="Administracion de sedes">
            <Row>
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
            <Row>
              <Col lg={6} md={6} sm={12}>
                <Form.Group className="mb-3">
                  <Form.Label>Provincia: </Form.Label>
                  <Form.Select
                    name="province"
                    value={input.province}
                    onChange={(e) => handleInputChange(e)}
                  >
                    <option value="">{} </option>
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
            </Row>
            <Row>
              <Col lg={6} md={6} sm={12}>
                <Form.Group className="mb-3">
                  <Form.Label>Ciudad:</Form.Label>
                  <Form.Select
                    disabled={!input.province}
                    name="city"
                    value={input.city}
                    onChange={(e) => handleInputChange(e)}
                  >
                    <option value="">{} </option>

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
            </Row>
            <Row>
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
            </Row>
          </Tab>
          <Tab eventKey="profile1" title="Modificar contraseña">
            <RecuperarPasswordBusiness />
            {/* <Col>
              <Button onClick={(e) => handlePass(e)}>Cambiar Contraseña</Button>
            </Col> */}
          </Tab>
        </Tabs>

        <Row style={{ marginTop: "30px", marginBottom: "30px" }}>
          <Col>
            <Button onClick={(e) => handleBack(e)}>Volver</Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default PerfilBusiness;
