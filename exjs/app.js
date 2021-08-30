const express = require("express");
const fs = require("fs");
fs.writeFileSync("text.txt", "Original file info\n");

const app = express();

app.use((req, res, next) => {
  const date = new Date().toISOString();
  const ip = req.socket.localAddress;
  const url = req.url;

  if (url == "/favicon.ico"){}
  else fs.appendFileSync("text.txt", date + "\t" + ip + "\t" + url + "\n");
  next();
});

app.use("/rezultatai", (req, res, next) => {
  res.send("Rezultatu puslapis");
});

app.use("/", (req, res, next) => {
  res.send("Pagrindinis puslapis");
});

app.listen(3000);
