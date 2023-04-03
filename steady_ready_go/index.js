const express = require('express');
const ProductController = require('./controllers/products_controller');

const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('<h1>Steady, Ready, Go!</h1><p><b>Status:</b> online.</p>');
})

app.use('/api/v1/products', ProductController);

app.listen(port, '0.0.0.0', () => {
  console.log(`Steady, Ready, Go! listening on port ${port}.`);
});