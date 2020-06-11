"use strict";
const mongoose = require("mongoose");
const provider = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    category: { type: String, default: "" },
    description: { type: String, default: "" },
    facebook: { type: String, default: "" },
    fullAddress: { type: String, default: "" },
    hours: { type: String, default: "" },
    imageURL: { type: String, default: "" },
    merchantVerified: { type: String },
    linkedin: { type: String, default: "" },
    listingURL: { type: String, default: "" },
    rating: { type: String, default: "" },
    reviews: { type: String, default: "" },
    twitter: { type: String, default: "" },
    website: { type: String, default: "" },
    youtube: { type: String, default: "" },
    awards: { type: String, default: "" },
    taxNumber: { type: String, default: "" },
    workingFrom: { type: String, default: "" },
    isAssociate: { type: String, default: "" },
    tier: { type: String, default: "" },
    createdBy: { type: String, default: "" },
    notes: { type: String, default: "" },
    adminNotes: { type: String, default: "" },
    notes: { type: String, default: "" },
    isActivated: { type: String, default: "" },
    proivide_logo: { type: String, default: "" },
    createdOn: { type: Date, default: Date.now },
    updatedOn: { type: Date, default: Date.now }

});

mongoose.model("provider", provider);
module.exports = provider;
