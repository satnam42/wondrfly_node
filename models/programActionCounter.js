"use strict";
const mongoose = require("mongoose");
const programActionCounter = mongoose.Schema({
    view: { type: Number, default: 0, required: true },
    click: { type: Number, default: 0, required: true },
    favourite: { type: Number, default: 0, required: true },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    program: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'program',
        required: true
    },
    createdOn: { type: Date, default: Date.now },
    updatedOn: { type: Date, default: Date.now },
});

mongoose.model("programActionCounter", programActionCounter);
module.exports = programActionCounter;
