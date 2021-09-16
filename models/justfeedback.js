"use strict";
const mongoose = require("mongoose");
const justfeedback = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    // feedback: { type: String, default: "", required: true },
    name: { type: String, default: "", required: true },
    description: { type: String, default: "" },
    url: { type: String, default: "" },
    startDate: { type: Date, default: Date.now },
    endDate: { type: Date, default: Date.now },
    createdOn: { type: Date, default: Date.now },
    updatedOn: { type: Date, default: Date.now }
});

mongoose.model("justfeedback", justfeedback);
module.exports = justfeedback;