const http = require("http");
const fs = require("fs");
const plotas = require("./plotas");

const server = http.createServer((req, res) => {
  const url = req.url;
  const method = req.method;

  if (method === "POST" && url === "/result") {
    const body = [];
    req.on("data", (chunk) => {
      body.push(chunk);
    });
    req.on("end", () => {
      let a = Buffer.concat(body).toString();
      let b = a.split("&");
      let plotis = parseFloat(b[0].split("=")[1]);
      let ilgis = parseFloat(b[1].split("=")[1]);
      let p = plotas(plotis, ilgis);
      let data = fs.readFileSync("result.html", "utf-8");
      data = data.replace("{{result}}", p);
      res.setHeader("Content-Type", "text/html");
      res.write(data);
      return res.end();
    });
  }else{
      let data=fs.readFileSync('index.html','utf-8');
      res.setHeader("Content-Type", "text/html");
      res.write(data);
      res.end();
  }
});

server.listen(3000, "localhost");
