const express = require("express");
const router = express.Router();

router.get("/rezultatai", (req, res, next) => {
  res.redirect("/");
});

module.exports = router;
