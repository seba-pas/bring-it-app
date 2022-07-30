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
  const [errors, setErrors] = useState({});
  const PROVINCES = useSelector((state) => state.provinces);
  const gState = useSelector((state) => state);
  const [value, setValue] = useState();

  const CITIES = useSelector((state) => state.cities);

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
    logo: "f",
    phone: "",
  });
  const handleInputChange = (event) => {
    event.preventDefault();
    setInput((prevInput) => {
      return {
        ...prevInput,
        [event.target.name]: event.target.value,
      };
    });
  };

  const validateUsers = (input) => {
    const errors = {};

    if (
      !input.email ||
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(input.email)
    ) {
      errors.email = "❌ Debe escribir una direccion de email correcta.";
    } else {
      errors.email = "✅ Email valido";
    }
    if (
      !input.password ||
      !/^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/.test(input.password)
    ) {
      errors.password = "La contraseña debe tener entre 8 y 16 caracteres";
    } else {
      errors.password = "✅ Contraseña valida";
    }
    if (
      !input.businessName ||
      !/^[A-Z]+[A-Za-z0-9\s]+$/g.test(input.businessName)
    ) {
      errors.businessName = "❌ La primera letra debe estar en mayúscula";
    } else {
      errors.businessName = "✅Hecho!";
    }
    if (!input.cuit || !/^[1-9]\d*(\.\d+)?$/.test(input.cuit)) {
      errors.cuit = "❌ Solo numeros";
    } else {
      errors.cuit = "✅Hecho!";
    }
    if (!input.address || !/^[A-Z]+[A-Za-z0-9\s]+$/g.test(input.address)) {
      errors.address = "❌ La primera letra debe estar en mayúscula";
    } else {
      errors.address = "✅Hecho!";
    }

    return errors;
  };

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validateUsers({
        ...input,
        [e.target.name]: e.target.name,
      })
    );
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
      if (business === "Empresa creada") {
        swal("Buen trabajo!", "La empresa fue creada con exito!", "success");
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
                {errors.email && <p>{errors.email}</p>}
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
                {errors.password && <p>{errors.password}</p>}
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
                {errors.password && <p>{errors.password}</p>}
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
                {errors.businessName && <p>{errors.businessName}</p>}
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
                {errors.cuit && <p>{errors.cuit}</p>}
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
              </Form.Group>

              <Form.Label>Provincia</Form.Label>
              <Form.Group>
                <label htmlFor="province">Provincia:</label>
                <select
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
                </select>
              </Form.Group>

              <Form.Label>Ciudad</Form.Label>
              <Form.Group>
                <label htmlFor="cityId">Ciudad:</label>
                <select
                  name="cityId"
                  value={input.cityId}
                  onChange={(e) => handleInputChange(e)}
                >
                  <option value="">{} </option>

                  {
                    // gState.cities?.map(e => <option key={e.id} value={e.nombre}>{e.nombre}</option>)
                    input.province
                      ? gState.allCities
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
                {/* <div>
                    <PhoneInput
                      placeholder="Enter phone number"
                      value={value}
                      onChange={setValue}
                    />
                    {value}
                  </div> */}
              </Form.Group>
            
              <div>
                <Button
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
