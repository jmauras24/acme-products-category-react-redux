import React from 'react';
import { connect } from 'react-redux';
import { deleteProduct } from '../store';
import { Link } from 'react-router-dom';

const Products = ({ products, deleteProduct }) => {
  console.log('PRODUCTS', products)
  // if(!products.length)
  //   return null
  return(
    <div>
      <h2><Link to='/'>Home</Link></h2>
      <h1>All Products { products.length }</h1>

      <ul>
        {
          products.map( product => {
            return(
              <div>
                <li key={ product.id }> { product.name }  <button onClick={ () => deleteProduct(product) }>Delete Product </button>  ({ product.category.name }) </li>
              </div>
            )
          })
        }
      </ul>
    </div>
  )
};

const mapStateToProps = ({ products }) => {
  return {
    products
  };
};

const mapDispatchToProps = ( dispatch ) => {
  return {
    deleteProduct: (product) => dispatch(deleteProduct(product))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Products);
