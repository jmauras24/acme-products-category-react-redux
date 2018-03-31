const conn = require('./conn');
const Category = require('./Category');
const Product = require('./Product');

const sync = () => {
  return conn.sync({ force: true})
}

const seed = () => {
  return Promise.all([
    Category.create({name: 'cat-1'}),
    Product.create({name:'product-1'})
      .then(product => product.setCategory(1))
  ])
}

Product.belongsTo(Category,{ onDelete: 'cascade'});
Category.hasMany(Product, {as: 'products', foreignKey: 'categoryId'}); //setProducts & getProducts avail

module.exports = {
  sync,
  seed,
  models:{
    Category,
    Product
  }
}
