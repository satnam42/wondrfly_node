"use strict";
const mongoose = require("mongoose");
const user = mongoose.Schema({
  firstName: { type: String, default: "", required: true },
  lastName: { type: String, default: "", required: true },
  sex: { type: String, default: "" },
  email: { type: String, default: "", required: true },
  password: { type: String, default: "", required: true },
  phoneNumber: { type: String, default: "" },
  addressLine1: { type: String, default: "" },
  addressLine2: { type: String, default: "" },
  city: { type: String, default: "" },
  country: { type: String, default: "" },
<<<<<<< HEAD
  zipCode: { type: String, default: "" },
  lat: { type: String, default: "" },
  long: { type: String, default: "" },
  stripeToken: { type: String, default: "" },
  stripeKey: { type: String, default: "" },
  lastLoggedIn: { type: Date, default: "" },
  loginLimit: { type: Number, default: 0 },
  ssn: { type: String, default: "" },
  isDeleted: { type: String, default: "" },
  lastModified: { type: String, default: "" },
  createdBy: { type: String, default: "" },
=======
  anniversary: { type: String, default: "" },
  customerGroup: { type: String, default: "" },
>>>>>>> 5946a1286946c55388262af0385d54fabbc5928a
  status: {
    type: String, default: "active",
    enum: ["active", "inActive"]
  },
  role: {
    type: String, default: "parent",
    enum: ["parent", "provider", "chlid", "admin"]
  },
  deviceToken: { type: String, default: "" },
  createdOn: { type: Date, default: Date.now },
  updatedOn: { type: Date, default: Date.now }
});

mongoose.model("user", user);
module.exports = user;