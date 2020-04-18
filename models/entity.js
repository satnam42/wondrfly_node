"use strict";
const mongoose = require("mongoose");
const entity = mongoose.Schema({
    name: { type: String, default: "", required: true },
    code: { type: String, default: "", },
    createdOn: { type: Date, default: Date.now },
    updatedOn: { type: Date, default: Date.now }
});

mongoose.model("entity", entity);
module.exports = entity;