"use strict";
const mongoose = require("mongoose");
const feature = mongoose.Schema({
    name: { type: String, default: "", required: true },
    description: { type: String, default: "", required: true },
    status: { type: String, default: "" },
    createdOn: { type: Date, default: Date.now },
    updatedOn: { type: Date, default: Date.now }
});

mongoose.model("feature", feature);
module.exports = feature;