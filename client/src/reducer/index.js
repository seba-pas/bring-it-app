const initialState = {
  products: [],
  productsDetail: {},
  allProducts: [],
  user: {},
  userToken: "",
  productId: {},
  product: {},
  changeProduct: {},
  business: {},
  businessToken: "",
  businessEmail: "",
  deleteProduct: "",
  categories: [],
  allCategories: [],
  cities: [],
  allCities: [],
  business2: [],
  allBusiness2: [],
  purchase: [],
  purchases: [],
  provinces: [],
  putUser: "",
  putBusiness: "",
  businessEditInfo: {},
  userEditInfo: {},
  uniqueProvinces: [],
  users: [],
  travel: "",
  allTravels: [],
  branches: [],
  provinceBranches: [],
  //Carrito (cart)
  cart: [],
  cart2: [],
  branchAdded: "",
  branchDeleted: "",
  branchPut: "",
  activeUser: "",
  activeBusiness: "",
  deletedBusiness: "",
  deletedUser: "",
  allEmail: [],
  review: "",
  images: [],
  favourites: [],

};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_ALL_PRODUCTS":
      return {
        ...state,
        products: action.payload,
        allProducts: action.payload,
        deleteProduct: "",
        favourites: action.payload
      };
    case "GET_PRODUCTS_DETAIL":
      return {
        ...state,
        productsDetail: action.payload,
      };
    case "POST_PURCHASE":
      return {
        ...state,
        purchase: action.payload,
      };
    case "GET_BY_PURCHASE_EMAIL":
      return {
        ...state,
        purchases: action.payload,
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
    case "DESACTIVATE_PRODUCT":
      return {
        ...state,
        desactivateProduct: action.payload,
      };
    case "CLEAN_USERS":
      return {
        ...state,
        user: "clean",
      };
    case "CLEAN_BUSINESS":
      return {
        ...state,
        business: "clean",
      };
    case "CLEAN_USER_STATE":
      return {
        ...state,
        user: "clean",
        userToken: "clean",
        activeUser: "clean"
      };
    case "CLEAN_BUSINESS_STATE":
      return {
        ...state,
        business: "clean",
        businessToken: "clean",
        businessEmail: "clean",
        activeBusiness: "clean"
      };
    case "POST_LOGIN":
      if (typeof action.payload === "string") {
        return {
          ...state,
          user: action.payload,
        };
      } else {
        return {
          ...state,
          user: action.payload.others.dataValues,
          userToken: action.payload.accessToken,
        };
      }
    case "PUT_USER":
      return {
        ...state,
        putUser: action.payload,
      };
    case "CLEAN_PUT_USER":
      return {
        ...state,
        putUser: "clean",
      };
    case "GET_USER_BY_EMAIL":
      return {
        ...state,
        user: action.payload,
      };
    case "POST_LOGINBUSINESS":
      if (typeof action.payload[0] === "string") {
        return {
          ...state,
          business: action.payload[0],
        };
      } else {
        return {
          ...state,
          business: action.payload[0].others.dataValues,
          businessEmail: action.payload[1],
          businessToken: action.payload[0].accessToken,
        };
      }

    case "GET_ALL_PRODUCTS_NAME":
      if (action.payload.length === 0) {
        return {
          ...state,
          error: "not found",
        };
      } else {
        return {
          ...state,
          products: action.payload
            ? action.payload
            : "No se encontraron productos asociados",
        };
      }
    case "GET_ACTIVE_USER":
      let userActive = state.user;
      return {
        ...state,
        user: userActive,
      };

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
        products: filterCategory.length
          ? filterCategory
          : "No se encontraron productos asociados",
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
        branchAdded: "",
        branchDeleted: "",
        branchPut: "",
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

    case "GET_ALL_BRANCHES":
      return {
        ...state,
        branches: action.payload,
      };
    case "FILTER_BY_BRANCHES":
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

    case "FILTER_BY_BRANCHES_PROVINCES":
      const allProvBranches = state.allProducts;
      const filterBranchesProvince =
        action.payload === "All"
          ? allProvBranches
          : allProvBranches.filter(
            (e) => e.businessbranch.province === action.payload
          );
      return {
        ...state,
        products: filterBranchesProvince.length
          ? filterBranchesProvince
          : "No se encontraron productos asociados",
      };
    case "SET_PRODUCTS":
      return {
        ...state,
        allProducts: [],
      };

    case "GET_ALL_PROVINCES":
      let sortedProv =
          state.provinces.sort(function (a, b) {
            if (a.nombre > b.nombre) {
              return 1;
            }
            if (b.nombre > a.nombre) {
              return -1;
            }
            return 0;
          })
      return {
        ...state,
        provinces: sortedProv,
      };

    case "FILTER_BY_PROVINCES":
      const allProvinces = state.allProducts;

      const filterProvinces =
        action.payload === "All"
          ? allProvinces
          : allProvinces.filter(
            (e) => e.businessbranch.province === action.payload
          );
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
    case "FILTER_BY_CITIES":
      const allCities = state.allProducts;
      const filterCities =
        action.payload === "All"
          ? allCities
          : allCities.filter((e) => e.business.cityId === action.payload);
      return {
        ...state,
        products: filterCities.length
          ? filterCities
          : "No se encontraron productos asociados",
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
      console.log(itemInCart);
      /* 
        itemIncart.stock > itemIncart.quantity ? itemInCart : alert('No tenemos tanto stock')
      */
      /* cart.filter((e) => e.id === product.id)[0].stock <
         cart.filter((e) => e.id === product.id)[0].quantity; */
      // itemInCart = state.cart.filter((e) => console.log(e))
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
        cart: [...state.cart],
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
    case "POST_REVIEW":
      return {
        ...state,
        review: action.payload
      }
    case "POST_BRANCH":
      return {
        ...state,
        branchAdded: action.payload,
      };
    case "DELETE_BRANCH":
      return {
        ...state,
        branchDeleted: action.payload,
      };
    case "EDIT_BRANCH":
      return {
        ...state,
        branchPut: action.payload,
      };


    //borrado lógico
    case "DESACTIVATE_USER":
      return {
        ...state,
        activeUser: action.payload,
        user: "clean"
      }
    case "ACTIVATE_USER":
      return {
        ...state,
        activeUser: action.payload,
      }
    case "DESACTIVATE_BUSINESS":
      return {
        ...state,
        activeBusiness: action.payload,
        business: "clean"
      }
    case "ACTIVATE_BUSINESS":
      return {
        ...state,
        activeBusiness: action.payload,
      }
    case "DELETE_BUSINESS":
      return {
        ...state,
        deletedBusiness: action.payload,
      }
    case "DELETE_USER":
      return {
        ...state,
        deletedUser: action.payload,
      }
    // fin borrado lógico
    case 'GET_EMAIL':
      return {
        ...state,
        allEmail: action.payload,
      }
    case "SAVE_IMAGE":
      return {
        ...state,
        images: action.payload.secure_url//[action.payload, ...state.images]
      };
    case 'GET_FAVOURITES':
      return{
        ...state,
        favourites: action.payload
      };
    case 'POST_FAVOURITES':
      return{
        ...state,
        favourites: action.payload
      }

    default:
      return {
        ...state,
      };
  }
}
