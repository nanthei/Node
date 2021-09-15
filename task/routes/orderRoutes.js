const express = require("express");
const router = express.Router();
const Order = require("../model/order");

router.get("/order", (req, res, next) => {
  Order.find({})
    .then((orders) => {
      res.send(orders);
    })
    .catch((e) => {
      res.status(500).send(e);
    });
});

router.get("/order/:id", (req, res, next) => {
  //Paimame id iš URL
  //Jei url butų localhost:3000/feedback/2d3d12231d4   , tuomet id = 2d3d12231d4
  const id = req.params.id;
  Order.findById(id)
    .then((order) => {
      if (!order) {
        return res.status(404).send();
      }
      res.send(order);
    })
    .catch((e) => {
      res.status(500).send(e);
    });
});

router.post("/order", (req, res, next) => {
  const order = new Order(req.body);
  order
    .save()
    .then(() => {
      res.status(201).send(order);
    })
    .catch((e) => {
      res.status(400).send(e);
    });
});

router.get("/order/service/:id", (req, res, next) => {
  const id = req.params.id;
  Order.find({ service_id: id })
    .then((orders) => {
      res.send(orders);
    })
    .catch((e) => {
      res.status(500).send(e);
    });
});

router.patch("/order/:id", async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    const updates = Object.keys(req.body);

    const allowed = ["service_id", "name", "surname", "email", "phone"];

    if (!updates.every((update) => allowed.includes(update))) {
      return res.status(400).send({ error: "neteisingi atnaujinimo laukai" });
    }

    updates.forEach((update) => {
      order[update] = req.body[update];
    });
    await order.save();
  } catch (error) {
    res.status(400).send(error);
  }
});

router.delete("/order/:id", async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) {
      return res.status(404).send({ error: "irasas nerastas" });
    }
    return res.send(order);
  } catch {
    res.status(500).send(error);
  }
});

module.exports = router;
