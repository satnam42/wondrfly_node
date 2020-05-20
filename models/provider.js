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
    createdOn: { type: Date, default: Date.now },
    updatedOn: { type: Date, default: Date.now }

});

mongoose.model("provider", provider);
module.exports = provider;
