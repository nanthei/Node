const request = require("postman-request"); //Kintamajame request bus užkrautas modulis postman-request

//Reikalaujame dviejų kintamųjų - vietos ir funkcijos
const forecast = (place, callback) => {
  //URL į kurį kreipsimės
  const url =
    "https://api.meteo.lt/v1/places/" + place + "/forecasts/long-term";

  //Iškviečiama funkcija request, kuriai paduodamas uri, callback funkcija kuri bus iškviečiama
  // tuomet kai gausime atsakymą arba įvyks klaida
  // Funkcija iškviečiama Asinchroniniu būdu

  //Ši funkcija palies asinchroninį kodą ir vykdoma kai baigs pagrindinė f-ja (sistema) darbą

  //Request callback funkciją iškviečia asinchroniniu būdu
  request({ url: url }, (error, response) => {
    const data = response.body; //Gautą atsakymą (JSON) išsaugome į kintamąjį (String)
    const weather = JSON.parse(data); //Iš string'o (JSON) pagaminame objektą

    const fc = [];

    weather.forecastTimestamps.forEach((d) => {
      fc.push({
        date: d.forecastTimeUtc,
        temperature: d.airTemperature,
      });
    });
    callback(fc, weather.place.name);
  });
};

//Funkciją kuri iš API per callback funkciją gražins vietovių sąrašą
const places = (callback) => {
  //API url'as
  const url = "https://api.meteo.lt/v1/places";
  //Kreipiamies į API URL ir paduodame callback funkciją kuri vykdoma gavus atsakymą
  request({ url: url }, (error, response) => {
    //Į data kintamajį pasitalpiname atsakymo JSON stringą
    const data = response.body;
    //JSON stringą pakeičiame į objektą
    const places = JSON.parse(data);
    //Mastvas kurį gražinsime per callback funkciją į app.js
    const pl = [];
    //Su ciklu pereiname per visas gautas vietoves ir jas susidedame į pl masyvą
    places.forEach((d) => {
      pl.push({
        code: d.code,
        name: d.name,
      });
    });
    callback(pl);
  });
};

module.exports = { forecast, places };
