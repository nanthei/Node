const keliamieji = (metai) => {
  if (isKeliamieji(metai)) console.log("keliamieji");
  else console.log("nekeliamieji");
};

const isKeliamieji = (metai) => {
  if (metai % 400 == 0 || (metai % 100 != 0 && metai % 4 == 0)) return true;
  else return false;
};

module.exports = { keliamieji };
