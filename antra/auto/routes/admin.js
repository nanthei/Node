const express = require("express");
const rezervacija = require("./../modules/rezervacija");

const router = express.Router();

router.get("/admin", (req, res, next) => {
  const ats = rezervacija.getRezervacija();
  res.render("admin", {
    title: "Rezervacija",
    ats: ats,
  });
});

module.exports = router;
