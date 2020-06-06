"use strict";
const mongoose = require("mongoose");
const user = mongoose.Schema({
  firstName: { type: String, default: "", required: true },
  lastName: { type: String, default: "", },
  sex: { type: String, default: "" },
  email: { type: String, default: "", required: true },
  password: { type: String, default: "", required: true },
  type: { type: String, default: "" },
  avatarImages: { type: String, default: "" },
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
  isActivated: { type: Boolean, default: true },
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