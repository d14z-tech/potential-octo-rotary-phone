const http = require("http");

const HOST = "localhost";
const PORT = 3000;

const writeHTMLResponse = (res, code, html) => {
  res.setHeader("Content-Type", "text/html");
  res.writeHead(code);
  res.end(html);
  console.log(`response status: ${code}`)
  console.log("response content:");
  console.log(html);
}

const writeJSONResponse = (res, code, json) => {
  let content = JSON.stringify(json)
  res.setHeader("Content-Type", "application/json");
  res.writeHead(code);
  res.end(content);
  console.log(`response status: ${code}`)
  console.log("response content:");
  console.log(content);
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

const server = http.createServer(async (req, res) => {
  const url = req.url;
  const verb = req.method;
  let body = "";

  console.log(`request from: ${verb} ${url}`);

  await req.on("data", (chunck) => {
    body += chunck;
  });

  console.log("request content:");
  console.log(body);

  if(url == '/') {
    writeHTMLResponse(res, 200, "<h1>Welcome to my server!</h1>");
  } else if(url == '/hello-world') {
    writeHTMLResponse(res, 200, "<h1>Hello server world!</h1>");
  } else if(url == '/api/v1/products' && verb == 'GET') {
    writeJSONResponse(res, 200, products);
  } else if(url == '/api/v1/products' && verb == 'POST') {
    let product = JSON.parse(body);
    products.push(product);
    writeJSONResponse(res, 200, products);
  } else {
    writeHTMLResponse(res, 404, "<h1>I am so sorry, page not found xD</h1>");
  }

})

server.listen(PORT, HOST, () => {
  console.log(`Server running on http://${HOST}:${PORT}`);
})
