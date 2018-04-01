import React from 'react';
import { connect } from 'react-redux';
import { deleteProduct } from '../store';

const Products = ({ products, deleteProduct }) => {
  console.log('PRODUCTS', products)
  // if(!products.length)
  //   return null
  return(
    <div>
      <h1>All Products { products.length }</h1>
      <ul>
        {
          products.map( product => {
            return(
              <div>
                <li key={ product.id }> { product.name }  <button onClick={ () => deleteProduct(product) }>Delete Product </button> </li>

                <span>{ product.category.name } </span>
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
