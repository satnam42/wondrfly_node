"use strict";
const mongoose = require("mongoose");
const programSchema = mongoose.Schema({
    name: { type: String, default: "", },
    description: { type: String, default: "" },
    type: { type: String, default: "", required: true },
    price: { type: String, default: "" },
    code: { type: String, default: "" },
    location: { type: String, default: "" },
    timelinePics: [{ type: String, default: "" }],
    ageGroup: {
        from: { type: String, default: '' },
        to: { type: String, default: "" }
    },
    date: {
        from: { type: String, default: '' },
        to: { type: String, default: "" }
    },
    time: {
        from: { type: String, default: '' },
        to: { type: String, default: "" }
    },
    bookingCancelledIn: {
        days: { type: String, default: '' },
        hours: { type: String, default: "" }
    },
    duration: { type: String, default: "" },
    isPaid: { type: String, default: "" },
    pricePerParticipant: { type: String, default: "" },
    priceForSiblings: { type: String, default: "" },
    specialInstructions: { type: String, default: "" },
    adultAssistanceIsRequried: { type: Boolean, default: false },
    capacity: { type: String, default: "" },
    emails: [
        { type: String, default: '' }],
    batches: [{
        name: { type: String, default: '' },
        startDate: { type: String, default: "" },
        endDate: { type: String, default: "" },
        startTime: { type: String, default: "" },
        endTime: { type: String, default: "" },
        isPaid: { type: String, default: "" },
        endTime: { type: String, default: "" },
        pricePerParticipant: { type: String, default: "" },
        priceForSiblings: { type: String, default: "" },
        instructor: { type: String, default: "" },
        numberOfSeats: { type: String, default: "" },
        location: { type: String, default: "" },
    }],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    addresses: [{ type: String, default: '' }],
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    createdOn: { type: Date, default: Date.now },
    updatedOn: { type: Date, default: Date.now }
});

mongoose.model("program", programSchema);
module.exports = programSchema;