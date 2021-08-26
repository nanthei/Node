const http = require("http");
const shtml = require("./html");

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
      const x = parseFloat(b[0].split("=")[1]);
      const y = parseFloat(b[1].split("=")[1]);
      const z = parseFloat(b[2].split("=")[1]);
      res.setHeader("Content-Type", "text/html");
      res.write(shtml.result(x, y,z));
      res.end();
    });
  } 
  else {
    res.setHeader("Content-Type", "text/html");
    res.write(shtml.index());
    res.end();
  }
});

server.listen(3000, "localhost");
