"use strict";
const mongoose = require("mongoose");
const searchtopic = mongoose.Schema({
    Name: { type: String, default: "" },
    url: { type: String, default: "" },
    createdOn: { type: Date, default: Date.now },
    updatedOn: { type: Date, default: Date.now }
});

mongoose.model("searchtopic", searchtopic);
module.exports = searchtopic;