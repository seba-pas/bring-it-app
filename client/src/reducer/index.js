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
  cities: [],
  allCities: [],
  business2: [],
  allBusiness2: [],
  provinces: [],

  putBusiness: "",
  businessEditInfo: {},

  uniqueProvinces: [],
  users: [],
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_ALL_PRODUCTS":
      return {
        ...state,
        products: action.payload,
        allProducts: action.payload,
        deleteProduct: "",
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
    case "PUT_BUSINESS":
      return {
        ...state,
        putBusiness: action.payload,
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
    case "CLEAN_USERS":
      return {
        ...state,
        user: {},
      };
    case "CLEAN_BUSINESS":
      return {
        ...state,
        business: {},
      };
    case "POST_LOGIN":
      return {
        ...state,
        user: action.payload,
      };
    case "POST_LOGINBUSINESS":
      return {
        ...state,
        business: action.payload[0],
        businessEmail: action.payload[1],
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
      // if(action.payload === 'All'){
      //   return {
      //     ...state,
      //     products: action.payload
      //   }
      // }else{
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

    // }

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
          : allProducts.filter(
              (e) =>
                e.categories &&
                e.categories.map((e) => e.name).includes(action.payload)
            );

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

    case "GET_ALL_BUSINESS":
      return {
        ...state,
        business2: action.payload,

        businessEditInfo: action.payload.filter(
          (e) => e.email === state.businessEmail
        )[0],
      };
    case "FILTER_BY_BUSINESS":
      const allBusiness = state.allProducts;

      const filterBusiness =
        action.payload === "All"
          ? allBusiness
          : allBusiness.filter(
              (e) => e.business.businessName === action.payload
            );
      return {
        ...state,
        products: filterBusiness,
      };

    case "GET_ALL_PROVINCES":
      return {
        ...state,
        provinces: action.payload,
      };

    case "FILTER_BY_PROVINCES":
      const allProvinces = state.allProducts;

      const filterProvinces =
        action.payload === "All"
          ? allProvinces
          : allProvinces.filter((e) => e.business.province === action.payload);
      return {
        ...state,
        products: filterProvinces,
      };

    case "GET_CITIES":
      return {
        ...state,
        cities: action.payload,
      };
    //Filtrado de ciudades segun la provincia
    case "FILTER_BY_PROVINCE_CITY":
      // const allProvinces = state.allProducts;
      // const filterProvinces = action.payload === 'All' ?
      // allProvinces :
      // allProvinces.filter((e) => e.business.province === action.payload)
      const allCities = state.allCities;
      const filterCities =
        action.payload === "All"
          ? allCities
          : allCities.filter((e) => e.provinceId === action.payload);

      return {
        ...state,
        cities: filterCities,
      };
    case "GET_USERS":
      return {
        ...state,
        users: action.payload,
      };

    default:
      return {
        ...state,
      };
  }
}
