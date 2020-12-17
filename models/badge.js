"use strict";
const mongoose = require("mongoose");
const badge = mongoose.Schema({
    name: { type: String, default: "" },
    icon: { type: String, default: "" },
    description: { type: String, default: "" },
    createdOn: { type: Date, default: Date.now },
    updatedOn: { type: Date, default: Date.now }
});

mongoose.model("badge", badge);
module.exports = badge;