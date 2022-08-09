import axios from "axios";

import {
  PASS_CHANGE_BUSINESS,
  PASS_CHANGE,
  POST_REVIEW,
  GET_EMAIL,
  GET_ALL_PRODUCTS,
  GET_PRODUCTS_DETAIL,
  POST_USER,
  POST_PRODUCT,
  PUT_PRODUCT,
  POST_BUSINESS,
  POST_LOGIN,
  POST_LOGINBUSINESS,
  GET_ALL_PRODUCTS_NAME,
  DESACTIVATE_PRODUCT,
  ORDER_BY_PRICE,
  GET_CATEGORIES,
  FILTER_BY_CATEGORY,
  SET_PRODUCT_DETAIL,
  CLEAN_USERS,
  CLEAN_USER_STATE,
  CLEAN_BUSINESS,
  CLEAN_BUSINESS_STATE,
  FILTER_BY_PROVINCE_CITY,
  GET_ALL_CITIES,
  GET_USERS,
  GET_ALL_PROVINCES,
  FILTER_BY_PROVINCES,
  GET_ALL_BUSINESS,
  FILTER_BY_BUSINESS,
  PUT_USER,
  CLEAN_PUT_USER,
  GET_USER_BY_EMAIL,
  GET_ACTIVE_USER,
  PUT_BUSINESS,
  ADD_TRAVEL,
  GET_TRAVELS,
  FILTER_BY_CITIES,
  GET_ALL_BRANCHES,
  FILTER_BY_BRANCHES,
  FILTER_BY_BRANCHES_PROVINCES,
  SET_PRODUCTS,
  POST_PURCHASE,
  //Acciones del carrito (cart)
  ADD_TO_CART,
  INCREMENT_ONE_IN_CART,
  REMOVE_ONE_FROM_CART,
  REMOVE_ALL_FROM_CART,
  CLEAR_CART,
  GET_CART,

  //acciones sites
  POST_BRANCH,
  DELETE_BRANCH,
  EDIT_BRANCH,
  GET_BY_PURCHASE_EMAIL,

  //borrado lógico
  ACTIVATE_BUSINESS,
  ACTIVATE_USER,
  DESACTIVATE_BUSINESS,
  DESACTIVATE_USER,
  DELETE_BUSINESS,
  DELETE_USER,
  ACTIVATE_BRANCH,
  ACTIVATE_PRODUCT,
  SAVE_IMAGE,

  // RESET_INITIAL_STATE,

  //MACH
  GET_MATCH,
  PUT_MATCH,
  CLEAN_MATCH,

  //FAVORITES
  GET_FAVOURITES,
  POST_FAVOURITES,
  CLEAN_GET_MATCH,
  DELETE_FAVOURITE,
  GET_ALL_FAVOURITES,

  //login con Google
  POST_LOGIN_GOOGLE,
  GET_ALL_PURCHASES,
  LOGOUT_GOOGLE_SESSION,
} from "./actionsTypes";

