"use strict";
const mongoose = require("mongoose");
const favourite = mongoose.Schema({
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
    updatedOn: { type: Date, default: Date.now }
});

mongoose.model("favourite", favourite);
module.exports = favourite;