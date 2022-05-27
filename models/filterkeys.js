"use strict";
const mongoose = require("mongoose");
const filterkeys = mongoose.Schema({
    keywordName: { type: String, default: "" },
    keywordType: { type: String, default: "" },
    keywordValue: [
        {
            ageGroup: {
                from: { type: Number, default: 0 },
                to: { type: Number, default: 0 },
            },
            category: { type: String, default: '' },
            subcategory: { type: String, default: '' },
        },
    ],
    createdOn: { type: Date, default: Date.now },
    updatedOn: { type: Date, default: Date.now }
});

mongoose.model("filterkeys", filterkeys);
module.exports = filterkeys;