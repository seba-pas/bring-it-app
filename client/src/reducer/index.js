const initialState = {
  products: [],
  productsDetail: {},
  allProducts: [],
  user: {},
  product: {},
  changeProduct: {},
  business: {},
  product: {},
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_ALL_PRODUCTS":
      return {
        ...state,
        products: action.payload,
        allProducts: action.payload,
      };
    case "GET_PRODUCTS_DETAIL":
      return {
        ...state,
        productsDetail: action.payload,
      };

    case "POST_USER":
      return {
        ...state,
        user: action.payload,
      };
    case "POST_BUSINESS":
      return {
        ...state,
        business: action.payload,
      };
    case "POST_PRODUCT":
      return {
        ...state,
        product: action.payload,
      };
    case "PUT_PRODUCT":
      return {
        ...state,
        changeProduct: action.payload,
      };
    case 'GET_ALL_PRODUCTS_NAME':
      if(action.payload.length === 0){
          return {
              ...state,
              error: 'not found'
          }
      } else {

          return {
              ...state,
              products: action.payload
          }
      }

    default:
      return {
        ...state,
      };
  }
}