//Comienzan action PRODUCT
export const getAllProducts = () => {
  return async function (dispatch) {
    try {
      const res = await axios.get("/product");
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
      const res = await axios.get(`/product/${id}`);
      return dispatch({
        type: GET_PRODUCTS_DETAIL,
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const recoverPassword = (body) => {
  console.log("input", body);
  return async function (dispatch) {
    try {
      const res = await axios.post("/recoverPassword", body);
      console.log("recoverPassword: ", res.data);
      return dispatch({
        type: "PASS_RECOVER",
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const cleanRecoverPassword = () => {
  return {
    type: "CLEAN_RECOVER_PASSWORD",
  };
};

export const getAllProductsName = (name) => {
  return async function (dispatch) {
    try {
      const res = await axios(`/product?name=${name}`);
      return dispatch({
        type: GET_ALL_PRODUCTS_NAME,
        payload: res.data,
      });
    } catch (error) {
      alert("No se encontraron productos asociados");
    }
  };
};

export const setDetail = () => {
  return {
    type: SET_PRODUCT_DETAIL,
  };
};

// export const resetInitialState = () => {
//   return {
//     type: RESET_INITIAL_STATE
//   }
// }

export const setProduct = () => {
  return {
    type: SET_PRODUCTS,
  };
};

export const addProduct = (body, token) => {
  return async function (dispatch) {
    try {
      const res = await axios.post(`/product`, body, {
        headers: { authorization: `Bearer ${token}` },
      });
      return dispatch({
        type: POST_PRODUCT,
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const editProduct = (id, body, token) => {
  return async function (dispatch) {
    try {
      console.log("este es el body", body);
      const res = await axios.put(`/product/${id}`, body, {
        headers: { authorization: `Bearer ${token}` },
      });

      return dispatch({
        type: PUT_PRODUCT,
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};
export const desactivateProduct = (id, token, businessEmail) => {
  return async function (dispatch) {
    try {
      const body = { active: false, businessEmail: businessEmail };
      const res = await axios.put(`/product/${id}`, body, {
        headers: { authorization: `Bearer ${token}` },
      });
      return dispatch({
        type: DESACTIVATE_PRODUCT,
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};
export const activateProduct = (id, token, businessEmail) => {
  return async function (dispatch) {
    try {
      const body = { active: true, businessEmail: businessEmail };
      const res = await axios.put(`/product/${id}`, body, {
        headers: { authorization: `Bearer ${token}` },
      });
      return dispatch({
        type: ACTIVATE_PRODUCT,
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
    payload,
  };
};

//COMIENZA FILTROS DE PRODUCTS

export const getCategories = () => {
  return async function (dispatch) {
    const res = await axios.get("/category");

    return dispatch({
      type: GET_CATEGORIES,
      payload: res.data,
    });
  };
};

export const filterByCategory = (payload) => {
  return {
    type: FILTER_BY_CATEGORY,
    payload,
  };
};

export const getAllProvinces = () => {
  return async function (dispatch) {
    const res = await axios("/province");
    return dispatch({
      type: GET_ALL_PROVINCES,
      payload: res.data,
    });
  };
};

export const filterByProvinces = (payload) => {
  return {
    type: FILTER_BY_PROVINCES,
    payload,
  };
};

export const getAllBusiness = () => {
  return async function (dispatch) {
    const res = await axios("/business");
    return dispatch({
      type: GET_ALL_BUSINESS,
      payload: res.data,
    });
  };
};

export const filterByBusiness = (payload) => {
  return {
    type: FILTER_BY_BUSINESS,
    payload,
  };
};

export const getAllBranches = () => {
  return async function (dispatch) {
    const res = await axios("/businessbranch");
    return dispatch({
      type: GET_ALL_BRANCHES,
      payload: res.data,
    });
  };
};

export const filterByBranches = (payload) => {
  return {
    type: FILTER_BY_BRANCHES,
    payload,
  };
};

export const filterByBranchesProvince = (payload) => {
  return {
    type: FILTER_BY_BRANCHES_PROVINCES,
    payload,
  };
};

export const getAllCities = () => {
  return async function (dispatch) {
    const res = await axios("/city");

    return dispatch({
      type: GET_ALL_CITIES,
      payload: res.data,
    });
  };
};

export const filterByCities = (payload) => {
  return {
    type: FILTER_BY_CITIES,
    payload,
  };
};
export const filterByProvinceCity = (payload) => {
  return {
    type: FILTER_BY_PROVINCE_CITY,
    payload,
  };
};

//TERMINA ACTION PRODUCT

//LIMPIAR ESTADOS AL CERRAR SESION
export const cleanUserState = () => {
  return {
    type: CLEAN_USER_STATE,
  };
};

export const cleanBusinessState = () => {
  return {
    type: CLEAN_BUSINESS_STATE,
  };
};

export const cleanUsers = () => {
  return { type: CLEAN_USERS };
};

export const cleanBusiness = () => {
  return { type: CLEAN_BUSINESS };
};
//COMIENZA ACTION USER

export const getUsers = () => {
  return async function (dispatch) {
    try {
      const res = await axios("/user");
      return dispatch({
        type: GET_USERS,
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const login = (body) => {
  return async function (dispatch) {
    try {
      const res = await axios.post(`/user/login`, body);
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
      const res = await axios.post(`/user`, body);
      console.log("res", res);
      return dispatch({
        type: POST_USER,
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};
export const getActiveUser = () => {
  return {
    type: GET_ACTIVE_USER,
  };
};

export const editUser = (id, body, token) => {
  return async function (dispatch) {
    try {
      const res = await axios.put(`/user/${id}`, body, {
        headers: { authorization: `Bearer ${token}` },
      });
      return dispatch({
        type: PUT_USER,
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const cleanPutUser = () => {
  return { type: CLEAN_PUT_USER };
};

export const getUserByEmail = (email) => {
  return async function (dispatch) {
    try {
      const res = await axios.get(`/user/${email}`);
      return dispatch({
        type: GET_USER_BY_EMAIL,
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
      let json = await axios.post(`/business`, body);

      return dispatch({
        type: POST_BUSINESS,
        payload: [json.data, body.email],
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function postPurchase(body) {
  return async function (dispatch) {
    let res = await axios.post(`/purchase`, body);
    try {
      return dispatch({
        type: POST_PURCHASE,
        payload: res.data,
      });
    } catch (error) {
      console.log("errorFront", `${error.message}`);
    }
  };
}

export const loginBusiness = (body) => {
  return async function (dispatch) {
    try {
      const res = await axios.post(`/business/login`, body);
      return dispatch({
        type: POST_LOGINBUSINESS,
        payload: [res.data, body.email],
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const editBusiness = (id, body, token) => {
  console.log("el body de edit business", body);
  return async function (dispatch) {
    try {
      const res = await axios.put(`/business/${id}`, body, {
        headers: { authorization: `Bearer ${token}` },
      });
      return dispatch({
        type: PUT_BUSINESS,
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

//post travel
export const addTravel = (body, token) => {
  return async function (dispatch) {
    try {
      const res = await axios.post(`/travel`, body, {
        headers: { authorization: `Bearer ${token}` },
      });
      return dispatch({
        type: ADD_TRAVEL,
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const getByPurchaseEmail = (email) => {
  return async function (dispatch) {
    try {
      const res = await axios.get(`/purchase/email/${email}`);
      return dispatch({
        type: GET_BY_PURCHASE_EMAIL,
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};
export const getAllPurchases = () => {
  return async function (dispatch) {
    try {
      const res = await axios.get(`/purchase`);
      console.log("esto llega get all", res.data);
      return dispatch({
        type: GET_ALL_PURCHASES,
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

//get travels
export const getAllTravel = () => {
  return async function (dispatch) {
    try {
      const res = await axios.get(`/travel`);
      return dispatch({
        type: GET_TRAVELS,
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export function addToCart(productsDetail) {
  return {
    type: ADD_TO_CART,
    payload: productsDetail,
  };
}

//Disminuye en 1 la cantidad de un producto ya existente en el carrito. Si es 0, deberia eliminarlo del arreglo cart (recibe id)
export function removeOneFromCart(productId) {
  return {
    type: REMOVE_ONE_FROM_CART,
    payload: productId,
  };
}

// Elimina el producto del cart (recibe id)
export function removeAllFromCart(productId) {
  return {
    type: REMOVE_ALL_FROM_CART,
    payload: productId,
  };
}

//Elimina todos los productos del cart (recibe id)
export function clearCart() {
  return {
    type: CLEAR_CART,
  };
}

export function getCart() {
  return {
    type: GET_CART,
  };
}

export function postReview(body) {
  return async function (dispatch) {
    try {
      const res = await axios.post(`/review`, body);
      debugger;
      return dispatch({
        type: POST_REVIEW,
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

// agregar sede
export function postBranch(body, token) {
  return async function (dispatch) {
    try {
      const res = await axios.post(`/businessbranch`, body, {
        headers: { authorization: `Bearer ${token}` },
      });
      return dispatch({
        type: POST_BRANCH,
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

//edit branch
export function editBranch(id, body, token) {
  return async function (dispatch) {
    try {
      const res = await axios.put(`/businessbranch/${id}`, body, {
        headers: { authorization: `Bearer ${token}` },
      });
      return dispatch({
        type: EDIT_BRANCH,
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

//borrar sede (desactivar)
export const deleteBranch = (id, token) => {
  return async function (dispatch) {
    try {
      const body = { active: false };
      const res = await axios.put(`/businessbranch/${id}`, body, {
        headers: { authorization: `Bearer ${token}` }, //falta en ruta
      });
      return dispatch({
        type: DELETE_BRANCH,
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

//Activar branch
export const activateBranch = (id, token) => {
  return async function (dispatch) {
    try {
      const body = { active: true };
      const res = await axios.put(`/businessbranch/${id}`, body, {
        headers: { authorization: `Bearer ${token}` }, //falta en ruta
      });
      return dispatch({
        type: ACTIVATE_BRANCH,
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

// desactivar cuenta usuario
export const desactivateUser = (email, token) => {
  return async function (dispatch) {
    try {
      const body = { active: false };
      const res = await axios.put(`/user/${email}`, body, {
        headers: { authorization: `Bearer ${token}` },
      });
      return dispatch({
        type: DESACTIVATE_USER,
        payload: res.data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};

// activar cuenta usuario
export const activateUser = (email, token) => {
  return async function (dispatch) {
    try {
      const body = { active: true };
      const res = await axios.put(`/user/${email}`, body, {
        headers: { authorization: `Bearer ${token}` },
      });
      return dispatch({
        type: ACTIVATE_USER,
        payload: res.data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};

// desactivar cuenta business
export const desactivateBusiness = (email, token) => {
  return async function (dispatch) {
    try {
      const body = { active: true };
      console.log(token);
      const res = await axios.put(`/business/desactivate/${email}`, body, {
        headers: { authorization: `Bearer ${token}` },
      });

      return dispatch({
        type: DESACTIVATE_BUSINESS,
        payload: res.data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};

// activar cuenta business
export const activateBusiness = (email, token) => {
  return async function (dispatch) {
    try {
      const res = await axios.put(
        `/business/activate/${email}`,
        { body: true },
        {
          headers: { authorization: `Bearer ${token}` },
        }
      );
      return dispatch({
        type: ACTIVATE_BUSINESS,
        payload: res.data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};

// banear cuenta usuario
export const deleteUser = (email, token) => {
  return async function (dispatch) {
    try {
      const res = await axios.put(
        `/user/baneo/${email}`,
        { body: true },
        {
          headers: { authorization: `Bearer ${token}` },
        }
      );
      return dispatch({
        type: DELETE_USER,
        payload: res.data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};

// banear cuenta empresa
export const deleteBusiness = (email, token) => {
  return async function (dispatch) {
    try {
      const res = await axios.put(
        `/business/baneo/${email}`,
        { body: true },
        {
          headers: { authorization: `Bearer ${token}` },
        }
      );
      return dispatch({
        type: DELETE_BUSINESS,
        payload: res.data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};

// all email
export const getAllEmail = () => {
  return async function (dispatch) {
    try {
      const res = await axios.get("/business/email");
      return dispatch({
        type: GET_EMAIL,
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const putMatch = (idPurchase, idTravel) => {
  return async function (dispatch) {
    try {
      const res = await axios.put(`/travel/purchase/${idPurchase}/${idTravel}`);
      return dispatch({
        type: PUT_MATCH,
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const getMatch = (idPurchase) => {
  return async function (dispatch) {
    try {
      const res = await axios.get(`/travel/purchase/${idPurchase}`);
      return dispatch({
        type: GET_MATCH,
        payload: [res.data, idPurchase],
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export function cleanGetMatch() {
  return {
    type: CLEAN_GET_MATCH,
  };
}

export function cleanMatch() {
  return {
    type: CLEAN_MATCH,
  };
}

//SAVE IMAGE

export const saveImage = (urlImage) => {
  return async function (dispatch) {
    try {
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/bringitapp/upload",
        urlImage
      );

      return dispatch({
        type: SAVE_IMAGE,
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

//FAVORITOS
export const getFavourites = (userEmail) => {
  return async function (dispatch) {
    try {
      const res = await axios(`/favorite/user/${userEmail}`);

      return dispatch({
        type: GET_FAVOURITES,
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const getAllFavourites = () => {
  return async function (dispatch) {
    try {
      const res = await axios.get("/favorite/products");
      return dispatch({
        type: GET_ALL_FAVOURITES,
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const postFavourites = (body) => {
  return async function (dispatch) {
    try {
      const res = await axios.post(`/favorite`, body);
      return dispatch({
        type: POST_FAVOURITES,
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const deleteFavourite = (body) => {
  return async function (dispatch) {
      try {
      const res = await axios.delete(`/favorite`, {
        data: { userEmail: body.userEmail, productId: body.productId },
      });
      return dispatch({
        type: DELETE_FAVOURITE,
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

// CAMBIO DE PASSWORD
export const changePassword = (email, body) => {
  return async function (dispatch) {
    try {
      const res = await axios.put(`/user/recover/password/${email}`, body);
      console.log(res.data);
      return dispatch({
        type: PASS_CHANGE,
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const changePasswordBusiness = (email, body) => {
  return async function (dispatch) {
    try {
      const res = await axios.put(`/business/recover/password/${email}`, body);
      return dispatch({
        type: PASS_CHANGE_BUSINESS,
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

// login con Google
export const loginUserGoogle = (body) => {
  return async function (dispatch) {
    try {
      const res = await axios.post(`/user/google/login/`, body);
      return dispatch({
        type: POST_LOGIN_GOOGLE,
        payload: res.data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};

// logout de la sesión de Google
export const logoutGoogleSession = () => {
  return async function (dispatch) {
    try {
      const res = await axios.get(`/auth/logout/google`, {
        withCredentials: true,
      });
      debugger;
      console.log(res);
      return dispatch({
        type: LOGOUT_GOOGLE_SESSION,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};
