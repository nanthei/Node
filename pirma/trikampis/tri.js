const chalk = require("chalk");

const sudarytiTrikampi = (a, b, c) => {
  if (isTri(a, b, c)) {
    if (a == b && a == c) console.log(chalk.yellow("trikampis lygiakrastis"));
    else if (a == b || a == c || b == c)
      console.log(chalk.blue("trikampis lygiasonis"));
    else console.log(chalk.green("trikampis"));
  } else console.log(chalk.red("netrikampis"));
};

const isTri = (a, b, c) => {
  if (a + b > c && a + c > b && b + c > a) return true;
  else return false;
};

module.exports = { sudarytiTrikampi };
