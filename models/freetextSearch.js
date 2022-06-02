"use strict";
const mongoose = require("mongoose");
const freetextSearch = mongoose.Schema({
    text: { type: String, default: "" },
    createdOn: { type: Date, default: Date.now },
    updatedOn: { type: Date, default: Date.now }
});

mongoose.model("freetextSearch", freetextSearch);
module.exports = freetextSearch;