"use strict";
const mongoose = require("mongoose");
const filterkeys = mongoose.Schema({
    kewordName: { type: String, default: "" },
    kewordType: { type: String, default: "" },
    createdOn: { type: Date, default: Date.now },
    updatedOn: { type: Date, default: Date.now }
});

mongoose.model("filterkeys", filterkeys);
module.exports = filterkeys;