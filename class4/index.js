const express = require('express');
const PORT = 3000;
const app = express();

app.use(express.json());

const findProduct = (products, productId) => {
  return products.find(obj => {
    return obj.id === Number(productId);
  });
}

const products = [
  {
    id: 1,
    name: 'watch',
    price: 100,
    quantity: 2
  },
  {
    id: 2,
    name: 'something',
    price: 200,
    quantity: 3
  }
]

app.get("/", (req, res) => {
  res.send("Hello express!");
});

app.get("/api/v1/products", (req, res) => {
  res.json(products);
});

app.post("/api/v1/products", (req, res) => {
  let new_product = req.body
  products.push(new_product)
  res.status(201).json(new_product);
});

app.get("/api/v1/products/:id", (req, res) => {
  let product = findProduct(products, req.params.id)

  if(product) {
    res.json(product);
  } else {
    res.status(404).json({ message: 'product not found' });
  }
});

app.put("/api/v1/products/:id", (req, res) => {
  let product = findProduct(products, req.params.id)

  if(product) {
    Object.assign(product, req.body);

    res.json(product);
  } else {
      res.json({ message: 'product not found' });
  }
  
});

app.delete("/api/v1/products/:id", (req, res) => {
  let product = products.find((object, index, array) => {
    if (object.id === Number(req.params.id)) {
      array.splice(index, 1);
      return true;
    }

    return false;
  });

  if(product) {
    res.status(204).send();
  } else {
    res.status(404).json({ message: 'product not found'});
  }
})

app.listen(PORT, () => {
  console.log(`Express server started - Listening on port ${PORT}`);
});