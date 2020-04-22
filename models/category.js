"use strict";
const mongoose = require("mongoose");
const user = mongoose.Schema({
    name: { type: String, default: "", required: true },
    description: { type: String, default: "", required: true },
    createdOn: { type: Date, default: Date.now },
    updatedOn: { type: Date, default: Date.now }
});

mongoose.model("category", category);
module.exports = category;
