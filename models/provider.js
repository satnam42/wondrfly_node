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
    healthAndSafety: [{
        socialDistancing: { type: Boolean, default: false },
        cleaningProtocol: { type: Boolean, default: false },
        temperatureScreening: { type: Boolean, default: false },
        virtualTraining: { type: Boolean, default: false },
        airFiltration: { type: Boolean, default: false },
        classReservation: { type: Boolean, default: false },
        _id: false
    }],

    // tier: { type: String, default: "" },
    createdBy: { type: String, default: "" },
    adminNotes: { type: String, default: "" },
    logo: { type: String, default: "" },
    createdOn: { type: Date, default: Date.now },
    updatedOn: { type: Date, default: Date.now }

});

mongoose.model("provider", provider);
module.exports = provider;