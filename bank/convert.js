const request = require("postman-request");

const convert = (a, b, callback) => {
  let start = new Date();
  start.setDate(start.getDate() - 30);
  start = start.toISOString().slice(0, 10);

  let end = new Date().toISOString().slice(0, 10);

  const url =
    "https://api.frankfurter.app/" +
    start +
    ".." +
    end +
    "?from=" +
    a +
    "&to=" +
    b +
    "";

  request({ url: url }, (error, response) => {
    const data = JSON.parse(response.body);
    const rates = [];
    let i = 0;

    for (const [date, rate] of Object.entries(data.rates).reverse()) {
      i++;
      if (i > 10) break;
      rates.push({
        date: date,
        rate: rate[b],
      });
    }
    console.log(rates);
    callback(rates);
  });
};

const currencies = (callback) => {
  const url = "https://api.frankfurter.app/currencies";

  request({ url: url }, (error, response) => {
    const currencies = JSON.parse(response.body);
    const ca = [];

    for (const [code, name] of Object.entries(currencies)) {
      ca.push({
        code: code,
        name: name
      });
    }
    
    callback(ca);
  });
};

module.exports = { convert, currencies};
