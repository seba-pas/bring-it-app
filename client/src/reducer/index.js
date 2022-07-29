const initialState = {
  products: [],
  productsDetail: {},
  allProducts: [],
  user: {},
  productId: {},
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
  putEmail: "",
  putBusiness: "",
  businessEditInfo: {},
  userEditInfo: {},
  uniqueProvinces: [],
  users: [],
  travel: "",
  allTravels: [],
  branches: [],
  //Carrito (cart)
  cart: [],
  cart2: [] // cart: [ [{producto1 con todos sus datos}, cantidad], [{producto2 con todos sus datos}, cantidad] ]
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
    case "PUT_USER":
      return {
        ...state,
        putEmail: action.payload,
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
          products: action.payload? action.payload : "No se encontraron productos asociados",
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
          ? state.products.sort(function (a, b) {
              if (a.price > b.price) {
                return 1;
              }
              if (b.price > a.price) {
                return -1;
              }
              return 0;
            })
          : state.products.sort(function (a, b) {
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
      const uniqueProvince = [
        ...new Set(action.payload.map((e) => e.province)),
      ];
      return {
        ...state,
        business2: action.payload,
        businessEditInfo: action.payload.filter(
          (e) => e.email === state.businessEmail
        )[0],
        uniqueProvinces: uniqueProvince,
      };
    case "FILTER_BY_BUSINESS":
      const allBusiness = state.allProducts;

      const filterBusiness =
        action.payload === "All"
          ? allBusiness
          : allBusiness.filter(
            (e) => e.businessbranch.businessBranchName === action.payload
          );
      return {
        ...state,
        products: filterBusiness.length
          ? filterBusiness
          : "No se encontraron productos asociados",
      };

    case 'GET_ALL_BRANCHES':
      return {
        ...state,
        branches: action.payload,
      };
      case "FILTER_BY_BRANCHES":
      const allBranches = state.allProducts;

      const filterBranches =
        action.payload === "All"
          ? allBranches
          : allBranches.filter(
            (e) => e.businessbranch.businessBranchName === action.payload
          );
      return {
        ...state,
        products: filterBranches.length
          ? filterBranches
          : "No se encontraron productos asociados",
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
          : allProvinces.filter((e) => e.businessbranch.province === action.payload);
      return {
        ...state,
        products: filterProvinces.length
          ? filterProvinces
          : "No se encontraron productos asociados",
      };

    case "GET_ALL_CITIES":
      return {
        ...state,
        allCities: action.payload,
      };
      case 'FILTER_BY_CITIES':
        const allCities = state.allProducts;
        const filterCities = action.payload === 'All'
        ?allCities
        :allCities.filter((e) => e.business.cityId === action.payload)
        // console.log(allCities)
      return{
        ...state,
        products: filterCities.length ? filterCities : "No se encontraron productos asociados"
      };

    //Filtrado de ciudades segun la provincia (recibe provinceId (string))
    case "FILTER_BY_PROVINCE_CITY":
      const filteredCities = state.allCities.filter((city) =>
        city.provinceId.includes(action.payload)
      );

      return {
        ...state,
        cities: filteredCities,
      };

    case "GET_USERS":
      return {
        ...state,
        users: action.payload,
        userEditInfo: action.payload.filter((e) => e.email === state.email)[0],
      };

    case "ADD_TO_CART":
      //Agrega el producto completo al cart y pone cantidad 1 (recibe id). Se dispara desde la card de producto
      const productoCantidad = action.payload;
      let itemInCart = state.cart.find(
        (item) => item.id === productoCantidad.id
      );
      return itemInCart
        ? {
            ...state,
            cart: state.cart.map((item) =>
            item.id === productoCantidad.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
            ),
          }
          : {

            ...state,
            cart: [...state.cart, { ...productoCantidad, quantity: 1 }],
          };

    //Disminuye en 1 la cantidad de un producto ya existente en el carrito. Si es 0, deberia eliminarlo del arreglo cart (recibe id)
    case "REMOVE_ONE_FROM_CART":
      let itemToDelete = state.cart.find((item) => item.id === action.payload);
      return itemToDelete.quantity > 1
        ? {
            ...state,
            cart: state.cart.map((item) =>
              item.id === action.payload
                ? { ...item, quantity: item.quantity - 1 }
                : item
            ),
          }
        : {
            ...state,
            cart: state.cart.filter((item) => item.id !== action.payload),
          };
    //Elimina el producto del arreglo cart (recibe id)
    case "REMOVE_ALL_FROM_CART":
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload),
      };
    //Vuelve el cart a arreglo vacio
    case "CLEAR_CART":
      return {
        ...state,
        cart: [],
      };
    case "GET_CART":
      return {
        ...state,
        
        cart: [...state.cart]
      };

    case "ADD_TRAVEL":
      return {
        ...state,
        travel: action.payload,
      };
    case "GET_TRAVELS":
      return {
        ...state,
        allTravels: action.payload,
      };

    default:
      return {
        ...state,
      };
  }
}
