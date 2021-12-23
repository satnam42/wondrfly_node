"use strict";
const mongoose = require("mongoose");
const notification = mongoose.Schema({
    title: { type: String, default: "" },
    count: { type: Number, default: "" },
    description: { type: String, default: "", required: true },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    isRead: { type: Boolean, default: false },
    createdOn: { type: Date, default: Date.now },
    updatedOn: { type: Date, default: Date.now }
});

mongoose.model("notification", notification);
module.exports = notification;