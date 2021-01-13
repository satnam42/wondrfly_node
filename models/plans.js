"use strict";
const mongoose = require("mongoose");
const plans = mongoose.Schema({
    title: { type: String, default: "", required: true },
    description: { type: String, default: "", required: true },
    price: { type: Number, default: "" },
    status: {
        type: String, default: "active",
        enum: ["active", "inactive"]
    },
    features: [{
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "feature"
        },
        _id: false
    }
    ],
    createdOn: { type: Date, default: Date.now },
    updatedOn: { type: Date, default: Date.now }
});

mongoose.model("plans", plans);
module.exports = plans;