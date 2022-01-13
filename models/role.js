"use strict";
const mongoose = require("mongoose");
const role = mongoose.Schema({
    roleName: { type: String, default: "" },
    createdOn: { type: Date, default: Date.now },
    updatedOn: { type: Date, default: Date.now }
});

mongoose.model("role", role);
module.exports = role;