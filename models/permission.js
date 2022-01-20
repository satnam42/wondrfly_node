"use strict";
const mongoose = require("mongoose");
const permission = mongoose.Schema({
    module: {
        type: String,
        required: true,
        enum: ['program', 'provider', 'betaUser'],
    },
    permission: { type: String, default: "", required: true },
    createdOn: { type: Date, default: Date.now },
    updatedOn: { type: Date, default: Date.now }
});

mongoose.model("permission", permission);

module.exports = permission;