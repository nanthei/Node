const { convert, currencies } = require("./convert");
const http = require("http");
const fs = require("fs");
const path = require("path");

function generateSelect(ca,name) {
  let s = '<select class="form-control select2" name="' + name + '">';
  ca.forEach((d) => {
    s += "<option value='" + d.code + "'>" + d.name + "</option>";
  });
  s += "</select>";
  return s;
}

function generateTable(rates){
  let s='<table class="table">';
  rates.forEach((d)=>{
    s+='<tr><td>' + d.date+ '</td><td>'+ d.rate +'</td></tr>';
  })
}

const server = http.createServer((req, res) => {
  let url = req.url;

  if (url === "/") {
    let stream = fs.readFileSync("./template/index.html", "utf-8");
    stream = stream.replace("{{kursas1}}", generateSelect(ca,'kursas1'));
    stream = stream.replace("{{kursas2}}", generateSelect(ca,'kursas2'));
    res.setHeader("Content-Type", "text/html");
    res.write(stream);
    return res.end();
  }

  let getData = url.split("?");
  if (getData[0] === "/prognoze") {

    let kursas1 = getData[1].split("&")[0].split("=")[1];
    let kursas2 = getData[1].split("&")[1].split("=")[1];

    currencies((ca) => {
      convert(kursas1, kursas2, (rates) => {
        res.setHeader("Content-Type", "text/html");

        let s = '<table class="table">';
        rates.forEach((d) => {
          s += "<tr><td>" + d.date + "</td><td>" + d.rate + "</td></tr>";
        });

        s += "</table>";

        let stream = fs.readFileSync("./template/temp.html", "utf-8");

        stream = stream.replace("{{kursas1}}", generateSelect(ca,'kursas1'));
        stream = stream.replace("{{kursas2}}", generateSelect(ca,'kursas2'));
        stream = stream.replace("{{rates}}", generateTable(rates));
        res.write(stream);
        res.end();
      });
    });
  }
});

server.listen(3000, "localhost");
