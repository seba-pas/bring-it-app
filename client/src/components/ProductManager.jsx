import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Button, Col, Container, Form, Row } from "react-bootstrap";

import { addProduct, editProduct, getCategories, saveImage } from "../actions";
import styles from "../styles/ProductManager.module.css";
import swal from "sweetalert";
import { IoCloseCircleOutline } from "react-icons/io5";
import NavBarBusiness from "./NavBarBusiness";
function ProductManager(props) {
  const gState = useSelector((state) => state);
  const dispatch = useDispatch();
  const history = useHistory();
  let id = props.match.params.id;

  const tokenBusiness = gState.businessToken;

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  let product = gState.allProducts
    ? gState.allProducts.filter((e) => e.id === parseInt(id))[0]
    : {};
  console.log("product", product);

  let categories = gState.categories;

  const [input, setInput] = useState(
    id
      ? {
          name: product.name || "",
          price: product.price || 0,
          weight: product.weight || 0,
          image: product.image || "",
          stock: product.stock || 0,
          description: product.description || "",
          categoryId: product.categories?.map((e) => e.id) || [],
          allCategories: categories,
          branch: product.businessbranchId || "",
        }
      : {
          name: "",
          price: 0,
          weight: 0,
          image: "",
          stock: 0,
          description: "",
          categoryId: [],
          allCategories: categories,
          branch: "",
        }
  );

  const [error, setError] = useState({
    errorname: "",
    errorPrice: "",
    errorcategoryId: "",
    errorWeight: "",
    errorStock: "",
    errorbranch: "",
  });

  useEffect(() => {
    validate();
  }, [
    input.name,
    input.price,
    input.description,
    input.categoryId,
    input.weight,
    input.stock,
    input.branch,
  ]);

  const handleInputChange = (event) => {
    event.preventDefault();
    if (event.target.name === "categoryId") {
      if (!input.categoryId.includes(parseInt(event.target.value))) {
        setInput((prevInput) => {
          return {
            ...prevInput,
            categoryId: [...input.categoryId, parseInt(event.target.value)],
          };
        });
      }
    } else {
      setInput((prevInput) => {
        return {
          ...prevInput,
          [event.target.name]: event.target.value,
        };
      });
    }
  };

  const validate = () => {
    let errorname = "";
    let errorPrice = "";
    let errorDescription = "";
    let errorWeight = "";
    let errorStock = "";
    let errorcategoryId = "";
    let errorbranch = "";

    if (
      !/^[a-zA-Z ]{0,50}$/.test(input.name) ||
      input.name[0] === " " ||
      input.name === ""
    )
      errorname = "Debe escribir el nombre del producto";
    if (
      !/^[0-9]{0,10}$/.test(input.price) ||
      input.price < 0 ||
      input.price === ""
    )
      errorPrice = "Introduzca el precio";
    if (input.description[0] === " " || input.description === "")
      errorDescription = "Debe escribir descripcion del producto";
    if (input.categoryId.length < 1) errorcategoryId = "Seleccione  categorias";
    if (input.branch === "") errorbranch = "Seleccione  Sede";
    if (
      !/^[0-9]{0,10}$/.test(input.weight) ||
      input.weight < 0 ||
      input.weight === ""
    )
      errorWeight = "Introduzca el peso del producto";
    if (
      !/^[0-9]{0,10}$/.test(input.stock) ||
      input.stock < 0 ||
      input.stock === ""
    )
      errorStock = "Introduzca stock del producto";

    setError((prevInput) => {
      return {
        errorname: errorname,
        errorPrice: errorPrice,
        errorDescription: errorDescription,
        errorWeight: errorWeight,
        errorStock: errorStock,
        errorcategoryId: errorcategoryId,
        errorbranch: errorbranch,
      };
    });
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
    if (gState.images !== "") {
      setInput({
        ...input,
        image: gState.images,
      });
    }
  }, [gState.images]);

  const handleBack = (event) => {
    event.preventDefault();
    history.push("/empresas");
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (id !== undefined) {
      dispatch(
        editProduct(
          id,
          {
            name: input.name,
            price: input.price,
            weight: input.weight,
            image: input.image,
            stock: input.stock,
            description: input.description,
            categoryId: [...input.categoryId],
            businessEmail: gState.businessEmail, //hardcodeo para check
            businessbranchId: parseInt(input.branch),
          },
          tokenBusiness //envio de 3er parametro para enviar los headers en la accion (envio de token al back)
        )
      );
      swal("Buen trabajo!", "Editado satisfactoriamente!", "success");
    } else {
      dispatch(
        addProduct(
          {
            name: input.name,
            price: input.price,
            weight: input.weight,
            image: input.image,
            stock: input.stock,
            description: input.description,
            categoryId: [...input.categoryId],
            businessEmail: gState.businessEmail,
            businessbranchId: parseInt(input.branch),
          },
          tokenBusiness //envio de 3er parametro para enviar los headers en la accion (envio de token al back)
        )
      );

      swal("Buen trabajo!", "Producto agregado satisfactoriamente!", "success");
      setInput((prevInput) => {
        return {
          ...prevInput,
          name: "",
          price: 0,
          weight: 0,
          image: "",
          stock: 0,
          description: "",
          categoryId: [],
          branch: "",
        };
      });
    }

    //dispatch(editProduct(props.match.params.id, input));
  };
  const handleClick = (event, id) => {
    event.preventDefault();
    setInput((prevInput) => {
      return {
        ...prevInput,
        categoryId: input.categoryId.filter((e) => e !== id),
      };
    });
  };

  return (
    <div className={styles.ProductManager}>
      <NavBarBusiness />
      <Form onSubmit={handleSubmit} style={{marginTop: "30px",marginLeft: "60px",marginRight: "60px"}}>
        <Row>
          <Col
            lg={6}
            md={6}
            sm={12}
            
          >
            <Form.Label htmlFor="name">Producto:</Form.Label>
            <Form.Control
              // className={}
              type="text"
              name="name"
              value={input.name}
              placeholder="Producto"
              onChange={handleInputChange}
            />
            {/* {!error.errorProduct ? <h3><pre>    {null}                                          </pre></h3> : <h3><pre>          {error.errorProduct}             </pre></h3>} */}
            {!error.errorname ? (
              <label> </label>
            ) : (
              <label> {error.errorname} </label>
            )}
          </Col>
          <Col
            lg={6}
            md={6}
            sm={12}
            
          >
            <Form.Label htmlFor="price">Precio:</Form.Label>
            <Form.Control
              type="number"
              name="price"
              value={input.price}
              placeholder="Precio"
              onChange={handleInputChange}
            />
            {!error.errorPrice ? (
              <label> </label>
            ) : (
              <label> {error.errorPrice} </label>
            )}
          </Col>
        </Row>
        <Row>
          <Col
            lg={6}
            md={6}
            sm={12}
            
          >
            <Form.Label htmlFor="weight">Peso:</Form.Label>
            <Form.Control
              type="number"
              name="weight"
              value={input.weight}
              placeholder="Peso"
              onChange={handleInputChange}
            />
            {!error.errorWeight ? (
              <label></label>
            ) : (
              <label> {error.errorWeight} </label>
            )}
          </Col>
          <Col
            lg={6}
            md={6}
            sm={12}
            
          >
            <Form.Label htmlFor="stock">Stock:</Form.Label>
            <Form.Control
              type="number"
              name="stock"
              value={input.stock}
              placeholder="Stock"
              onChange={handleInputChange}
            />
            {!error.errorStock ? (
              <label> </label>
            ) : (
              <label> {error.errorStock} </label>
            )}
          </Col>
        </Row>
        <Row>
          <Col
            lg={6}
            md={6}
            sm={12}
            
          >
            <Form.Label htmlFor="image">Imagen:</Form.Label>
            <Form.Control
              type="file"
              name="image"
              // useRef={input.image}
              placeholder="Imagen"
              onChange={uploadImage}
            />
          </Col>
          <Col
            lg={6}
            md={6}
            sm={12}
            
          >
            <Form.Label>Sedes</Form.Label>
            <Form.Select
              name="branch"
              value={input.branch}
              onChange={handleInputChange}
            >
              <option value="">{}</option>
              {gState.businessEditInfo.businessbranches
                ?.filter((c) => c.active)
                .map((e) => (
                  <option key={e.id} value={e.id}>
                    {e.businessBranchName}
                  </option>
                ))}
            </Form.Select>
            {!error.errorbranch ? (
              <label> </label>
            ) : (
              <label> {error.errorbranch} </label>
            )}
          </Col>
        </Row>
        <Row>
          <Col
            lg={6}
            md={6}
            sm={12}
            
          >
            <Form.Label htmlFor="description">Descripción:</Form.Label>
            <Form.Control
              as="textarea"
              rows={2}
              value={input.description}
              name="description"
              required
              onChange={handleInputChange}
            />
            {!error.errorDescription ? (
              <label> </label>
            ) : (
              <label> {error.errorDescription} </label>
            )}
          </Col>
          <Col
            lg={6}
            md={6}
            sm={12}
            
          >
            <Form.Label>Categorias</Form.Label>
            <Form.Select
              name="categoryId"
              value="categoryId"
              onChange={handleInputChange}
            >
              <option value="">{}</option>
              {input.allCategories?.map((e) => (
                <option key={e.name} value={e.id}>
                  {e.name}
                </option>
              ))}
            </Form.Select>
            {!error.errorcategoryId ? (
              <label> </label>
            ) : (
              <label> {error.errorcategoryId} </label>
            )}
            <div className={styles.categoriesCardContainer}>
              <div>
                {input.categoryId.length
                  ? input.categoryId.map((e) => (
                      <div className={styles.cardCategories}>

                        {
                          input.allCategories.filter((el) => el.id === e)[0]
                            .name
                        }{" "}
                        <button
                          className={styles.btnClose}
                          currentTarget="1"
                          onClick={(event) => {
                            handleClick(event, e);
                          }}
                        >
                          <IoCloseCircleOutline />
                        </button>
                      </div>
                    ))
                  : ""}
              </div>
            </div>
          </Col>
        </Row>
        <Row style={{marginBottom:"30px",marginTop:"30px"}}>
          
          <Col>
            <div className={styles.backButton}>
              <button className={styles.btn} onClick={(e) => handleBack(e)}>
                Volver
              </button>
            </div>
          </Col>
          <Col>
            <div className={styles.subButton}>
              <button
                className={styles.btn}
                type="submit"
                disabled={
                  error.errorname ||
                  error.errorPrice ||
                  error.errorDescription ||
                  error.errorWeight ||
                  error.errorStock ||
                  error.errorcategoryId ||
                  error.errorbranch
                }
              >
                Listo
              </button>
            </div>
          </Col>
        </Row>
      </Form>
    </div>
  );
}

export default ProductManager;

