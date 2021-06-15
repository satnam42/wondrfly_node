"use strict";
const mongoose = require("mongoose");
const payment = mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    planId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "plans"
    },
    plan: { type: String, default: "", },
    expirePlan: { type: Date, default: "" },
    currentPlan: { type: String, default: "", required: true },
    amount: { type: Number, default: "", },
    // cardNo: { type: Number, default: "", required: true },
    // customerEmail: { type: String, default: "", },
    // stripeToken: { type: String, default: "", required: true },
    createdOn: { type: Date, default: Date.now },
    updatedOn: { type: Date, default: Date.now }

});

mongoose.model("payment", payment);
module.exports = payment;