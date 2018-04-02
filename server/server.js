const express = require('express');
const app = express();
const path = require('path');
const db = require('./db');
const { Category, Product } = db.models;

app.use(require('body-parser').json());
app.use('/dist',express.static(path.join(__dirname,'../dist')));

app.get('/', (req,res,next) => res.sendFile(path.join(__dirname, '../public/index.html')));

app.get('/api/products', (req,res,next) => {
  Product.findAll({ include: Category })
    .then(products =>  {
      // console.log(`find ${products}`)
      res.send(products)
    })
    .catch(next)
});

app.get('/api/categories', (req,res,next) => {
  Category.findAll({ include: [{ model: Product, as: 'products'}] })
    .then(categories => {
      // console.log(`find categories ${categories}`)
      res.send(categories)
    })
    .catch(next)
});

app.post('/api/products', (req,res,next) => {
  Product.create(req.body)
    .then(product => res.send(product))
    .catch(next)
});

app.delete('/api/products/:id', (req,res,next) => {
  Product.findById(req.params.id)
    .then(product => product.destroy())
    .then(() => res.sendStatus(204))
    .catch(next)
});


app.post('/api/categories', (req,res,next) => {
  Category.create(req.body)
    .then(category => res.send(category))
    .catch(next)
});

app.delete('/api/categories/:id', (req,res,next) => {
  Category.findById(req.params.id)
    .then(category => {
      return category.destroy()
    })
    .then(() => res.sendStatus(204))
    .catch(next)
});

const port = process.env.PORT || 3000;
app.listen(port, ()=> console.log(`Listening on port ${port}`));

db.sync()
  .then(() => db.seed())
