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
    case "POST_LOGIN":
      return {
        ...state,
        users: action.payload,
      };
    case "GET_ALL_PRODUCTS_NAME":
      if (action.payload.length === 0) {
        return {
          ...state,
          error: "not found",
        };
      } else {
        return {
          ...state,
          products: action.payload,
        };
      }
    case "ORDER_BY_NAME":
      let sortedArr =
        action.payload === "asc"
          ? state.products.sort(function (a, b) {
              if (a.name.toLowerCase() > b.name.toLowerCase()) {
                return 1;
              }
              if (b.name.toLowerCase() > a.name.toLowerCase()) {
                return -1;
              }
              return 0;
            })
          : state.products.sort(function (a, b) {
              if (a.name.toLowerCase() > b.name.toLowerCase()) {
                return -1;
              }
              if (b.name.toLowerCase() > a.name.toLowerCase()) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        products: sortedArr,
      };
    case "ORDER_BY_PRICE":
      let sortedPrice =
        action.payload === "asc"
          ? state.allProducts.sort(function (a, b) {
              if (a.price > b.price) {
                return 1;
              }
              if (b.price > a.price) {
                return -1;
              }
              return 0;
            })
          : state.allProducts.sort(function (a, b) {
              if (a.price > b.price) {
                return -1;
              }
              if (b.price > a.price) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        products: sortedPrice,
      };

    default:
      return {
        ...state,
      };
  }
}
