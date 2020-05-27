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
  zipCode: { type: String, default: "" },
  lat: { type: String, default: "" },
  long: { type: String, default: "" },
  stripeToken: { type: String, default: "" },
  stripeKey: { type: String, default: "" },
  lastLoggedIn: { type: Date, default: "" },
  loginLimit: { type: Number, default: 0 },
  ssn: { type: String, default: "" },
  isActivated: { type: Boolean, default: false },
  isDeleted: { type: Boolean, default: false },
  lastModifiedBy: { type: String, default: "" },
  deletedBy: { type: String, default: "" },
  createdBy: { type: String, default: "" },
  role: { type: String, default: "" },
  deviceToken: { type: String, default: "" },
  createdOn: { type: Date, default: Date.now },
  updatedOn: { type: Date, default: Date.now }
});

mongoose.model("user", user);
module.exports = user;