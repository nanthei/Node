const fs = require("fs");

const getAtsiliepimai = () => {
  const data = fs.readFileSync("./data/atsiliepimai.json").toString();
  const atsiliepimai = JSON.parse(data);
  return atsiliepimai;
};

const addAtsiliepimai = (name, text) => {
  const atsiliepimai = getAtsiliepimai();
  atsiliepimai.push({ name: name, text: text });
  fs.writeFileSync('./data/atsiliepimai.json',JSON.stringify(atsiliepimai));
};

module.exports = { getAtsiliepimai, addAtsiliepimai };
