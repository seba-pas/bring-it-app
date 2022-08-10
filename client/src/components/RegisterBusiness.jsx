import { React, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import {
  addBusiness,
  filterByProvinceCity,
  filterByProvinces,
  getAllProvinces,
  getCities,
  cleanBusiness,
  getAllCities,
} from "../actions/index.js";
import NavBarRegisters from "./NavBarRegisters.jsx";
import swal from "sweetalert";
import imgIcon from "./img/programmer.png";
import "../styles/RegisterBusiness.css";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";


function RegisterBusiness() {
  const dispatch = useDispatch();
  const history = useHistory();
  let PROVINCES = useSelector((state) => state.provinces);
  PROVINCES = PROVINCES.sort((a, b) => {
    if (a.nombre > b.nombre) return 1;
    if (b.nombre > a.nombre) return -1;
    return 0;
  })
  const gState = useSelector((state) => state);
  const [value, setValue] = useState();

  let CITIES = useSelector((state) => state.allCities);
  CITIES = CITIES.sort((a, b) => {
    if (a.nombre > b.nombre) return 1;
    if (b.nombre > a.nombre) return -1;
    return 0;
  })

  const [input, setInput] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    businessName: "",
    cuit: "",
    taxBracket: "",
    province: "",
    cityId: "",
    address: "",
    province: "",
    logo: "",
    phone: "",
    active: true,
  });

  const [error, setError] = useState({
    erroremail: "",
    errorpassword: "",
    errorconfirmPassword: "",
    errorbusinessName: "",
    errorcuit: "",
    errortaxBracket: "",
    errorprovince: "",
    errorcityId: "",
    erroraddress: "",
    errorlogo: "",
    errorphone: "",
  });

  useEffect(() => {
    validate();
  }, [input.email, input.password, input.confirmPassword, input.businessName, input.cuit, input.taxBracket, input.province, input.cityId, input.address, input.logo, input.phone]);

  const validate = () => {
    let erroremail = "";
    let errorpassword = "";
    let errorconfirmPassword = "";
    let errorbusinessName = "";
    let errorcuit = "";
    let errortaxBracket = "";
    let errorprovince = "";
    let errorcityId = "";
    let erroraddress = "";
    let errorlogo = "";
    let errorphone = "";
    console.log("h")
    if (!input.email || !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(input.email) || input.email[0] === " ") { erroremail = "❌ Debe escribir una dirección de email correcta."; } else { erroremail = "✅ Email valido" }
    if (!input.password || !/^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/.test(input.password)) { errorpassword = "La contraseña debe tener al entre 8 y 16 caracteres, al menos un dígito, al menos una minúscula y al menos una mayúscula." } else { errorpassword = "✅ Contraseña valida" }
    if (input.confirmPassword === "" || input.password !== input.confirmPassword) { errorconfirmPassword = "❌ Las contraseñas no coinciden" } else { errorconfirmPassword = "✅" }
    if (!input.businessName || !/^[A-Z]+[A-Za-z0-9\s]+$/g.test(input.businessName) || input.businessName[0] === " ") { errorbusinessName = "❌ La primera letra debe estar en mayúscula"; } else { errorbusinessName = "✅Hecho!" }
    if (!input.cuit || !/^[1-9]\d*(\.\d+)?$/.test(input.cuit) || input.cuit[0] === " ") { errorcuit = "❌ Solo números"; } else { errorcuit = "✅Hecho!" }
    if (!input.taxBracket) { errortaxBracket = "❌ Seleccione una de las opciones" } else { errortaxBracket = "✅Hecho!" }
    if (!input.province) { errorprovince = "❌ Seleccione una provincia" } else { errorprovince = "✅Hecho!" }
    if (!input.cityId) { errorcityId = "❌ Seleccione una ciudad" } else { errorcityId = "✅Hecho!" }
    if (!input.address || !/^[A-Z]+[A-Za-z0-9\s]+$/g.test(input.address) || input.address[0] == " ") { erroraddress = "❌ La primera letra debe estar en mayúscula"; } else { erroraddress = "✅Hecho!" }


    setError((prevInput) => {
      return {
        erroremail: erroremail,
        errorpassword: errorpassword,
        errorconfirmPassword: errorconfirmPassword,
        errorbusinessName: errorbusinessName,
        errorcuit: errorcuit,
        errortaxBracket: errortaxBracket,
        errorprovince: errorprovince,
        errorcityId: errorcityId,
        erroraddress: erroraddress,
        errorlogo: errorlogo,
        errorphone: errorphone,
      }
    });


  }




  const handleInputChange = (event) => {
    event.preventDefault();
    setInput((prevInput) => {
      return {
        ...prevInput,
        [event.target.name]: event.target.value,
      };
    });
  };



  function handleChange(e) {
    setInput((prevInput) => {
      return {
        ...prevInput,
        [e.target.name]: e.target.value,
      };
    });
    // setErrors(
    //   validateUsers({
    //     ...input,
    //     [e.target.name]: e.target.name,
    //   })
    // );
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (input.password !== input.confirmPassword) {
      swal(
        "Las contraseñas no coinciden",
        "Por favor vuelva a ingresar su contraseña",
        "error"
      );
      return;
    }
    if (
      input.email !== "" &&
      input.password !== "" &&
      input.password === input.confirmPassword &&
      input.password.length >= 8 &&
      input.password.length <= 16 &&
      input.confirmPassword.length >= 8 &&
      input.confirmPassword.length <= 16 &&
      input.businessName !== "" &&
      input.cuit !== "" &&
      input.address !== "" &&
      input.province !== "" &&
      input.cityId !== "" &&
      input.taxBracket !== "" &&
      input.phone !== "" /* &&
      input.phone.length <= 10 */
    ) {
      dispatch(addBusiness(input));
      swal(
        "Buen trabajo",
        "Empresa creada con exito",
        "success"
      );
      history.push("/");
    } else {
      swal(
        "Faltan datos por llenar",
        "Por favor ingrese todos los datos",
        "error"
      );
    }
  }

  // NUEVO AGUS -> PARA QUE MUESTRE CUANDO EMPRESA YA EXISTE
  const business = useSelector((state) => state.business);
  const [didMount, setDidMount] = useState(true);
  useEffect(() => {
    if (didMount) {
      setDidMount(false);
      return;
    } else {
      if (business === "Empresa y sede creada") {
        swal("Buen trabajo!", "La empresa fue creada con éxito!", "success");
        setInput({
          email: "",
          password: "",
          businessName: "",
          cuit: "",
          address: "",
          province: "",
          phone: "",
        });
        history.push("/");
      } else if (business === "error:Validation error") {
        swal("Ya existe una empresa con el email");
        dispatch(cleanBusiness());
      }
    }
  }, [business]);

  //funcion para filtrar por provincias
  function handleFilterByProvinces(e) {
    e.preventDefault();
    setInput({
      ...input,
      province: e.target.value,
    });
    dispatch(filterByProvinceCity(e.target.value));
  }

  //funcion para seleccionar ciudad
  function handleCheckCity(e) {
    e.preventDefault();
    setInput({
      ...input,
      cityId: e.target.value,
    });
  }

  function handleTaxBracket(e) {
    e.preventDefault();
    setInput({
      ...input,
      taxBracket: e.target.value,
    });
  }

  useEffect(() => {
    dispatch(getAllProvinces());
    dispatch(getAllCities());
  }, [dispatch]);
  return (
    <div>
      <NavBarRegisters />

      <Container>
        <h1 className="shadow-sm text-success mt-5 p-3 text-center rounded">
          Registrar Empresa
        </h1>
        <Row>
          <Col
            lg={8}
            md={6}
            sm={12}
            className="text-center p-5 m-auto shadow-sm rounded-lg"
          >
            <img className="iconImg" src={imgIcon} alt="icon" />
            <Form onSubmit={(e) => handleSubmit(e)}>
              <Form.Group className="mb-3">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  value={input.email}
                  name="email"
                  id="email"
                  required
                  placeholder="Enter email"
                  onChange={(e) => handleChange(e)}
                />
                {error.erroremail && <p>{error.erroremail}</p>}
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  onChange={(e) => handleChange(e)}
                  value={input.password}
                  name="password"
                  id="password"
                  required
                />
                {error.errorpassword && <p>{error.errorpassword}</p>}
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Confirmar password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Confirmar password"
                  onChange={(e) => handleChange(e)}
                  value={input.confirmPassword}
                  name="confirmPassword"
                  id="confirmPassword"
                  required
                />
                {error.errorconfirmPassword && <p>{error.errorconfirmPassword}</p>}
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Empresa nombre </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingrese el nombre de la empresa"
                  onChange={(e) => handleChange(e)}
                  value={input.businessName}
                  name="businessName"
                  id="businessName"
                  required
                />
                {error.errorbusinessName && <p>{error.errorbusinessName}</p>}
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Cuit</Form.Label>
                <Form.Control
                  type="number"
                  value={input.cuit}
                  name="cuit"
                  id="cuit"
                  required
                  placeholder="Ingrese su numero de Cuit"
                  onChange={(e) => handleChange(e)}
                />
                {error.errorcuit && <p>{error.errorcuit}</p>}
              </Form.Group>

              <Form.Label>Categoría Tributaria </Form.Label>
              <Form.Group>
                <select onChange={(e) => handleTaxBracket(e)}>
                  <option selected disabled>
                    Categoría Tributaria
                  </option>
                  <option value="Categoría tributaria 1">
                    Categoría tributaria 1
                  </option>
                  <option value="Categoría tributaria 2">
                    Categoría tributaria 2
                  </option>
                  <option value="Categoría tributaria 3">
                    Categoría tributaria 3
                  </option>
                </select>
                {error.errortaxBracket && <p>{error.errortaxBracket}</p>}
              </Form.Group>

              <Form.Label>Provincia</Form.Label>
              <Form.Group>
                <label htmlFor="province">Provincia:</label>
                <select
                  name="province"
                  value={input.province}
                  onChange={(e) => handleInputChange(e)}
                >
                  <option value="">{ } </option>
                  {PROVINCES?.map((e) => (
                    <option key={e.id} value={e.nombre}>
                      {e.nombre}
                    </option>
                  ))}
                </select>
                {error.errorprovince && <p>{error.errorprovince}</p>}
              </Form.Group>

              <Form.Label>Ciudad</Form.Label>
              <Form.Group>
                <label htmlFor="cityId">Ciudad:</label>
                <select
                  name="cityId"
                  value={input.cityId}
                  onChange={(e) => handleInputChange(e)}
                >
                  <option value="">{ } </option>

                  {
                    // gState.cities?.map(e => <option key={e.id} value={e.nombre}>{e.nombre}</option>)
                    input.province
                      ? CITIES
                        ?.filter(
                          (e) =>
                            e.provinceId ===
                            gState.provinces?.filter(
                              (e) => e.nombre === input.province
                            )[0].id
                        )
                        ?.map((e) => (
                          <option key={e.id} name={e.nombre} value={e.id}>
                            {e.nombre}
                          </option>
                        ))
                      : ""
                  }
                </select>
                {error.errorcityId && <p>{error.errorcityId}</p>}
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Direccion</Form.Label>
                <Form.Control
                  type="text"
                  value={input.address}
                  name="address"
                  id="address"
                  required
                  placeholder="Ingresa tu direccion"
                  onChange={(e) => handleChange(e)}
                />
                {error.erroraddress && <p>{error.erroraddress}</p>}
              </Form.Group>
              <Form.Group>
                <Form.Label>Agrega tu número de contacto</Form.Label>
                <Form.Control
                  type="text"
                  value={input.phone}
                  name="phone"
                  id="phone"
                  required
                  placeholder="Ingresa tu número de contacto"
                  onChange={(e) => handleChange(e)}
                />
                {error.errorphone && <p>{error.errorphone}</p>}
              </Form.Group>

              <div>
                <Button
                  disabled={error.errorpassword === "La contraseña debe tener al entre 8 y 16 caracteres, al menos un dígito, al menos una minúscula y al menos una mayúscula." || error.errorconfirmPassword === "❌ Las contraseñas no coinciden" || error.erroremail === "❌ Debe escribir una dirección de email correcta." || error.errorbusinessName === "❌ La primera letra debe estar en mayúscula" || error.errorcuit === "❌ Solo números" || error.errortaxBracket === "❌ Seleccione una de las opciones" || error.errorprovince === "❌ Seleccione una provincia" || error.errorcityId === "❌ Seleccione una ciudad" || error.erroraddress === "❌ La primera letra debe estar en mayúscula"}
                  variant="primary btn btn-block w-100 mt-3"
                  type="submit"
                >
                  REGISTRARME
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
        <h6 className="mt-5 p-5 text-center text-secondary ">
          © 2022 Bring it. All Rights Reserved | Design by Grupo 8 Soy Henry
        </h6>
      </Container>
    </div>
  );
}

export default RegisterBusiness;
