const mongoose = require("mongoose");
const validator = require("validator");

const Service = mongoose.model("Service", {
  name: {
    type: String,
    required: true,
    trim: true,
    maxLength: 160,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
    trim: true,
    min: 0,
  },
});

module.exports = Service;
