const conn = require('./conn');
const { Sequelize } = conn;

const Category = conn.define('category',{
  name: Sequelize.STRING
})

module.exports = Category;
