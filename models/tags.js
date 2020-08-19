"use strict";
const mongoose = require("mongoose");
const tag = mongoose.Schema({
    name: { type: String, default: "", required: true },
    description: { type: String, default: "" },
    // categoryIds: [{ id: { type: String, default: "" } }],
    categoryIds: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category'
    }],
    createdOn: { type: Date, default: Date.now },
    updatedOn: { type: Date, default: Date.now }
});

mongoose.model("tag", tag);
module.exports = tag;
