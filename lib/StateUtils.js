const fs = require("fs");

function getCityAndStateNameById(cityId) {
  const cities = JSON.parse(fs.readFileSync("./src/cidades.json"));
  const states = JSON.parse(fs.readFileSync("./src/estados.json"));
 
  const city = cities.find(c => c.id === cityId);
  if (!city) {
    city.name = "null";
  }
  
  const state = states.find(s => s.id === city.state_id);
  if (!state) {
    state.name = "null";
  }

  return `${city.name}, ${state.name}`;
}


module.exports = {
  getCityAndStateNameById
}