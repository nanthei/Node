const express = require("express");
// const path = require("path");
const { calc } = require("./../calc");
const router = express.Router();

router.post("/rezultatai", (req, res, next) => {
  res.render('rezultatai', {rez: calc(req.body.num1, req.body.num2)});
  // res.send("BMK: " + calc(req.body.num1, req.body.num2));
});

router.get("/", (req, res, next) => {
  res.render('index');
  // res.sendFile(path.join(__dirname,'..','views','index.html'));
});

router.use("/", (req, res, next) => {
  res.render('404');
  // res.sendFile(path.join(__dirname,'..','views','404.html'));
});

module.exports = router;
