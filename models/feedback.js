"use strict";
const mongoose = require("mongoose");
const feedback = mongoose.Schema({
    feedback: { type: String, default: "", required: true },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    createdOn: { type: Date, default: Date.now },
    updatedOn: { type: Date, default: Date.now }
});

mongoose.model("feedback", feedback);
module.exports = feedback;


