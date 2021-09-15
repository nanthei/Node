const mongoose = require("mongoose");
const validator = require("validator");

const Order = mongoose.model("Order", {
  service_id: {
    type: String,
    required: true,
    trim: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
    maxLength: 24,
  },
  surname: {
    type: String,
    required: true,
    trim: true,
    maxLength: 24,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    maxLength: 32,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("El paštas neteisingas");
      }
    },
  },
  phone: {
    type: String,
    trim: true,
    maxLength: 16,
    validate(value) {
      if (!validator.isMobilePhone(value)) {
        throw new Error("Tel nr neteisingas");
      }
    },
  },
});

module.exports = Order;
