import React from 'react';
import { connect } from 'react-redux';
import { createProduct, deleteCategory } from '../store';
import { Link } from 'react-router-dom';

const Category = ({ category, products ,createProduct, deleteCategory  }) => {

  console.log('*****',category)
  const count = category.products ? category.products.length : 0;
  console.log(count)
  return(
    <div>
      <h3><Link to='/'>Home</Link></h3>
      <h2>{ category.name }</h2>
      <span>
        <button onClick={ () => deleteCategory(category) }>Delete Category</button>
        <button onClick={ () => createProduct(category.id) }>Add Product</button>
      </span>
      <ul>
      {
        count > 0 ?
          products.map( product => {
            return( <li key={ product.id} > { product.name } </li> )
          })
          : null
      }
      </ul>
    </div>
  )
};

const mapStateToProps = ({ categories, products }, { id }) => {
  const category = categories.find( category => category.id === id*1);
  return {
    category: category,
    products: products.filter( products => products.categoryId === category.id*1)
  };
};

const mapDispatchToProps = ( dispatch ) => {
  return {
    createProduct: (product) => dispatch(createProduct(product)),
    deleteCategory: (category) => dispatch(deleteCategory(category))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Category);
