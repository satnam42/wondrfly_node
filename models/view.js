"use strict";
const mongoose = require("mongoose");
const view = mongoose.Schema({
    count: { type: Number, default: 0, required: true },
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

mongoose.model("view", view);
module.exports = view;