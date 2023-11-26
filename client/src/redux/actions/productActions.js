
import axios from "axios";

import * as actionTypes from '../constants/productConstant';

const URL = 'http://localhost:8000';
 

export const getProducts = () => async (dispatch) => { // API call through redux using middlware( async(dispatch))
    try{
        const {data} = await axios.get(`${URL}/products`); // API called and from full object data is taken and called dispatch.
        
        dispatch({type: actionTypes.GET_PRODUCTS_SUCCESS, payload: data})
        // this dispatch will call getProductsReducer() function which is in productsReducer.js
        // value is in the payload
    } catch (error) {
       // console.log('Error while calling getProducts api', error.message);
       dispatch({type: actionTypes.GET_PRODUCTS_FAIL, payload: error.message })
    }
    // API call karne keliye sabse pehle me getProducts() function call karna chahiye. vo call home.jsx file me use effect ke dvaara karega. now, after api call and after dispatch function, productReducer file me switch case ke andar result return hore he.then, values which will return in getProductsReducer() function will get stored inside getProducts reducer in the store.js 
}


export const getProductDetails = (id) => async (dispatch) => {
    try{
        dispatch({type: actionTypes.GET_PRODUCT_DETAILS_REQUEST});// dispatch came brfore api call because to skip loading case.

        const { data } = await axios.get(`${URL}/product/${id}`); // API call request

        dispatch({type: actionTypes.GET_PRODUCT_DETAILS_SUCCESS, payload: data})

    } catch (error) {
        dispatch({type: actionTypes.GET_PRODUCT_DETAILS_FAIL, payload: error.message })
    }   
}
