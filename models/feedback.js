"use strict";
const mongoose = require("mongoose");
const feedback = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    name: { type: String, default: "", required: true },
    description: { type: String, default: "" },
    url: { type: String, default: "" },
    startDate: { type: Date, default: Date.now },
    endDate: { type: Date, default: Date.now },
    createdOn: { type: Date, default: Date.now },
    updatedOn: { type: Date, default: Date.now }
});

mongoose.model("feedback", feedback);
module.exports = feedback;