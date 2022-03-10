"use strict";
const mongoose = require("mongoose");
const parentSearch = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category'
    },
    subCategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'tag'
    },
    program: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'program'
    },
    provider: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    createdOn: { type: Date, default: Date.now },
    updatedOn: { type: Date, default: Date.now }
});

mongoose.model("parentSearch", parentSearch);
module.exports = parentSearch;