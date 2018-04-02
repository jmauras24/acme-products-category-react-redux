import React from 'react';
import { connect } from 'react-redux';
import { deleteProduct } from '../store';
import { Link } from 'react-router-dom';

const Products = ({ products, deleteProduct, categories }) => {
  console.log('PRODUCTS', products, categories);
  // if(!products.length)
  //   return null

  // I do not always have a category array nested on return
  return(
    <div>
      <h2><Link to='/'>Home</Link></h2>
      <h1>All Products { products.length }</h1>

      <ul>
        {
          products.map( product => {
            const category = categories.find( category => category.id === product.categoryId);
            return(
                <li key={ product.id }> { product.name }  <button onClick={ () => deleteProduct(product) }>Delete Product </button>  ({category.name}) </li>
            )
          })
        }
      </ul>
    </div>
  )
};

const mapStateToProps = ({ products, categories }) => {
  console.log('products state', products)
  return {
    products,
    categories
  };
};

const mapDispatchToProps = ( dispatch ) => {
  return {
    deleteProduct: (product) => dispatch(deleteProduct(product))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Products);
