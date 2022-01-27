"use strict";
const mongoose = require("mongoose");
const category = mongoose.Schema({
    name: { type: String, default: "", required: true },
    description: { type: String, default: "" },
    imageUrl: { type: String, default: "", },
    iconUrl: { type: String, default: "", },
    logoUrl: { type: String, default: "", },
    pattern: { type: String, default: "", },
    alternativeText: { type: String, default: "" },
    isActivated: { type: Boolean, default: true },
    totalPrograms: { type: Number, default: 0 },
    createdOn: { type: Date, default: Date.now },
    updatedOn: { type: Date, default: Date.now }
});

mongoose.model("category", category);
module.exports = category;
