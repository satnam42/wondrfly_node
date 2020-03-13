"use strict";
const mongoose = require("mongoose");
const address = mongoose.Schema({
    name: { type: String, default: "", required: true },
    address: { type: String, default: "", required: true },
    city: { type: String, default: "", required: true },
    state: { type: String, default: "", required: true },
    zipCode: { type: String, default: "" },
    specialInstruction: { type: String, default: "" },
    contactName: { type: String, default: "" },
    contactNumber: { type: String, default: "" },

    status: {
        type: String, default: "active",
        enum: ["active", "dective"]
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    createdOn: { type: Date, default: Date.now },
    updatedOn: { type: Date, default: Date.now }
});

mongoose.model("address", address);
module.exports = address;
