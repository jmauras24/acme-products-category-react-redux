import React, { Component } from 'react';
import { connect } from 'react-redux';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';

import { getProducts, getCategories } from '../store';
import Nav from './Nav';
import Products from './Products';
import Category from './Category';

class App extends Component {

  componentDidMount(){
    this.props.getProducts();
    this.props.getCategories();
  }

  render(){
    return(
      <div>
        <Router>
          <div>
            <Switch>
              <Route path='/' exact component={ Nav } />
              <Route path='/products' exact component={ Products } />
              <Route path='/categories/:id' render={ ({ match }) => <Category id={ match.params.id } />  } />
            </Switch>
          </div>
        </Router>
      </div>
    )
  }
};

const mapDispatchToProps = ( dispatch ) => {
  return {
    getProducts: () => dispatch(getProducts()),
    getCategories: () => dispatch(getCategories())
  }
};

export default connect(null, mapDispatchToProps)(App);
