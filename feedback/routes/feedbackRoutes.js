const express = require("express");
const router = express.Router();
const Feedback = require("./../model/feedback");

router.get("/feedback", (req, res, next) => {
  Feedback.find({})
    .then((feedbacks) => {
      res.send(feedbacks);
    })
    .catch((e) => {
      res.status(500).send(e);
    });
});

router.get("/feedback/:id", (req, res, next) => {
  //Paimame id iš URL
  //Jei url butų localhost:3000/feedback/2d3d12231d4   , tuomet id = 2d3d12231d4
  const id = req.params.id;
  Feedback.findById(id)
    .then((feedback) => {
      if (!feedback) {
        return res.status(404).send();
      }
      res.send(feedback);
    })
    .catch((e) => {
      res.status(500).send(e);
    });
});

router.post("/feedback", (req, res, next) => {
  const feedback = new Feedback(req.body);
  feedback
    .save()
    .then(() => {
      res.status(201).send(feedback);
    })
    .catch((e) => {
      res.status(400).send(e);
    });
});

router.patch("/feedback/:id", async (req, res) => {
  try {
    const feedback = await Feedback.findById(req.params.id);

    const updates = Object.keys(req.body);

    const allowed = ["name", "email", "text"];

    if (!updates.every((update) => allowed.includes(update))) {
      return res.status(400).send({ error: "neteisingi atnaujinimo laukai" });
    }

    updates.forEach((update) => {
      feedback[update] = req.body[update];
    });
    await feedback.save();
    //   feedback.anme=req.body.name;
    //   await feedback.save();
    //   res.send(feedback);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.delete("/feedback/:id", async (req, res) => {
  try {
    const feedback = await Feedback.findByIdAndDelete(req.params.id);
    if (!feedback) {
      return res.status(404).send({ error: "irasas nerastas" });
    }
    return res.send(feedback);
  } catch {
    res.status(500).send(error);
  }
});

module.exports = router;
