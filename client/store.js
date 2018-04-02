import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import axios from 'axios';


// category ---------------------------- //
const GET_CATEGORIES = 'GET_CATEGORIES';
const CREATE_CATEGORY = 'CREATE_CATEGORY';
const DELETE_CATEGORY = 'DELETE_CATEGORY';

const categories = ( state = [], action ) => {
  switch(action.type){
    case GET_CATEGORIES:
      console.log(`GET_CATEGORIES: `, action.categories);
      return action.categories
    case CREATE_CATEGORY:
      console.log(`CREATE_CATEGORY: `, action.category);
      return [...state, action.category];
    case DELETE_CATEGORY:
      console.log('DELETE_CATEGORY');
      return state.filter( category => category.id != action.category.id )
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

export const deleteCategory = ( category ) => {
  return dispatch => {
    console.log(`deleteCategory`, category.id)
    return axios.delete(`/api/categories/${category.id}`)
      .then(() => {
        console.log('deleted category', category)
        dispatch({ type: DELETE_CATEGORY, category })
      })
      .then(() => document.history.hash = '/products');
  };
};

//
/* --------- --------- ------------------------------------- */
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
      console.log('CREATE_PRODUCT', action.product)
      return [...state, action.product]
    case DELETE_CATEGORY:
      console.log('delete category prods', action.category.id)
      return state.filter(product => product.categoryId !== action.category.id*1)
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
      .then(() => {
        // document.location.hash = '/users'
        console.log(categoryId)
        document.location.hash = `/categories/${categoryId}`;
      })
  };
};
//
const reducer = combineReducers({
  categories,
  products
});

const store = createStore(reducer, applyMiddleware(thunkMiddleware));
export default store;
