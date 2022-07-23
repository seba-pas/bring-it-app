const initialState = {
  products: [],
  productsDetail: {},
  allProducts: [],
  user: {},
  product: {},
  changeProduct: {},
  business: {},
  businessEmail: "",
  deleteProduct: "",
  categories: [],
  allCategories: [],
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
        business: action.payload[0],
        businessEmail: action.payload[1],
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
    case "DELETE_PRODUCT":
      return {
        ...state,
        deleteProduct: action.payload,
      };

    case "POST_LOGIN":
      return {
        ...state,
        users: action.payload,
        user: action.payload,
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
    case "GET_CATEGORIES":
      return {
        ...state,
        categories: action.payload,
      };
    case "FILTER_BY_CATEGORY":
      const allProducts = state.allProducts;
      const filterCategory =
        action.payload === "All"
          ? allProducts
          : allProducts.filter((e) => e.categories[0].name === action.payload);
      console.log(filterCategory);
      console.log(action.payload, "Payload");
      return {
        ...state,
        products: filterCategory,
      };

    case "SET_PRODUCT_DETAIL":
      return {
        ...state,
        productsDetail: {},
      };
    default:
      return {
        ...state,
      };
  }
}
