import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { createCategory } from '../store';

const Nav = ({ products, categories, createCategory }) => {
  return(
    <nav>
      <button onClick={ () => createCategory(categories) }>Create Category</button>
      <ul>
        <li><Link to='/products'>All Products ({products.length})</Link></li>
        {
          categories.map( category => {
            const count = category.products ? category.products.length : 0;
            return(
              <li key={ category.id }>
                <Link to={ `/categories/${category.id}` }>{ category.name }
                ({ count })</Link>
              </li>
            )
          })
        }
      </ul>
    </nav>
  )
};

const mapStateToProps = ({ products, categories }) => {
  console.log(`products nav`, products, categories)
  return {
    products,
    categories
  };
};

const mapDispatchToProps = ( dispatch ) => {
  return {
    createCategory: (categories) => dispatch(createCategory(categories))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Nav);
