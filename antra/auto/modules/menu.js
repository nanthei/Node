const fs = require("fs");

const getMenu = () => {
  const data = fs.readFileSync("./data/menu.json").toString();
  const menu = JSON.parse(data);
  return menu;
};

module.exports = { getMenu };
