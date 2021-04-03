"use strict";
const mongoose = require("mongoose");
const searchHistory = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    searchData: { type: String, default: "" },
    createdOn: { type: Date, default: Date.now },
    updatedOn: { type: Date, default: Date.now }
});

mongoose.model("searchHistory", searchHistory);
module.exports = searchHistory;