const isOdd = require('is-odd');
const fs = require('fs');
const path = require('path');
const fetchApi = require('./utils/api');

const readFile = ()=> {
  try {
    const filePath = path.resolve(`${__dirname}/archivo.txt`);
    const data = fs.readFileSync(filePath, 'binary');
    console.log(`reading file: ${filePath.split('/').pop()}`);
    console.log(`file content: ${data}`);
  } catch(error) {
    console.log(error);
  }
}

const writeFile = (content)=> {
  try {
    const filePath = path.resolve(`${__dirname}/archivo.txt`);
    console.log(`writing in file: ${filePath.split('/').pop()}`);
    fs.writeFileSync(filePath, content)
  } catch(error) {
    console.log(error);
  }
}


writeFile('hola mundo');
readFile();
writeFile(`the number 3 is odd: ${isOdd(3)}`)
readFile();
fetchApi('https://rickandmortyapi.com/api/character');