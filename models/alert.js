"use strict";
const mongoose = require("mongoose");
const alert = mongoose.Schema({
    email: { type: String, default: "" },
    msg: { type: String, default: "", required: true },
    fromDate: { type: String, default: "", required: true },
    toDate: { type: String, default: "", required: true },
    msgType: { type: String, default: "" },
    alertFor: { type: String, default: "" },
    createdOn: { type: Date, default: Date.now },
    updatedOn: { type: Date, default: Date.now }
});

mongoose.model("alert", alert);
module.exports = alert;