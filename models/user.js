"use strict";
const mongoose = require("mongoose");
const REQUIRED_VALIDATION_MESSAGE = '{PATH} is required'
const user = mongoose.Schema({
  firstName: { type: String, default: "", },
  lastName: { type: String, default: "", },
  sex: { type: String, default: "" },
  email: { type: String, default: "", required: true },
  password: { type: String, default: "", required: true },
  type: { type: String, default: "" },
  avatarImages: { type: String, default: "" },
  phoneNumber: { type: String, default: "" },
  addressLine1: { type: String, default: "" },
  addressLine2: { type: String, default: "" },
  street: { type: String, default: "" },
  state: { type: String, default: "" },
  city: { type: String, default: "" },
  country: { type: String, default: "" },
  source: { type: String, default: "" },
  isClaimed: { type: Boolean, default: false },
  zipCode: { type: String, default: "" },
  lat: { type: String, default: "" },
  lng: { type: String, default: "" },
  stripeToken: { type: String, default: "" },
  stripeKey: { type: String, default: "" },
  lastLoggedIn: { type: Date, default: "" },
  personalNote: { type: String, default: "" },
  loginLimit: { type: Number, default: 0 },
  securityQuestion: { type: String, default: "" },
  answer: { type: String, default: "" },
  inviteBy: { type: String, default: "" },
  ssn: { type: String, default: "" },
  isActivated: { type: Boolean, default: true },
  isDeleted: { type: Boolean, default: false },
  lastModifiedBy: { type: String, default: "" },
  deletedBy: { type: String, default: "" },
  token: { type: String, default: "" },
  createdBy: { type: String, default: "" },
  note: { type: String, default: "" },
  profileCompleteEmail: { type: Boolean, default: false },
  profileCompleteNotification: { type: Boolean, default: false },
  isAmbassador: { type: Boolean, default: false },
  isUserVerified: { type: Boolean, default: false },
  isAmbassadorOn: { type: Date, default: Date.now },
  role: { type: String, default: "" },
  resetPasswordToken: {
    type: String,
    required: false
  },
  resetPasswordExpires: {
    type: Date,
    required: false
  },
  interests: [{ type: mongoose.Schema.Types.ObjectId, default: [], ref: 'category' }],
  isPhoneVerified: { type: Boolean, default: false },
  disableAlert: { type: mongoose.Schema.Types.ObjectId, ref: 'alert' },
  totalPoints: { type: Number, default: 0 },
  rewardpointIds: [{ type: mongoose.Schema.Types.ObjectId, default: [], ref: 'rewardpoint' }],
  deviceToken: { type: String, default: "" },
  createdOn: { type: Date, default: Date.now },
  updatedOn: { type: Date, default: Date.now }
});

mongoose.model("user", user);
module.exports = user;