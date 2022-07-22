import { useHistory } from "react-router-dom";
import { addUser } from "../actions/index.js";
import { React, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useDispatch } from "react-redux";

import style from "../styles/RegisterUser.module.css";
// function validate(input) {
//   let errors = {};

//   if (
//     !input.email ||
//     [(v) => !!v || "Este campo es requerido"] + $ / g.test(input.email)
//   ) {
//     error.email = alert("Este campo es requerido");
//   } else {
//     error.email = console.log("✅Hecho!");
//   }
// // al menos una letra
//   //, al menos un numero, al menos una letra mayúscula, al menos 8 caracteres, no permite espacios.
//   if (
//     !input.password ||
//     /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/g.test(input.password)
//   ) {
//     error.password = alert(
//       "La contraseña debe tener al menos:1 num, letra mayuscula, 8 caracteres,sin espacios "
//     );
//   } else {
//     error.password = console.log("✅Hecho!");
//   }

//   if (!input.name || !/^[A-Z]+[A-Za-z0-9\s]+$/g.test(input.name)) {
//     errors.name = alert("La primera letra debe estar en mayúscula");
//   } else {
//     errors.name = console.log("✅Hecho!");
//   }
//   if (!input.lastname || !/^[A-Z]+[A-Za-z0-9\s]+$/g.test(input.lastname)) {
//     errors.lastname = alert("La primera letra debe estar en mayúscula");
//   } else {
//     errors.lastname = console.log("✅Hecho!");
//   }

//   return errors;
// }
function RegisterUser() {
  const dispatch = useDispatch();
  const history = useHistory();
  // const [errors, setErrors] = useState({});
  const [input, setInput] = useState({
    email: "",
    password: "",
    name: "",
    lastname: "",
    birthDate: "",
  });

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    console.log(input.birthDate)
    // setErrors(
    //   validate({
    //     ...input,
    //     [e.target.name]: e.target.name,
    //   })
    // );
  }
  /* function handleSelect(e) {
    if (!input.nationality.includes(e.target.value)) {
      setInput({
        ...input,
        nationality: [...input.nationality, e.target.value],
      });
    } else {
      setInput({
        ...input,
      });
    }
    if (input.nationality.length === 3) {
      alert("¡El perro no puede tener más de tres nationalityos!");
    } else if (input.nationality.length < 3) {
      setInput({
        ...input,
        nationality: [...input.nationality, e.target.value],
      });
    }
  } */
  function handleSubmit(e) {
    e.preventDefault();
    if (
      input.email !== "" &&
      input.password !== "" &&
      input.name !== "" &&
      input.lastname !== "" &&
      input.birthDate !== ""
    ) {
      dispatch(addUser(input));
      alert("El usuario fue creada con exito!");
      setInput({
        email: "",
        password: "",
        name: "",
        lastname: "",
        birthDate: "",
      });
      history.push("/persona");
    } else {
      alert("¡Faltan los elementos necesarios!");
    }
  }
  return (
    <div className={style.divContainer}>
      <Form onSubmit={(e) => handleSubmit(e)}>
        <Form.Group className="mb-3">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            placeholder="Enter email"
            type="email"
            value={input.email}
            name="email"
            id="email"
            required
            onChange={(e) => handleChange(e)}
          />
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
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ingrese su nombre"
            onChange={(e) => handleChange(e)}
            value={input.name}
            name="name"
            id="name"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Apellido</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ingrese su apellido"
            onChange={(e) => handleChange(e)}
            value={input.lastname}
            name="lastname"
            id="lastname"
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Fecha nacimiento</Form.Label>
          <Form.Control
            type="date"
            placeholder="Fecha de nacimiento"
            onChange={(e) => handleChange(e)}
            value={input.birthDate}
            name="birthDate"
            id="birthDate"
            required
          />
        </Form.Group>
        {/* <Form.Select
          className="mt-5"
          aria-label="Default select example"
          onChange={(e) => handleSelect(e)}
        >
          {nationality.map((nation) => (
            <option value={nation.name} key={nation.id}>
              {nation.name}
            </option>
          ))}
        </Form.Select> */}

        <Button variant="primary" className="mt-5" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default RegisterUser;
