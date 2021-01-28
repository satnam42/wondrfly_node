
"use strict";
const mongoose = require("mongoose");
const provider = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    categories: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'category',
            // required: true
        },
    ],
    skills: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'tag',
        },
    ],
    about: { type: String, default: "" },
    description: { type: String, default: "" },
    facebook: { type: String, default: "" },
    fullAddress: { type: String, default: "" },
    hours: { type: String, default: "" },
    imageURL: { type: String, default: "" },
    linkedin: { type: String, default: "" },
    listingURL: { type: String, default: "" },
    banners: [{ type: String, default: "" }],
    rating: { type: String, default: "" },
    reviews: { type: String, default: "" },
    twitter: { type: String, default: "" },
    website: { type: String, default: "" },
    youtube: { type: String, default: "" },
    instagram: { type: String, default: "" },
    awards: { type: String, default: "" },
    taxNumber: { type: String, default: "" },
    merchantVerified: { type: Boolean, default: false },
    isAssociate: { type: String, default: "" },
    govtIdUrl: { type: String, default: "" },
    govtIdNote: { type: String, default: "" },
    // tier: { type: String, default: "" },
    createdBy: { type: String, default: "" },
    adminNotes: { type: String, default: "" },
    logo: { type: String, default: "" },
    createdOn: { type: Date, default: Date.now },
    updatedOn: { type: Date, default: Date.now }

});

mongoose.model("provider", provider);
module.exports = provider;
