const conn = require('./conn');
const { Sequelize } = conn;

const Product = conn.define('product',{
  name: Sequelize.STRING
})

module.exports = Product;
