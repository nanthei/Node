const express = require("express");
const path = require('path');
const router = express.Router();

router.get("/add", (req, res, next) => {
    res.redirect('/user')
  });
  
  router.get("/", (req, res, next) => {
    res.sendFile(path.join(__dirname,'..','view','user.html'));
  });

// router.get("/", (req, res, next) => {
//   res.send(
//     '<form action="add_user" method="POST"><input type="text" name="vardas"><button type="submit">SEND</button></form>'
//   );
// });

router.post("/add", (req, res, next) => {
  console.log(req.body);
  res.send("ADDED: " + req.body.vardas);
});

module.exports = router;
