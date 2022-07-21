import axios from "axios";
import { GET_ALL_PRODUCTS, GET_PRODUCTS_DETAIL,POST_USER, POST_PRODUCT,PUT_PRODUCT} from "./actionsTypes";


//Comienzan action PRODUCT
export const getAllProducts = () => {
  return async function (dispatch) {
    try {
      const res = await axios.get("http://localhost:3001/api/product");
      return dispatch({
        type: GET_ALL_PRODUCTS,
        action: res.data,
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
        action: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const addProduct = (body) => {
    return async function (dispatch) {
        try {
          const res = await axios.post(`http://localhost:3001/api/product`, body);
          return dispatch({
            type: POST_PRODUCT,
            action: res.data,
          });
        } catch (error) {
          console.log(error);
        }
      };
}

export const editProduct = ({id,body}) => {
    return async function (dispatch){
        try {
            const res = await axios.update(`http://localhost:3001/api/product/${id}`, body);
            return dispatch({
                type:PUT_PRODUCT,
                action: res.data
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
        action: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};
