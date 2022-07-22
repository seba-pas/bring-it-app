import axios from "axios";
import { GET_ALL_PRODUCTS, GET_PRODUCTS_DETAIL, POST_USER, POST_PRODUCT, PUT_PRODUCT, POST_BUSINESS, GET_ALL_PRODUCTS_NAME } from "./actionsTypes";


//Comienzan action PRODUCT
export const getAllProducts = () => {
  return async function (dispatch) {
    try {
      const res = await axios.get("http://localhost:3001/api/product");
      return dispatch({
        type: GET_ALL_PRODUCTS,
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const getAllProductsDetail = (id) => {
  return async function (dispatch) {
    try {
      const res = await axios.get(`http://localhost:3001/api/product/${id}`);
      return dispatch({
        type: GET_PRODUCTS_DETAIL,
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const getAllProductsName = (name) => {
  return async function (dispatch){
    try {
      const res = await axios(`http://localhost:3001/api/product?name=${name}`);
      return dispatch({
        type: GET_ALL_PRODUCTS_NAME,
        payload: res.data
      })
    } catch (error) {
      alert('No existe ese producto')
    }
  }
}

export const addProduct = (body) => {
  return async function (dispatch) {
    try {
      const res = await axios.post(`http://localhost:3001/api/product`, body);
      return dispatch({
        type: POST_PRODUCT,
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export const editProduct = ({ id, body }) => {
  return async function (dispatch) {
    try {
      const res = await axios.update(`http://localhost:3001/api/product/${id}`, body);
      return dispatch({
        type: PUT_PRODUCT,
        payload: res.data
      })
    } catch (error) {
      console.log(error);
    }
  }
}

//TERMINA ACTION PRODUCT

//COMIENZA ACTION USER

export const addUser = (body) => {
  return async function (dispatch) {
    try {
      const res = await axios.post(`http://localhost:3001/api/user`, body);
      return dispatch({
        type: POST_USER,
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};


//COMIENZA ACTION BUSINESS


export function addBusiness(body) {

  return async function (dispatch) {
    try {
      let json = await axios.post(`http://localhost:3001/api/business`, body);
      return dispatch({
        type: POST_BUSINESS,
        payload: json.data,
      })
    } catch (error) {
      console.log(error);
    }
  }
}

//COMIENZA ORDENAMIENTOS

export const orderByName = (payload) => {
  return {
      type: ORDER_BY_NAME,
      payload
  }
}

export const orderByPrice = (payload) => {
  return {
    type: ORDER_BY_PRICE,
    payload
  }
}