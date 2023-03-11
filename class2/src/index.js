const isOdd = require('is-odd');
const fs = require('fs');
const path = require('path');
const fetchApi = require('./utils/api');

const readFile = ()=> {
  try {
    const filePath = path.resolve(`${__dirname}/archivo.txt`);
    const data = fs.readFileSync(filePath, 'binary');
    console.log(`reading file: ${filePath.split('/').pop()}`);
    console.log(`file content:\n${data}`);
  } catch(error) {
    console.log(error);
  }
}

const writeFile = (content, append = false)=> {
  try {
    const filePath = path.resolve(`${__dirname}/archivo.txt`);
    console.log(`writing in file: ${filePath.split('/').pop()}`);

    let formatted_content = `  ${content}\n`;

    if(append) {
      fs.appendFileSync(filePath, formatted_content);
    } else {
      fs.writeFileSync(filePath, formatted_content);
    }
  } catch(error) {
    console.log(error);
  }
}


writeFile('hola mundo');
readFile();
writeFile(`the number 3 is odd: ${isOdd(3)}`, true)
readFile();
fetchApi('https://rickandmortyapi.com/api/character');