"use strict";
const mongoose = require("mongoose");
const suggestion = mongoose.Schema({
    name: [{ type: String, default: "", required: true }],
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'category', required: true, },
    subcategoires: [{ type: mongoose.Schema.Types.ObjectId, ref: 'tag' }],
    createdOn: { type: Date, default: Date.now },
    updatedOn: { type: Date, default: Date.now }
});

mongoose.model("suggestion", suggestion);
module.exports = suggestion;