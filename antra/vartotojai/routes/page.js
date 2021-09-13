const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.send("text with h1 tagufor main page");
});

module.exports = router;
