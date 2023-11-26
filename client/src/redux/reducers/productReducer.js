// redux is a database for frontend.states can be stored in frontend at centralised repository named redux.

import * as actionType from "../constants/productConstant";

export const getProductsReducer = (state = { products: [] }, action) => {
  // more than one product can be possible so array of products are taken.
  // state is a current value and action is a updated value that is value after dispatch will come into action.
  // initially we took products as an empty array because if below cases while mapping payload data with products if it maps undefined value with product then loop will break.so empty array is passed to save from breaking.

  switch (action.type) {
    case actionType.GET_PRODUCTS_SUCCESS:
      return { products: action.payload }; // data is in the payload. so to access data we have to write action.payload
    case actionType.GET_PRODUCTS_FAIL:
      return { error: action.payload };
    default:
      return state;
  }
};

export const getProductDetailsReducer = (state = { product: {} }, action) => {
  // here only one product detail will be taken so an object is taken for state instead of array.

      switch(action.type) {
          case actionType.GET_PRODUCT_DETAILS_REQUEST:
             return { loading: true}
          case actionType.GET_PRODUCT_DETAILS_SUCCESS:
              return { loading: false, product: action.payload}
          case actionType.GET_PRODUCT_DETAILS_FAIL:
                return { loading: false, error: action.payload}
          case actionType.GET_PRODUCT_DETAILS_RESET:
                  return { product: {} }

          default:
            return state
      }
};
