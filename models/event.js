"use strict";
const mongoose = require("mongoose");
const event = mongoose.Schema({
    title: { type: String, default: "", required: true },
    description: { type: String, default: "", },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    date: {
        from: { type: Date, required: true },
        to: { type: Date, required: true },
    },
    createdOn: { type: Date, default: Date.now },
    updatedOn: { type: Date, default: Date.now }
});

mongoose.model("event", event);
module.exports = event;