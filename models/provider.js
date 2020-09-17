
"use strict";
const mongoose = require("mongoose");
const provider = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    // category: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Category'
    // },
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
    // workingFrom: { type: String, default: "" },
    isAssociate: { type: String, default: "" },
    // tier: { type: String, default: "" },
    createdBy: { type: String, default: "" },
    notes: { type: String, default: "" },
    adminNotes: { type: String, default: "" },
    notes: { type: String, default: "" },

    proivide_logo: { type: String, default: "" },
    createdOn: { type: Date, default: Date.now },
    updatedOn: { type: Date, default: Date.now }

});

mongoose.model("provider", provider);
module.exports = provider;
