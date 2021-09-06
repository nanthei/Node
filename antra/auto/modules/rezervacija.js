const fs = require("fs");

const getRezervacija = () => {
  const data = fs.readFileSync("./data/rezervacija.json").toString();
  const rezervacija = JSON.parse(data);
  return rezervacija;
};

const addRezervacija = (marke, model, year, text, optional) => {
  const rezervacija = getRezervacija();
  rezervacija.push({marke: marke, model: model, year: year, text: text, optional: optional});
  fs.writeFileSync('./data/rezervacija.json',JSON.stringify(rezervacija));
};

module.exports = { getRezervacija, addRezervacija };
