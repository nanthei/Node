const { forecast, places } = require("./forecast");
const http = require("http");
const fs = require("fs");
const path = require("path");

function generatePlacesSelect(places) {
  //Generuojame select'ą ir jį patalpinsime į index.html
  let s = '<select class="form-control select2" name="place">';
  places.forEach((d) => {
    s += "<option value='" + d.code + "'>" + d.name + "</option>";
  });
  s += "</select>";
  return s;
}

//Susikuriame serverį
const server = http.createServer((req, res) => {
  let url = req.url;

  if (url === "/") {
    //Pasiimame places ir vykdome asinchroninę funkciją
    places((places) => {
      let stream = fs.readFileSync("./template/index.html", "utf-8");
      stream = stream.replace("{{places}}", generatePlacesSelect(places));
      res.setHeader("Content-type", "text/html");
      res.write(stream);
      return res.end();
    });
  }

  let getData = url.split("?");
  if (getData[0] === "/prognoze") {
    let place = getData[1].split("=")[1];

    places((places) => {
      forecast(place, (temp, place) => {
        res.setHeader("Content-Type", "text/html");

        //s - kintamajame išsaugosime sugeneruotą lentelę
        let s = '<table class="table">';
        //su kiekvienu temp masyvo elementu vykdysime žemiau pateiktą f-ką ir prie kintamojo
        //s pridesime naujas eilutes
        temp.forEach((d) => {
          s +=
            "<tr> <td>" +
            d.date +
            "</td>  <td>" +
            d.temperature +
            "</td> </tr>";
        });
        s += "</table>";

        //Nuskaitome failą
        let stream = fs.readFileSync("./template/temp.html", "utf-8");
        stream = stream.replace("{{places}}", generatePlacesSelect(places));
        stream = stream.replace("{{place}}", place);
        stream = stream.replace("{{temperature}}", s);

        const chartData = [];
        temp.forEach((d) => {
          chartData.push({
            x: d.date.slice(5, 16),
            y: d.temperature,
          });
        });

        stream = stream.replace(
          "TemperaturuDuomenys",
          JSON.stringify(chartData)
        );

        res.write(stream);
        res.end();
      });
    });
  }
});

//Laukiame užklausų
server.listen(3000, "localhost");

/*
forecast('klaipeda', (temp)=>{
    console.log("Temperaturos prognozės: ");
    temp.forEach((d)=>{
        console.log("Diena: "+d.date+"\t Temperatura: "+d.temperature);
    });
});
*/
