import axios from "axios";


import { GET_ALL_PRODUCTS, GET_PRODUCTS_DETAIL, POST_USER, POST_PRODUCT, PUT_PRODUCT, POST_BUSINESS, GET_ALL_PRODUCTS_NAME, ORDER_BY_PRICE, GET_CATEGORIES, FILTER_BY_CATEGORY } from "./actionsTypes";


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
  return async function (dispatch) {
    try {
      const res = await axios(`http://localhost:3001/api/product?name=${name}`);
      return dispatch({
        type: GET_ALL_PRODUCTS_NAME,
        payload: res.data,
      });
    } catch (error) {
      alert("No existe ese producto");
    }
  };
};

export const setDetail = () => {
  return {
    type: SET_PRODUCT_DETAIL
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
};

export const editProduct = ({ id, body }) => {
  return async function (dispatch) {
    try {
      const res = await axios.update(
        `http://localhost:3001/api/product/${id}`,
        body
      );
      return dispatch({
        type: PUT_PRODUCT,
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};



//COMIENZA ORDENAMIENTO DE PRODUCTS

export const orderByPrice = (payload) => {
  return {
    type: ORDER_BY_PRICE,
    payload
  }
}

//COMIENZA FILTROS DE PRODUCTS

export const getCategories = () => {
  return async function(dispatch) {
      const res = await axios.get('http://localhost:3001/api/category');
      return dispatch({
          type: GET_CATEGORIES,
          payload: res.data
      })
    }
}

export const filterByCategory = (payload) => {
  return{
    type: FILTER_BY_CATEGORY,
    payload
  }
}


//TERMINA ACTION PRODUCT

//COMIENZA ACTION USER

export const login = (body) => {
  return async function (dispatch) {
    try {
      const res = await axios.post(
        `http://localhost:3001/api/user/login`,
        body
      );

      return dispatch({
        type: POST_LOGIN,
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

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
      });
    } catch (error) {
      console.log(error);
    }
  };
}


