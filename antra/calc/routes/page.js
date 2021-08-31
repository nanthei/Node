const express = require("express");
const { calc } = require("./../calc");
const router = express.Router();

router.post("/rezultatai", (req, res, next) => {
  res.send("BMK: " + calc(req.body.num1, req.body.num2));
});

router.get("/", (req, res, next) => {
  res.send(
    '<form action="rezultatai" method="POST"><input type="text" name="num1"><br><input type="text" name="num2"><br><button type="submit">SEND</button></form>'
  );
});

module.exports = router;
