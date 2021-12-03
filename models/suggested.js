"use strict";
const mongoose = require("mongoose");
const suggested = mongoose.Schema({
    suggestedId: { type: mongoose.Schema.Types.ObjectId, ref: 'tag', required: true, },
    suggestedTags: [{ type: mongoose.Schema.Types.ObjectId, ref: 'tag' }],
    createdOn: { type: Date, default: Date.now },
    updatedOn: { type: Date, default: Date.now }
});

mongoose.model("suggested", suggested);
module.exports = suggested;