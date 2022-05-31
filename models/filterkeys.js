"use strict";
const mongoose = require("mongoose");
const filterkeys = mongoose.Schema({
    keywordName: { type: String, default: "" },
    keywordType: { type: String, default: "" },
    keywordValue: [],
    createdOn: { type: Date, default: Date.now },
    updatedOn: { type: Date, default: Date.now }
});

mongoose.model("filterkeys", filterkeys);
module.exports = filterkeys;