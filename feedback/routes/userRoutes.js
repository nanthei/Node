const express = require("express");
const router = express.Router();
const User = require("../model/user");

router.get("/user", (req, res) => {
  User.find({})
    .then((users) => {
      res.send(users);
    })
    .catch((e) => {
      res.status(500).send(e);
    });
});

router.post("/user/login", async (req, res) => {
  try {
    const user = await User.findByEmail(req.body.email, req.body.password);
    const token = await user.generateAuthToken();
    res.send({user,token});
  } catch (e) {
res.status(400).send(e);
  }
});

router.post("/user", (req, res) => {
  const user = new User(req.body);
  user
    .save()
    .then(async () => {
      user.generateAuthToken();
      res.status(201).send(user);
    })
    .catch((e) => {
      res.status(500).send(e);
    });
});

module.exports = router;
