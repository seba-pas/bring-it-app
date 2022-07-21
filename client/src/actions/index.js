import axios from 'axios';
import { GET_ALL_PRODUCTS, GET_PRODUCTS_DETAIL } from './actionsTypes';

export const getAllProducts = () => {
    return async function(dispatch){
        try {
            const res = await axios('http://localhost:3001/product');
            return dispatch({
                type: GET_ALL_PRODUCTS,
                action: res.data
            })
            
        } catch (error) {
          console.log(error)  
        }
    }
}

export const getAllProductsDetail = (id) => {
    return async function(dispatch) {
        try {
            const res = await axios(`http://localhost:3001/product/${id}`)
            return dispatch({
                type: GET_PRODUCTS_DETAIL,
                action: res.data
            })
            
        } catch (error) {
            console.log(error)
        }
    }
}