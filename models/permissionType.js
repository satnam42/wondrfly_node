"use strict";
const mongoose = require("mongoose");
const permissionType = mongoose.Schema({
    type: { type: String, default: "", required: true },
    code: { type: String, default: "" },
    createdOn: { type: Date, default: Date.now },
    updatedOn: { type: Date, default: Date.now }
});

mongoose.model("permissionType", permissionType);
module.exports = permissionType;