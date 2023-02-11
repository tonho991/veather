var weather = require('weather-js');
const express = require('express');
const fs = require('fs');
const {
  getCityAndStateNameById
} = require("./lib/StateUtils");

const app = express();

app.get("/json/cidades", (req, res) => {
  res.status(200).send(
    fs.readFileSync("/src/cidades.json", "UTF-8")
  );
});

app.get("/json/cidades", (req, res) => {
  res.status(200).send(
    fs.readFileSync("/src/estados.json", "UTF-8")
  );
});

app.get("/api/prev", (req, res) => {
  const id = req.query.id;
  //if (id || !isNaN(id)) return res.sendStatus(403);
  const text = getCityAndStateNameById(id);
  const sl = JSON.parse(fs.readFileSync(__dirname+"/src/skytext.json"));
  const sdl = JSON.parse(fs.readFileSync(__dirname+"/src/skytextday.json"));
  const dl = JSON.parse(fs.readFileSync(__dirname + "/src/day.json"));
  
  weather.find({search: text, degreeType: 'C'}, function(err, result) {
    if (err) console.log(err);
    result = result[0];
    
    result.current.skytext = sl[result.current.skytext];
    result.current.day = dl[result.current.day];
    
    for(let i = 0; i < result.forecast.length; i++){
       result.forecast[i].skytextday = sdl[result.forecast[i].skytextday];
       result.forecast[i].day = dl[result.forecast[i].day];
    }
    res.status(200).send(result);
  });

});

app.listen(3000);