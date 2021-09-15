"use strict";
const mongoose = require("mongoose");
const invitation = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: false
    },
    invitedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: false
    },
    isInvited: { type: String, default: "" },
    status: {
        accepted: { type: Boolean, default: false },
        panding: { type: Boolean, default: true },
        expired: { type: Boolean, default: false },
        declined: { type: Boolean, default: false },
    },
    invitedToEmail: { type: String, default: "" },
    // acceptance: { type: Boolean, default: false },
    // declined: { type: Boolean, default: false },
    createdOn: { type: Date, default: Date.now },
    updatedOn: { type: Date, default: Date.now }
});

mongoose.model("invitation", invitation);
module.exports = invitation;