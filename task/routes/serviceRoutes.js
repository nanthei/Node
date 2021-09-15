const express = require("express");
const router = express.Router();
const Service = require("../model/service");

router.get("/service", (req, res, next) => {
  Service.find({})
    .then((services) => {
      res.send(services);
    })
    .catch((e) => {
      res.status(500).send(e);
    });
});

router.get("/service/:id", (req, res, next) => {
  //Paimame id iš URL
  //Jei url butų localhost:3000/feedback/2d3d12231d4   , tuomet id = 2d3d12231d4
  const id = req.params.id;
  Service.findById(id)
    .then((service) => {
      if (!service) {
        return res.status(404).send();
      }
      res.send(service);
    })
    .catch((e) => {
      res.status(500).send(e);
    });
});

router.post("/service", (req, res, next) => {
  const service = new Service(req.body);
  service
    .save()
    .then(() => {
      res.status(201).send(service);
    })
    .catch((e) => {
      res.status(400).send(e);
    });
});

router.patch("/service/:id", async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);

    const updates = Object.keys(req.body);

    const allowed = ["name", "description", "price"];

    if (!updates.every((update) => allowed.includes(update))) {
      return res.status(400).send({ error: "neteisingi atnaujinimo laukai" });
    }

    updates.forEach((update) => {
      service[update] = req.body[update];
    });
    await service.save();
  } catch (error) {
    res.status(400).send(error);
  }
});

router.delete("/service/:id", async (req, res) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);
    if (!service) {
      return res.status(404).send({ error: "irasas nerastas" });
    }
    return res.send(service);
  } catch {
    res.status(500).send(error);
  }
});

module.exports = router;
