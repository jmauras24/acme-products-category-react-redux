import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import axios from 'axios';


// category
const GET_CATEGORIES = 'GET_CATEGORIES';
const CREATE_CATEGORY = 'CREATE_CATEGORY';

const categories = ( state = [], action ) => {
  switch(action.type){
    case GET_CATEGORIES:
      console.log(`GET_CATEGORIES: `, action.categories);
      return action.categories
      case CREATE_CATEGORY:
      console.log(`CREATE_CATEGORY: `, action.category);
      return [...state, action.category];
  }
  return state;
};

export const getCategories = (num) => {
  return ( dispatch ) => {
    console.log(num)
    return axios.get('/api/categories/')
      .then( res => res.data )
      .then( categories => {
         console.log(`result from get: ${categories}`, categories);
         dispatch({ type: GET_CATEGORIES, categories });
      })
  }
}

export const createCategory = ( categories ) => {
  return ( dispatch ) => {
    //TODO: should check uniqueness within existing categories before submitting
    const category = {name: `Category-${Math.floor(Math.random() * 999) + 1}`}
    return axios.post('/api/categories/', category )
      .then( res => res.data )
      .then( category => {
         dispatch({ type: CREATE_CATEGORY, category });
      })
  }
}
//
/* --------- --------- */
// product
const GET_PRODUCTS = 'GET_PRODUCTS';
const DELETE_PRODUCT = 'DELETE_PRODUCT';
const CREATE_PRODUCT = 'CREATE_PRODUCT';

const products = ( state = [], action ) => {
  switch(action.type){
    case GET_PRODUCTS:
      console.log(`GET_PRODUCTS: `, action.products);
      return action.products;
    case DELETE_PRODUCT:
      return state.filter( product => product.id != action.product.id*1)
    case CREATE_PRODUCT:
      return [...state, action.product]
  }
  return state;
};

export const getProducts = () => {
  return ( dispatch ) => {
    return axios.get('/api/products/')
      .then( res => res.data )
      .then( products => {
         console.log(`result from get: ${products}`, products);
         dispatch({ type: GET_PRODUCTS, products });
      })
  }
}

export const deleteProduct = ( product ) => {
  return dispatch => {
    return axios.delete(`/api/products/${product.id}`)
      .then(() => dispatch({ type: DELETE_PRODUCT, product }))
  };
};

export const createProduct = ( categoryId ) => {
  return dispatch => {
    //TODO: make sure ids unique for products
    const product = {name: `Product-${Math.floor(Math.random() * 999) + 1}`, categoryId};
    return axios.post('/api/products', product )
      .then(res => res.data)
      .then(product => {
        dispatch({ type: CREATE_PRODUCT, product })
      })
      .then(() => document.location.hash = `/categories/${categoryId}`)
  };
};
//
const reducer = combineReducers({
  categories,
  products
});

const store = createStore(reducer, applyMiddleware(thunkMiddleware));
export default store;
