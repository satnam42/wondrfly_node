"use strict";
const mongoose = require("mongoose");
const provider = mongoose.Schema({
    name: { type: String, default: "" },
    category: { type: String, default: "" },
    description: { type: String, default: "" },
    email: { type: String, default: "" },
    facebook: { type: String, default: "" },
    fullAddress: { type: String, default: "" },
    hours: { type: String, default: "" },
    imageURL: { type: String, default: "" },
    lat: { type: String, default: "" },
    long: { type: String, default: "" },
    merchantVerified: { type: String },
    linkedin: { type: String, default: "" },
    listingURL: { type: String, default: "" },
    phone: { type: String, default: "" },
    rating: { type: String, default: "" },
    reviews: { type: String, default: "" },
    twitter: { type: String, default: "" },
    website: { type: String, default: "" },
    youtube: { type: String, default: "" },
    awards: { type: String, default: "" },
    tax_number: { type: String, default: "" },
    working_from: { type: String, default: "" },
    is_associate: { type: String, default: "" },
    tier: { type: String, default: "" },
    created_by: { type: String, default: "" },
    notes: { type: String, default: "" },
    admin_notes: { type: String, default: "" },
    notes: { type: String, default: "" },
    is_activated: { type: String, default: "" },
    proivide_logo: { type: String, default: "" },
    createdOn: { type: Date, default: Date.now },
    updatedOn: { type: Date, default: Date.now }

});

mongoose.model("provider", provider);
module.exports = provider;
