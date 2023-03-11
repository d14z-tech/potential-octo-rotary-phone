const fetchApi = async (url) => {
  try {
    const res = await fetch(url);
    const data = await res.json();
    console.log(`Rick and Morty first ${Math.ceil(data.info.count/data.info.pages)} characters:\n`)
    data.results.forEach(element => {
      console.log(`  #${element.id} - ${element.name} is ${element.species}\n`);
    });
  } catch (error) {
    console.log(error);
  }
}

module.exports = fetchApi;