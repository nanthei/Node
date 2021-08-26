const http = require("http");
const dbdhtml = require("./dbdhtml");

const server = http.createServer((req, res) => {
  const url = req.url;
  const method = req.method;

  if (url === "/counted" && method == "POST") {
    const body = [];
    req.on("data", (chunk) => {
      body.push(chunk);
    });
    req.on("end", () => {
      const a = Buffer.concat(body).toString();
      const b = a.split("&");
      const x = parseInt(b[0].split("=")[1]);
      const y = parseInt(b[1].split("=")[1]);
      res.setHeader("Content-Type", "text/html");
      res.write(dbdhtml.result(x, y));
      res.end();
    });
  } 
  else {
    res.setHeader("Content-Type", "text/html");
    res.write(dbdhtml.index());
    res.end();
  }
});

server.listen(3000, "localhost");
