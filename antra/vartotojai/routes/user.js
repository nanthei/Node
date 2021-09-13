const express = require("express");
// const path = require("path");
const router = express.Router();

router.get("/add", (req, res, next) => {
  res.redirect("/user");
});

router.get("/", (req, res, next) => {
  res.render("user");
  // res.sendFile(path.join(__dirname,'..','views','user.html'));
});

router.post("/add", (req, res, next) => {
  res.render("result", { vardas: req.body.vardas });
  // res.send("ADDED: " + req.body.vardas);
});

module.exports = router;