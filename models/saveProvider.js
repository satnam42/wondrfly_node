"use strict";
const mongoose = require("mongoose");
const saveProvider = mongoose.Schema({
    parent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    provider: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    createdOn: { type: Date, default: Date.now },
    updatedOn: { type: Date, default: Date.now }
});

mongoose.model("saveProvider", saveProvider);
module.exports = saveProvider;